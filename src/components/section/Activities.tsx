import ListRow from "@/components/ListRow";
import Section from "@/components/Section";
import { activities } from "@/data/activities";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { formatPeriod } from "@/utils/date";

export default function Activities({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);

  return (
    <Section id="activities" title={dict.sections.activities}>
      {activities.map((item) => (
        <ListRow
          key={item.organization.en}
          href={item.href}
          title={item.organization[lang]}
          subtitle={item.role[lang]}
          trailing={formatPeriod(
            item.start,
            item.end,
            dict.activities.current,
            lang,
          )}
        />
      ))}
    </Section>
  );
}
