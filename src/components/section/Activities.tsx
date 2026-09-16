import MetaRow from "@/components/MetaRow";
import OrgLogo from "@/components/OrgLogo";
import { activities, type ActivityItem } from "@/data/activities";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { formatPeriod } from "@/utils/date";

export default function Activities({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);

  return (
    <section id="activities" className="flex w-full flex-col gap-8">
      <h2 className="text-xl leading-none font-bold">
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
      icon={<OrgLogo src={item.icon} rounded={item.iconRounded} />}
      href={item.href}
      title={item.organization[lang]}
      subtitle={item.role}
      trailing={formatPeriod(item.start, item.end, dict.current)}
    />
  );
}
