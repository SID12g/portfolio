"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { ArrowUpRightIcon } from "@/components/icons";
import { localizePath, type Locale } from "@/i18n/config";

export interface ProjectListItem {
  slug: string;
  title: string;
  description: string;
  preview: string;
  stacks: string[];
}

const normalize = (tag: string) => tag.toLocaleLowerCase();

// 많이 쓰인 스택 순으로, 같으면 최근 프로젝트에 먼저 등장한 순으로 정렬
function collectTags(projects: ProjectListItem[]): string[] {
  const tags = new Map<string, { label: string; count: number }>();
  for (const project of projects) {
    for (const stack of project.stacks) {
      const key = normalize(stack);
      const tag = tags.get(key);
      if (tag) tag.count += 1;
      else tags.set(key, { label: stack, count: 1 });
    }
  }
  return [...tags.values()]
    .sort((a, b) => b.count - a.count)
    .map((tag) => tag.label);
}

export default function ProjectList({
  lang,
  projects,
  allLabel,
}: {
  lang: Locale;
  projects: ProjectListItem[];
  allLabel: string;
}) {
  const [active, setActive] = useState<string | null>(null);
  const tags = collectTags(projects);
  const filtered = active
    ? projects.filter((project) =>
        project.stacks.some((stack) => normalize(stack) === normalize(active)),
      )
    : projects;

  return (
    <div className="flex w-full flex-col gap-[60px]">
      <DragScroller>
        <FilterTag
          label={allLabel}
          active={active === null}
          onClick={() => setActive(null)}
        />
        {tags.map((tag) => (
          <FilterTag
            key={tag}
            label={tag}
            active={active === tag}
            onClick={() => setActive(tag)}
          />
        ))}
      </DragScroller>
      <div className="flex flex-col gap-8">
        {filtered.map((project) => (
          <Link
            key={project.slug}
            href={localizePath(lang, `/projects/${project.slug}`)}
            className="group flex w-full items-center justify-between gap-5"
          >
            <div className="flex min-w-0 items-center gap-5">
              <div className="size-20 shrink-0 overflow-hidden rounded-lg bg-muted-15">
                <Image
                  src={project.preview}
                  alt=""
                  width={160}
                  height={160}
                  className="size-full object-cover"
                />
              </div>
              <div className="flex min-w-0 flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <p className="text-base font-semibold underline-offset-4 group-hover:underline">
                    {project.title}
                  </p>
                  <p className="text-sm font-medium text-muted">
                    {project.description}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  {project.stacks.map((stack) => (
                    <span key={stack} className="text-sm font-medium text-muted">
                      {stack}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <ArrowUpRightIcon className="size-4 shrink-0 text-muted transition-colors duration-150 group-hover:text-primary" />
          </Link>
        ))}
      </div>
    </div>
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
function DragScroller({ children }: { children: React.ReactNode }) {
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
      className={`-mx-6 flex items-center gap-3 overflow-x-auto px-6 overscroll-x-contain select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${mask} ${
        dragging ? "cursor-grabbing *:cursor-grabbing" : ""
      }`}
    >
      {children}
    </div>
  );
}

function FilterTag({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 cursor-pointer rounded-full px-3.5 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-150 ${
        active
          ? "bg-invert-bg text-invert-fg"
          : "bg-muted-15 hover:bg-faint"
      }`}
    >
      {label}
    </button>
  );
}
