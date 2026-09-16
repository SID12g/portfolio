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
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <p className="text-sm leading-none font-medium text-nav-inactive">
          404
        </p>
        <h1 className="text-[40px] leading-[1.2] font-bold">{dict.title}</h1>
        <p className="text-base leading-[1.7] font-medium text-muted">
          {dict.description}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-4">
        {/* JS가 로드되지 않아도 이동할 수 있도록 일반 링크 사용 */}
        <a
          href={home}
          className="flex items-center justify-center rounded-full border border-invert-bg bg-invert-bg px-5 py-3.5 text-sm leading-none font-medium text-invert-fg transition-colors duration-150 hover:border-invert-hover hover:bg-invert-hover"
        >
          {dict.button}
        </a>
        <p
          aria-live="polite"
          className="text-sm leading-none font-medium text-nav-inactive tabular-nums"
        >
          {dict.countdown(count)}
        </p>
      </div>
    </div>
  );
}
