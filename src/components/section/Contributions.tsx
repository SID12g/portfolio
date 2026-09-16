import MetaRow from "@/components/MetaRow";
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
    <MetaRow
      icon={
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-surface-border bg-muted-5">
          <GitPullRequestIcon className="size-[18px] text-muted" />
        </div>
      }
      href={item.href}
      title={item.repository}
      titleWeight="medium"
      subtitle={item.title}
      subtitleWeight="normal"
      trailing={formatDate(item.date)}
    />
  );
}
