import Chip from "@/components/Chip";
import Section from "@/components/Section";
import { stacks } from "@/data/stacks";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default function Stacks({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);

  return (
    <Section id="stack" title={dict.sections.stack}>
      <div className="flex flex-col gap-7">
        {stacks.map((category) => (
          <div
            key={category.label}
            className="flex flex-col gap-3 sm:flex-row sm:gap-10"
          >
            <p className="shrink-0 text-sm leading-none text-secondary sm:w-[100px]">
              {category.label}
            </p>
            <ul className="flex flex-1 flex-wrap items-center gap-x-2 gap-y-2.5">
              {category.items.map((item) => (
                <li key={item} className="flex">
                  <Chip>{item}</Chip>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
