"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GlobeIcon } from "@/components/icons";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

function switchPath(pathname: string, target: Locale): string {
  const isEn = pathname === "/en" || pathname.startsWith("/en/");
  const rest = isEn ? pathname.slice(3) || "/" : pathname;
  if (target === "en") return rest === "/" ? "/en" : `/en${rest}`;
  return rest;
}

export default function LanguageSwitcher({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const target: Locale = lang === "ko" ? "en" : "ko";

  return (
    <Link
      href={switchPath(pathname, target)}
      className="flex items-center gap-2 rounded-full border border-surface-border bg-background px-3.5 py-2 text-sm leading-none font-medium text-muted transition-colors duration-150 hover:text-primary"
    >
      <GlobeIcon className="size-4" />
      {getDictionary(lang).footer.languageName}
    </Link>
  );
}
