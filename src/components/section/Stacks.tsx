import { stacks } from "@/data/stacks";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default function Stacks({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);

  return (
    <section id="stack" className="flex w-full flex-col gap-8">
      <h2 className="text-xl font-bold tracking-tight">
        {dict.sections.stack}
      </h2>
      <div className="flex flex-col gap-10">
        {stacks.map((category) => (
          <div
            key={category.label}
            className="flex flex-col gap-3 sm:flex-row sm:gap-10"
          >
            <p className="shrink-0 text-sm font-medium text-muted sm:w-[100px]">
              {category.label}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {category.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-muted-15 px-3.5 py-2 text-sm font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
