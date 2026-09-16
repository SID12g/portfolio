import Image from "next/image";
import MetaRow from "@/components/MetaRow";
import {
  certifications,
  type CertificationItem,
} from "@/data/certifications";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { formatDate } from "@/utils/date";

export default function Certifications({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);

  return (
    <section id="certifications" className="flex w-full flex-col gap-8">
      <h2 className="text-xl leading-none font-bold">
        {dict.sections.certifications}
      </h2>
      <div className="flex flex-col gap-10">
        {certifications.map((item) => (
          <CertificationItemView key={item.name.en} item={item} lang={lang} />
        ))}
      </div>
    </section>
  );
}

function CertificationItemView({
  item,
  lang,
}: {
  item: CertificationItem;
  lang: Locale;
}) {
  return (
    <MetaRow
      icon={
        <Image
          src={item.icon}
          alt=""
          width={40}
          height={40}
          className="size-10 shrink-0 object-contain"
        />
      }
      href={item.href}
      title={item.name[lang]}
      subtitle={item.issuer[lang]}
      trailing={formatDate(item.date)}
    />
  );
}
