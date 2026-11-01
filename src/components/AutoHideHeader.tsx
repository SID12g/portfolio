"use client";

import { useEffect, useState } from "react";

// 이 위치(px)보다 위에서는 항상 표시 (헤더가 아직 원래 자리에 있는 구간을 포함)
const SHOW_OFFSET = 120;
// 마지막으로 상태를 바꾼 위치에서 이 거리(px) 이상 움직여야 다시 판단 (미세한 떨림 방지)
const SCROLL_THRESHOLD = 8;

export default function AutoHideHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      // iOS 바운스처럼 스크롤 범위를 벗어난 값은 끝 위치로 고정
      const maxY =
        document.documentElement.scrollHeight - window.innerHeight;
      const y = Math.min(Math.max(window.scrollY, 0), maxY);
      if (y < SHOW_OFFSET) {
        setHidden(false);
        lastY = y;
        return;
      }
      const delta = y - lastY;
      if (Math.abs(delta) < SCROLL_THRESHOLD) return;
      setHidden(delta > 0);
      lastY = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      // 숨겨진 상태에서도 키보드로 포커스가 들어오면 다시 표시
      className={`sticky top-4 z-50 mb-11 flex justify-center px-6 transition-transform duration-300 ease-out focus-within:translate-y-0 motion-reduce:transition-none sm:mb-[60px] ${
        hidden ? "-translate-y-[calc(100%+1rem)]" : ""
      }`}
    >
      {children}
    </header>
  );
}
