import MetaRow from "@/components/MetaRow";
import OrgLogo from "@/components/OrgLogo";
import { education, type EducationItem } from "@/data/education";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { formatPeriod } from "@/utils/date";

export default function Education({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);

  return (
    <section id="education" className="flex w-full flex-col gap-8">
      <h2 className="text-xl leading-none font-bold">
        {dict.sections.education}
      </h2>
      <div className="flex flex-col gap-10">
        {education.map((item) => (
          <EducationItemView key={item.school.en} item={item} lang={lang} />
        ))}
      </div>
    </section>
  );
}

function EducationItemView({
  item,
  lang,
}: {
  item: EducationItem;
  lang: Locale;
}) {
  const dict = getDictionary(lang).education;

  return (
    <MetaRow
      icon={<OrgLogo src={item.icon} />}
      href={item.href}
      title={item.school[lang]}
      subtitle={item.major[lang]}
      trailing={formatPeriod(item.start, item.end, dict.current)}
    />
  );
}
