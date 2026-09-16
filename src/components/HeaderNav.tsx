"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// 섹션 상단이 이 위치(px)를 지나면 현재 섹션으로 간주 (html의 scroll-padding-top 96px보다 약간 아래)
const ACTIVE_OFFSET = 120;
// 스크롤이 이 시간(ms) 동안 멈추면 메뉴 이동이 끝난 것으로 간주
const SCROLL_IDLE = 200;

export default function HeaderNav({
  home,
  sections,
}: {
  home: string;
  sections: { id: string; label: string }[];
}) {
  // 프록시 리라이트(/ → /ko) 영향을 받지 않도록 [lang] 레이아웃 아래 세그먼트로 홈 여부를 판단
  const isHome = useSelectedLayoutSegment() === null;
  const [active, setActive] = useState<string | null>(
    sections[0]?.id ?? null,
  );
  // 다른 페이지에서 누른 메뉴는 홈으로 이동한 뒤 적용
  const pending = useRef<string | null>(null);
  const lockRef = useRef<(id: string | null) => void>(() => {});

  useEffect(() => {
    if (!isHome) return;
    const ids = sections.map((section) => section.id);
    let frame = 0;
    let idleTimer = 0;
    // 메뉴로 이동한 섹션은 이동이 끝난 뒤 사용자가 다시 스크롤할 때까지 유지
    // (페이지 끝에 가까운 섹션은 상단까지 스크롤되지 않아 위치만으로는 판별할 수 없음)
    let locked: string | null = null;
    let settled = true;

    const update = () => {
      frame = 0;
      if (locked) {
        setActive(locked);
        return;
      }
      // 섹션이 없는 페이지(예: 404)에서는 아무 메뉴도 강조하지 않음
      let current: string | null = null;
      if (document.getElementById(ids[0])) {
        const { scrollY, innerHeight } = window;
        const atBottom =
          scrollY > 0 &&
          scrollY + innerHeight >= document.documentElement.scrollHeight - 2;
        current = atBottom ? ids[ids.length - 1] : ids[0];
        if (!atBottom) {
          for (const id of ids) {
            const el = document.getElementById(id);
            if (el && el.getBoundingClientRect().top <= ACTIVE_OFFSET) {
              current = id;
            }
          }
        }
      }
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const waitForIdle = () => {
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        settled = true;
      }, SCROLL_IDLE);
    };
    const lock = (id: string | null) => {
      locked = id && ids.includes(id) ? id : null;
      settled = false;
      waitForIdle();
      schedule();
    };
    const unlock = () => {
      if (!locked) return;
      locked = null;
      schedule();
    };
    const onScroll = () => {
      if (locked) {
        if (settled) locked = null;
        else waitForIdle();
      }
      schedule();
    };
    const onHashChange = () =>
      lock(decodeURIComponent(window.location.hash.slice(1)));

    lockRef.current = lock;
    lock(
      pending.current ?? decodeURIComponent(window.location.hash.slice(1)),
    );
    pending.current = null;

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", onHashChange);
    // 사용자가 직접 스크롤을 시작하면 바로 스크롤 위치를 따라감
    window.addEventListener("wheel", unlock, { passive: true });
    window.addEventListener("touchstart", unlock, { passive: true });
    window.addEventListener("keydown", unlock);
    return () => {
      lockRef.current = () => {};
      cancelAnimationFrame(frame);
      window.clearTimeout(idleTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("wheel", unlock);
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, [isHome, sections]);

  return (
    <div className="-mx-2.5 hidden items-center text-sm leading-none whitespace-nowrap md:flex">
      {sections.map(({ id, label }) => {
        const current = isHome && active === id;
        return (
          <Link
            key={id}
            href={`${home}#${id}`}
            onClick={() => {
              if (isHome) lockRef.current(id);
              else pending.current = id;
            }}
            aria-current={current ? "location" : undefined}
            className={`grid px-2.5 py-2.5 text-center transition-colors duration-150 ${
              current
                ? "font-semibold text-primary"
                : "font-medium text-nav-inactive hover:text-primary"
            }`}
          >
            {/* 굵기가 바뀌어도 메뉴 폭이 흔들리지 않도록 semibold 기준으로 자리 확보 */}
            <span className="invisible col-start-1 row-start-1 font-semibold">
              {label}
            </span>
            <span className="col-start-1 row-start-1">{label}</span>
          </Link>
        );
      })}
    </div>
  );
}
