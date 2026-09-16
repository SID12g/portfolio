import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/icons";
import { localizePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const sectionIds = [
  "intro",
  "education",
  "activities",
  "certifications",
  "stack",
  "contributions",
  "links",
] as const;

export default function Header({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const home = localizePath(lang, "/");

  return (
    <header className="sticky top-4 z-50 mb-11 flex justify-center px-6">
      <nav className="flex w-full max-w-[720px] items-center justify-between gap-4 rounded-full border border-faint bg-background/85 px-3 py-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)] backdrop-blur-md md:justify-start md:gap-10">
        <Link
          href={home}
          className="shrink-0 pl-3 text-base font-semibold tracking-tight"
        >
          sid12g.dev
        </Link>

        <div className="hidden items-center gap-5 text-sm tracking-tight whitespace-nowrap md:flex">
          {sectionIds.map((id, index) => (
            <Link
              key={id}
              href={`${home}#${id}`}
              className={
                index === 0
                  ? "font-semibold text-primary"
                  : "font-medium text-nav-inactive transition-colors duration-150 hover:text-primary"
              }
            >
              {dict.sections[id]}
            </Link>
          ))}
        </div>

        <Link
          href="mailto:i@sid12g.dev"
          className="flex shrink-0 items-center gap-2 rounded-full border border-invert-bg bg-invert-bg px-3 py-2.5 text-sm font-medium whitespace-nowrap text-invert-fg"
        >
          {dict.nav.contact}
          <ArrowUpRightIcon className="size-3.5" />
        </Link>
      </nav>
    </header>
  );
}
