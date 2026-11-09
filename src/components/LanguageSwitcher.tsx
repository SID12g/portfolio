"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import FooterIcon, { footerIconLinkClass } from "@/components/FooterIcon";
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
  const label = getDictionary(target).footer.languageName;

  return (
    <Link
      href={switchPath(pathname, target)}
      hrefLang={target}
      aria-label={label}
      title={label}
      className={footerIconLinkClass}
    >
      <FooterIcon name="globe" />
    </Link>
  );
}
