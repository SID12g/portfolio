import ListRow from "@/components/ListRow";
import Section from "@/components/Section";
import { contributions } from "@/data/contributions";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { formatDate } from "@/utils/date";

export default function Contributions({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const sorted = [...contributions].sort((a, b) =>
    b.date.localeCompare(a.date),
  );

  return (
    <Section id="contributions" title={dict.sections.contributions}>
      {sorted.map((item) => (
        <ListRow
          key={item.href}
          href={item.href}
          title={item.repository}
          subtitle={item.title}
          trailing={formatDate(item.date, lang)}
        />
      ))}
    </Section>
  );
}
