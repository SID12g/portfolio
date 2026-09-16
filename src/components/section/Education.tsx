import Image from "next/image";
import MetaRow from "@/components/MetaRow";
import { education, type EducationItem } from "@/data/education";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

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
      icon={
        <Image
          src={item.icon}
          alt=""
          width={40}
          height={40}
          className="size-10 shrink-0"
        />
      }
      href={item.href}
      title={item.school[lang]}
      subtitle={item.major[lang]}
      trailing={
        item.period + (item.current ? ` - ${dict.current}` : "")
      }
    />
  );
}
