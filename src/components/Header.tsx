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
    <header className="sticky top-4 z-50 mb-11 flex justify-center px-6 sm:mb-[60px]">
      <nav className="flex w-full items-center justify-between gap-4 rounded-full border border-faint bg-background px-3 py-2 md:w-fit md:justify-start md:gap-10">
        <Link
          href={home}
          className="shrink-0 py-2.5 pl-3 text-base leading-none font-semibold"
        >
          sid12g.dev
        </Link>

        <div className="-mx-2.5 hidden items-center text-sm leading-none whitespace-nowrap md:flex">
          {sectionIds.map((id, index) => (
            <Link
              key={id}
              href={`${home}#${id}`}
              className={`px-2.5 py-2.5 ${
                index === 0
                  ? "font-semibold text-primary"
                  : "font-medium text-nav-inactive transition-colors duration-150 hover:text-primary"
              }`}
            >
              {dict.sections[id]}
            </Link>
          ))}
        </div>

        <Link
          href="mailto:i@sid12g.dev"
          className="flex shrink-0 items-center gap-2 rounded-full border border-invert-bg bg-invert-bg px-3 py-2.5 text-sm leading-none font-medium whitespace-nowrap text-invert-fg"
        >
          {dict.nav.contact}
          <ArrowUpRightIcon className="size-3.5" />
        </Link>
      </nav>
    </header>
  );
}
