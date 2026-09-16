import Link from "next/link";
import { GitPullRequestIcon } from "@/components/icons";
import { contributions, type ContributionItem } from "@/data/contributions";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { formatDate } from "@/utils/date";

export default function Contributions({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const sorted = [...contributions].sort((a, b) =>
    b.date.localeCompare(a.date),
  );

  return (
    <section id="contributions" className="flex w-full flex-col gap-8">
      <h2 className="text-xl leading-none font-bold">
        {dict.sections.contributions}
      </h2>
      <div className="flex flex-col gap-10">
        {sorted.map((item) => (
          <ContributionItemView key={item.href} item={item} />
        ))}
      </div>
    </section>
  );
}

function ContributionItemView({ item }: { item: ContributionItem }) {
  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-x-4 gap-y-2">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-surface-border bg-muted-5">
          <GitPullRequestIcon className="size-[18px] text-muted" />
        </div>
        <div className="flex min-w-0 flex-col gap-3">
          <Link
            href={item.repositoryHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base leading-none font-medium hover:underline"
          >
            {item.repository}
          </Link>
          <Link
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm leading-none text-muted hover:underline"
          >
            {item.title}
          </Link>
        </div>
      </div>
      <span className="shrink-0 text-sm leading-none whitespace-nowrap text-muted">
        {formatDate(item.date)}
      </span>
    </div>
  );
}
