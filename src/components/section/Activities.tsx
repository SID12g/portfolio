import Separator from "@/components/Separator";
import { activities, type ActivityItem } from "@/data/activities";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import Link from "next/link";

export default function Activities({ lang }: { lang: Locale }) {
  return (
    <div>
      <Separator title="ACTIVITIES" />
      <div className="flex flex-col gap-5">
        {activities.map((item) => (
          <ActivityItemView
            key={item.organization.en}
            item={item}
            lang={lang}
          />
        ))}
      </div>
    </div>
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
    <div className="flex flex-col gap-1">
      <div className="w-full flex flex-row justify-between items-center">
        <span className="font-medium text-sm sm:text-base">{item.role}</span>
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
      <Link
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-muted hover:text-accent transition-colors duration-150 text-sm sm:text-base"
      >
        {item.organization[lang]}
      </Link>
    </div>
  );
}
