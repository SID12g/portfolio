import Image from "next/image";
import MetaRow from "@/components/MetaRow";
import { FileIcon, GitHubIcon, MailIcon } from "@/components/icons";
import { info, type InfoIcon, type InfoItem } from "@/data/info";
import { localizePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

function InfoIconView({ icon }: { icon: InfoIcon }) {
  switch (icon) {
    case "linkedin":
      return (
        <Image
          src="/images/logos/linkedin.svg"
          alt=""
          width={18}
          height={18}
          className="size-[18px]"
        />
      );
    case "github":
      return <GitHubIcon className="size-[18px]" />;
    case "resume":
      return <FileIcon className="size-[18px] text-muted" />;
    case "email":
      return <MailIcon className="size-[18px] text-muted" />;
  }
}

export default function Info({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);

  return (
    <section id="links" className="flex w-full flex-col gap-8">
      <h2 className="text-xl leading-none font-bold">
        {dict.sections.links}
      </h2>
      <div className="flex flex-col gap-10">
        {info.map((item) => (
          <InfoItemView key={item.label} item={item} lang={lang} />
        ))}
      </div>
    </section>
  );
}

function InfoItemView({ item, lang }: { item: InfoItem; lang: Locale }) {
  const href = item.href.startsWith("/")
    ? localizePath(lang, item.href)
    : item.href;

  return (
    <MetaRow
      icon={
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-surface-border bg-muted-5">
          <InfoIconView icon={item.icon} />
        </div>
      }
      href={href}
      title={item.label}
      titleWeight="medium"
      subtitle={item.content}
      subtitleWeight="normal"
    />
  );
}
