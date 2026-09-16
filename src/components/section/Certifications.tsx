import Separator from "@/components/Separator";
import { certifications, type CertificationItem } from "@/data/certifications";
import type { Locale } from "@/i18n/config";
import Link from "next/link";

export default function Certifications({ lang }: { lang: Locale }) {
  return (
    <div>
      <Separator title="CERTIFICATIONS" />
      <div className="flex flex-col gap-5">
        {certifications.map((item) => (
          <CertificationItemView key={item.name.en} item={item} lang={lang} />
        ))}
      </div>
    </div>
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
    <div className="flex flex-col gap-1">
      <div className="w-full flex flex-row justify-between items-center">
        <span className="font-medium text-sm sm:text-base">
          {item.name[lang]}
        </span>
        <span className="font-jetbrains-mono text-muted text-xs sm:text-sm whitespace-nowrap">
          {item.date}
        </span>
      </div>
      <Link
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-muted hover:text-accent transition-colors duration-150 text-sm sm:text-base "
      >
        {item.issuer[lang]}
      </Link>
    </div>
  );
}
