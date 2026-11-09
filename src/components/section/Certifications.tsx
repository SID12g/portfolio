import ListRow from "@/components/ListRow";
import Section from "@/components/Section";
import { certifications } from "@/data/certifications";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { formatDate } from "@/utils/date";

export default function Certifications({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);

  return (
    <Section id="certifications" title={dict.sections.certifications}>
      {certifications.map((item) => (
        <ListRow
          key={item.name.en}
          href={item.href}
          title={item.name[lang]}
          subtitle={item.issuer[lang]}
          trailing={formatDate(item.date, lang)}
        />
      ))}
    </Section>
  );
}
