import Image from "next/image";
import MetaRow from "@/components/MetaRow";
import { activities, type ActivityItem } from "@/data/activities";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export default function Activities({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);

  return (
    <section id="activities" className="flex w-full flex-col gap-8">
      <h2 className="text-xl font-bold tracking-tight">
        {dict.sections.activities}
      </h2>
      <div className="flex flex-col gap-10">
        {activities.map((item) => (
          <ActivityItemView
            key={item.organization.en}
            item={item}
            lang={lang}
          />
        ))}
      </div>
    </section>
  );
}

function ActivityItemView({
  item,
  lang,
}: {
  item: ActivityItem;
  lang: Locale;
}) {
  const dict = getDictionary(lang).activities;

  return (
    <MetaRow
      icon={
        <Image
          src={item.icon}
          alt=""
          width={40}
          height={40}
          className={`size-10 shrink-0 object-cover ${item.iconRounded ? "rounded-full" : ""}`}
        />
      }
      href={item.href}
      title={item.organization[lang]}
      subtitle={item.role}
      trailing={item.period + (item.current ? ` - ${dict.current}` : "")}
    />
  );
}
