"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";

function switchPath(pathname: string, target: Locale): string {
  const isEn = pathname === "/en" || pathname.startsWith("/en/");
  const rest = isEn ? pathname.slice(3) || "/" : pathname;
  if (target === "en") return rest === "/" ? "/en" : `/en${rest}`;
  return rest;
}

export default function LanguageSwitcher({ lang }: { lang: Locale }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-row items-center gap-1.5 font-jetbrains-mono text-xs sm:text-sm">
      <Link
        href={switchPath(pathname, "ko")}
        className={
          lang === "ko"
            ? "text-primary"
            : "text-muted hover:text-accent transition-colors duration-150"
        }
      >
        KO
      </Link>
      <span className="text-muted">/</span>
      <Link
        href={switchPath(pathname, "en")}
        className={
          lang === "en"
            ? "text-primary"
            : "text-muted hover:text-accent transition-colors duration-150"
        }
      >
        EN
      </Link>
    </div>
  );
}
