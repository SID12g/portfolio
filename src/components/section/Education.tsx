import Separator from "@/components/Separator";
import { education, type EducationItem } from "@/data/education";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import Link from "next/link";

export default function Education({ lang }: { lang: Locale }) {
  return (
    <div>
      <Separator title="EDUCATION" />
      <div className="flex flex-col gap-5">
        {education.map((item) => (
          <EducationItemView key={item.school.en} item={item} lang={lang} />
        ))}
      </div>
    </div>
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
    <div className="flex flex-col gap-1">
      <div className="w-full flex flex-row justify-between items-center">
        <Link
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium hover:text-accent transition-colors duration-150 text-sm sm:text-base"
        >
          {item.school[lang]}
        </Link>
        <span className="font-jetbrains-mono text-muted text-xs sm:text-sm whitespace-nowrap">
          {item.period}
          {item.current && (
            <span className="text-accent text-xs sm:text-sm">
              {" "}
              {dict.current}
            </span>
          )}
        </span>
      </div>
      <span className="font-medium text-muted text-sm sm:text-base">
        {item.major[lang]}
      </span>
    </div>
  );
}
