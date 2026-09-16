"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { localizePath, type Locale } from "@/i18n/config";

export default function NotFoundView({ lang }: { lang: Locale }) {
  const router = useRouter();
  const [count, setCount] = useState(10);

  const dict = getDictionary(lang).notFound;
  const homeHref = localizePath(lang, "/");

  useEffect(() => {
    if (count === 0) {
      router.push(homeHref);
      return;
    }
    const timer = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [count, router, homeHref]);

  return (
    <div className="h-[84vh] flex flex-col items-center justify-center min-h-[60vh] gap-8 text-center">
      <div className="flex flex-col gap-3">
        <p className="text-xs text-muted font-jetbrains-mono tracking-widest uppercase">
          {dict.label}
        </p>
        <h1 className="text-3xl sm:text-4xl font-medium">{dict.title}</h1>
        <p className="text-sm sm:text-base text-muted">{dict.description}</p>
      </div>
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={() => router.push(homeHref)}
          className="px-6 py-3 rounded-lg border border-faint bg-muted-5 hover:border-accent hover:bg-hover transition-colors duration-150 text-sm font-medium cursor-pointer"
        >
          {dict.button}
        </button>
        <p className="text-xs text-muted font-jetbrains-mono">
          {dict.countdown(count)}
        </p>
      </div>
    </div>
  );
}
