import Separator from "@/components/Separator";
import Link from "next/link";
import { info, type InfoItem } from "@/data/info";
import { localizePath, type Locale } from "@/i18n/config";

export default function Info({ lang }: { lang: Locale }) {
  return (
    <div>
      <Separator title="INFO" />
      <div className="flex flex-col gap-4">
        {info.map((item) => (
          <InfoItemView key={item.label} item={item} lang={lang} />
        ))}
      </div>
    </div>
  );
}

function InfoItemView({ item, lang }: { item: InfoItem; lang: Locale }) {
  const href = item.href.startsWith("/")
    ? localizePath(lang, item.href)
    : item.href;

  return (
    <div className="flex flex-row gap-4 items-center">
      <div className="w-18 sm:w-20 shrink-0">
        <span className="text-xs sm:text-sm text-muted font-jetbrains-mono">
          {item.label}
        </span>
      </div>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs sm:text-sm text-primary font-jetbrains-mono hover:text-accent transition-colors duration-150"
      >
        {item.content}
      </Link>
    </div>
  );
}
