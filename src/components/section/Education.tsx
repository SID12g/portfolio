import ListRow from "@/components/ListRow";
import Section from "@/components/Section";
import { education } from "@/data/education";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { formatPeriod } from "@/utils/date";

export default function Education({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);

  return (
    <Section id="education" title={dict.sections.education}>
      {education.map((item) => (
        <ListRow
          key={item.school.en}
          href={item.href}
          title={item.school[lang]}
          subtitle={item.major[lang]}
          trailing={formatPeriod(
            item.start,
            item.end,
            dict.education.current,
            lang,
          )}
        />
      ))}
    </Section>
  );
}
