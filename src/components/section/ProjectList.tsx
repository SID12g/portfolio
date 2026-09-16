"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from "react";
import { localizePath, type Locale } from "@/i18n/config";

export interface ProjectListItem {
  slug: string;
  title: string;
  description: string;
  preview: string;
  stacks: string[];
}

interface ProjectListProps {
  lang: Locale;
  projects: ProjectListItem[];
  allLabel: string;
}

interface Tag {
  label: string;
  count: number;
}

const normalize = (tag: string) => tag.toLocaleLowerCase();

// 해당 프로젝트가 많은 순, 같으면 알파벳 순으로 정렬
function collectTags(projects: ProjectListItem[]): Tag[] {
  const tags = new Map<string, Tag>();
  for (const project of projects) {
    for (const stack of project.stacks) {
      const key = normalize(stack);
      const tag = tags.get(key);
      if (tag) tag.count += 1;
      else tags.set(key, { label: stack, count: 1 });
    }
  }
  return [...tags.values()].sort(
    (a, b) =>
      b.count - a.count ||
      a.label.localeCompare(b.label, "en", { sensitivity: "base" }),
  );
}

export default function ProjectList(props: ProjectListProps) {
  const tag = useSearchParams().get("tag");
  return <ProjectListView {...props} tagParam={tag} />;
}

// 프리렌더링 시점에는 쿼리스트링을 알 수 없으므로 전체 목록을 먼저 보여줌
export function ProjectListFallback(props: ProjectListProps) {
  return <ProjectListView {...props} tagParam={null} />;
}

function ProjectListView({
  lang,
  projects,
  allLabel,
  tagParam,
}: ProjectListProps & { tagParam: string | null }) {
  const tags = collectTags(projects);
  const active = tagParam
    ? (tags.find((tag) => normalize(tag.label) === normalize(tagParam)) ??
      null)
    : null;
  const filtered = active
    ? projects.filter((project) =>
        project.stacks.some(
          (stack) => normalize(stack) === normalize(active.label),
        ),
      )
    : projects;

  const select = (tag: string | null) => {
    const params = new URLSearchParams(window.location.search);
    if (tag) params.set("tag", tag);
    else params.delete("tag");
    const query = params.toString();
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${query ? `?${query}` : ""}`,
    );
  };

  return (
    <div className="flex w-full flex-col gap-[60px]">
      <DragScroller activeKey={active?.label ?? null}>
        <TagTab
          label={allLabel}
          count={projects.length}
          active={active === null}
          onClick={() => select(null)}
        />
        {tags.map((tag) => (
          <TagTab
            key={tag.label}
            label={tag.label}
            count={tag.count}
            active={active?.label === tag.label}
            // 이미 선택된 태그를 다시 누르면 전체로 돌아감
            onClick={() =>
              select(active?.label === tag.label ? null : tag.label)
            }
          />
        ))}
      </DragScroller>
      <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2">
        {filtered.map((project) => (
          <Link
            key={project.slug}
            href={localizePath(lang, `/projects/${project.slug}`)}
            className="group flex flex-col gap-4"
          >
            <div className="relative aspect-square overflow-hidden rounded-md bg-muted-5">
              <Image
                src={project.preview}
                alt=""
                fill
                sizes="(min-width: 768px) 348px, (min-width: 640px) 50vw, 100vw"
                className="object-cover mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-[1.03] dark:mix-blend-normal"
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <p className="text-[17px] leading-snug font-medium transition-colors duration-150 group-hover:text-muted">
                  {project.title}
                </p>
                <p className="text-sm leading-normal font-medium text-muted">
                  {project.description}
                </p>
              </div>
              <p className="flex flex-wrap gap-x-3 gap-y-1 text-sm leading-normal font-medium text-muted">
                {project.stacks.map((stack) => (
                  <span key={stack}>{stack}</span>
                ))}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function TagTab({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 cursor-pointer py-2 text-base leading-none font-medium whitespace-nowrap transition-colors duration-150 ${
        active ? "text-primary" : "text-nav-inactive hover:text-muted"
      }`}
    >
      {label} <span className="tabular-nums">({count})</span>
    </button>
  );
}

const DRAG_THRESHOLD = 4;

function readEdges(el: HTMLElement) {
  return {
    start: el.scrollLeft > 0,
    end: el.scrollLeft + el.clientWidth < el.scrollWidth - 1,
  };
}

// 마우스로 가로 드래그해서 스크롤할 수 있는 영역 (터치는 기본 스크롤 사용)
function DragScroller({
  activeKey,
  children,
}: {
  activeKey: string | null;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef({ pointerId: -1, startX: 0, scrollLeft: 0, moved: false });
  const [dragging, setDragging] = useState(false);
  const [edges, setEdges] = useState({ start: false, end: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // observe() 직후 콜백이 한 번 호출되므로 초기값도 여기서 계산됨
    const observer = new ResizeObserver(() => setEdges(readEdges(el)));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 선택된 태그가 화면 밖에 있으면 보이도록 스크롤 (예: 상세 페이지에서 태그로 진입)
  useEffect(() => {
    const el = ref.current;
    const button = el?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (!el || !button) return;
    const padding = 24;
    const left = button.offsetLeft - padding;
    const right = button.offsetLeft + button.offsetWidth + padding;
    if (left < el.scrollLeft || right > el.scrollLeft + el.clientWidth) {
      el.scrollLeft = left;
    }
  }, [activeKey]);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    drag.current.moved = false;
    if (e.pointerType !== "mouse" || e.button !== 0 || !ref.current) return;
    drag.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      scrollLeft: ref.current.scrollLeft,
      moved: false,
    };
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const state = drag.current;
    const el = ref.current;
    if (state.pointerId !== e.pointerId || !el) return;
    const dx = e.clientX - state.startX;
    if (!state.moved) {
      if (Math.abs(dx) < DRAG_THRESHOLD) return;
      state.moved = true;
      el.setPointerCapture(e.pointerId);
      setDragging(true);
    }
    el.scrollLeft = state.scrollLeft - dx;
  };

  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    if (drag.current.pointerId !== e.pointerId) return;
    drag.current.pointerId = -1;
    setDragging(false);
  };

  const mask =
    edges.start && edges.end
      ? "[mask-image:linear-gradient(to_right,transparent,black_32px,black_calc(100%-32px),transparent)]"
      : edges.start
        ? "[mask-image:linear-gradient(to_right,transparent,black_32px)]"
        : edges.end
          ? "[mask-image:linear-gradient(to_left,transparent,black_32px)]"
          : "";

  return (
    <div
      ref={ref}
      onScroll={(e) => setEdges(readEdges(e.currentTarget))}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClickCapture={(e) => {
        // 드래그가 끝난 직후의 클릭은 태그 선택으로 처리하지 않음
        if (drag.current.moved) {
          e.preventDefault();
          e.stopPropagation();
          drag.current.moved = false;
        }
      }}
      onDragStart={(e) => e.preventDefault()}
      className={`relative -mx-6 -my-2 flex items-center gap-5 overflow-x-auto overscroll-x-contain px-6 select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${mask} ${
        dragging ? "cursor-grabbing *:cursor-grabbing" : ""
      }`}
    >
      {children}
    </div>
  );
}
