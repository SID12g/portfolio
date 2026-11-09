"use client";

import { useEffect, useState } from "react";
import { localizePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default function NotFoundView({
  lang,
  seconds,
}: {
  lang: Locale;
  seconds: number;
}) {
  const dict = getDictionary(lang).notFound;
  const home = localizePath(lang, "/");
  const [count, setCount] = useState(seconds);

  useEffect(() => {
    if (count === 0) {
      // 404 페이지는 앱 레이아웃 밖에서 렌더링되므로 전체 페이지 이동으로 홈을 새로 불러옴
      window.location.replace(home);
      return;
    }
    const timer = window.setTimeout(() => setCount((c) => c - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [count, home]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <p className="font-mono text-sm leading-[1.2] font-medium text-tertiary">
          404
        </p>
        <h1 className="text-lg leading-[1.2] font-semibold text-primary">
          {dict.title}
        </h1>
        <p className="text-sm leading-[1.7] text-secondary">
          {dict.description}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        {/* JS가 로드되지 않아도 이동할 수 있도록 일반 링크 사용 */}
        <a
          href={home}
          data-cursor="lift"
          className="rounded-lg bg-invert-bg px-3 py-1.5 text-xs leading-[normal] font-medium text-invert-fg transition-colors duration-150 hover:bg-invert-hover"
        >
          {dict.button}
        </a>
        <p
          aria-live="polite"
          className="text-xs leading-[1.2] font-medium text-tertiary tabular-nums"
        >
          {dict.countdown(count)}
        </p>
      </div>
    </div>
  );
}
