import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/icons";
import type { Locale } from "@/i18n/config";
import { getDictionary, type IntroSegment } from "@/i18n/dictionaries";

export default function Intro({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);

  return (
    <section id="intro" className="flex w-full flex-col gap-8">
      <h2 className="text-xl leading-none font-bold">
        {dict.sections.intro}
      </h2>
      <div className="flex flex-col gap-3 text-base leading-[1.7] font-medium tracking-[-0.02em] text-muted">
        {dict.intro.paragraphs.map((segments, i) => (
          <p key={i}>
            {segments.map((segment, j) => (
              <Segment key={j} segment={segment} />
            ))}
          </p>
        ))}
      </div>
    </section>
  );
}

function Segment({ segment }: { segment: IntroSegment }) {
  const className = segment.bold ? "font-semibold text-primary" : undefined;

  if (segment.href) {
    return (
      <Link
        href={segment.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${className ?? ""} group py-1 underline decoration-nav-inactive decoration-1 underline-offset-4 transition-colors duration-150 hover:text-muted`.trim()}
      >
        {segment.text}
        <ArrowUpRightIcon className="mx-0.5 size-3.5 align-[-1px] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    );
  }

  return <span className={className}>{segment.text}</span>;
}
