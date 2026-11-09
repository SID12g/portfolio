"use client";

import { useEffect, useRef } from "react";

type Mode = "dot" | "link" | "text" | "lift";

const LIFT = '[data-cursor="lift"]';
const INTERACTIVE =
  "a[href], button, [role='button'], summary, label, select, input, textarea";
const TEXT =
  "p, span, h1, h2, h3, h4, h5, h6, li, dt, dd, td, th, blockquote, figcaption, time, code, pre";

// 60fps 기준 한 프레임에 남은 거리의 몇 %를 따라갈지 (주사율과 관계없이 같은 속도가 되도록 보정)
const FOLLOW = 0.2;
const FRAME = 1000 / 60;

function caretHeight(el: Element): number {
  const style = getComputedStyle(el);
  const fontSize = parseFloat(style.fontSize) || 16;
  const lineHeight = parseFloat(style.lineHeight) || fontSize * 1.2;
  return Math.round(Math.min(lineHeight, fontSize * 1.5));
}

// 마우스처럼 정밀한 포인터가 있는 환경에서만 기본 커서를 숨기고 커스텀 커서를 표시
function attach(cursor: HTMLDivElement): () => void {
  const root = document.documentElement;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const target = { x: 0, y: 0 };
  const pos = { x: 0, y: 0 };
  let frame = 0;
  let lastTime = 0;
  let placed = false;

  root.dataset.customCursor = "";

  const render = () => {
    cursor.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
  };

  const tick = (time: number) => {
    const dt = lastTime ? Math.min(time - lastTime, 100) : FRAME;
    lastTime = time;
    const ease = reducedMotion.matches
      ? 1
      : 1 - Math.pow(1 - FOLLOW, dt / FRAME);
    const dx = target.x - pos.x;
    const dy = target.y - pos.y;

    if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
      pos.x = target.x;
      pos.y = target.y;
      render();
      frame = 0;
      lastTime = 0;
      return;
    }

    pos.x += dx * ease;
    pos.y += dy * ease;
    render();
    frame = requestAnimationFrame(tick);
  };

  const setHidden = (hidden: boolean) => {
    cursor.toggleAttribute("data-hidden", hidden);
  };

  const setMode = (node: EventTarget | null) => {
    let mode: Mode = "dot";

    if (node instanceof Element) {
      // iframe 안에서는 이벤트를 받을 수 없으므로 iframe 자체 커서를 사용
      if (node.tagName === "IFRAME") {
        setHidden(true);
        return;
      }

      // 구분선 같은 장식 요소 위에서는 텍스트 커서로 바꾸지 않음
      const text = node.closest('[aria-hidden="true"]')
        ? null
        : node.closest(TEXT);
      if (node.closest(LIFT)) mode = "lift";
      else if (node.closest(INTERACTIVE)) mode = "link";
      else if (text) {
        mode = "text";
        cursor.style.setProperty("--cursor-caret", `${caretHeight(text)}px`);
      }
    }

    cursor.dataset.mode = mode;
    setHidden(!placed);
  };

  const onMove = (e: PointerEvent) => {
    if (e.pointerType === "touch") return;
    target.x = e.clientX;
    target.y = e.clientY;

    // 처음 움직였을 때는 (0, 0)에서 날아오지 않도록 바로 그 자리에 표시
    if (!placed) {
      placed = true;
      pos.x = target.x;
      pos.y = target.y;
      render();
      setMode(e.target);
    }

    if (!frame) frame = requestAnimationFrame(tick);
  };

  const onOver = (e: PointerEvent) => {
    if (e.pointerType !== "touch") setMode(e.target);
  };
  const onDown = (e: PointerEvent) => {
    if (e.pointerType !== "touch") cursor.toggleAttribute("data-pressed", true);
  };
  const onUp = () => cursor.toggleAttribute("data-pressed", false);
  // 창 밖으로 나가면 숨기고, 다시 들어오면 들어온 위치에서 바로 나타나게 함
  const onLeave = () => {
    placed = false;
    setHidden(true);
  };

  window.addEventListener("pointermove", onMove, { passive: true });
  window.addEventListener("pointerover", onOver, { passive: true });
  window.addEventListener("pointerdown", onDown, { passive: true });
  window.addEventListener("pointerup", onUp, { passive: true });
  window.addEventListener("pointercancel", onUp, { passive: true });
  root.addEventListener("mouseleave", onLeave);

  return () => {
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerover", onOver);
    window.removeEventListener("pointerdown", onDown);
    window.removeEventListener("pointerup", onUp);
    window.removeEventListener("pointercancel", onUp);
    root.removeEventListener("mouseleave", onLeave);
    cancelAnimationFrame(frame);
    delete root.dataset.customCursor;
    setHidden(true);
  };
}

export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = ref.current;
    if (!cursor) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let detach: (() => void) | null = null;

    // 마우스를 연결하거나 분리하면 그에 맞춰 켜고 끔
    const sync = () => {
      if (finePointer.matches && !detach) detach = attach(cursor);
      else if (!finePointer.matches && detach) {
        detach();
        detach = null;
      }
    };

    sync();
    finePointer.addEventListener("change", sync);
    return () => {
      finePointer.removeEventListener("change", sync);
      detach?.();
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="site-cursor"
      data-mode="dot"
      data-hidden=""
    >
      <div className="site-cursor-shape" />
    </div>
  );
}
