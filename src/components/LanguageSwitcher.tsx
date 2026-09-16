"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GlobeIcon } from "@/components/icons";
import { localizePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

// 리라이트된 경로(/ko/...)나 404 페이지에서도 동작하도록 언어 접두사를 제거한 뒤 전환
function switchPath(pathname: string | null, target: Locale): string {
  const rest = (pathname ?? "/").replace(/^\/(ko|en)(?=\/|$)/, "") || "/";
  return localizePath(target, rest);
}

export default function LanguageSwitcher({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const target: Locale = lang === "ko" ? "en" : "ko";

  return (
    <Link
      href={switchPath(pathname, target)}
      className="flex items-center gap-2 rounded-full border border-surface-border bg-background px-3.5 py-2 text-sm leading-none font-medium text-muted transition-colors duration-150 hover:bg-muted-15 hover:text-primary"
    >
      <GlobeIcon className="size-4" />
      {getDictionary(lang).footer.languageName}
    </Link>
  );
}
