import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/icons";
import { localizePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default function Profile({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang).profile;

  return (
    <div className="flex w-full flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-[40px] leading-none font-bold tracking-tight">
          {dict.name}
        </h1>
        <p className="text-base leading-none font-medium text-muted">
          {dict.role}
        </p>
      </div>
      <div className="flex flex-wrap items-start gap-4">
        <Link
          href={localizePath(lang, "/projects")}
          className="flex items-center justify-center rounded-full border border-invert-bg bg-invert-bg px-5 py-3.5 text-sm font-medium text-invert-fg"
        >
          {dict.viewProjects}
        </Link>
        <Link
          href="https://blog.sid12g.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-full border border-faint bg-background px-5 py-3.5 text-sm font-medium"
        >
          {dict.goToBlog}
          <ArrowUpRightIcon className="size-3.5" />
        </Link>
      </div>
    </div>
  );
}
