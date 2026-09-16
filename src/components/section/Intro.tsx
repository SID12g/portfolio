import Link from "next/link";
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
        className={`${className ?? ""} py-1 underline-offset-4 hover:underline`.trim()}
      >
        {segment.text}
      </Link>
    );
  }

  return <span className={className}>{segment.text}</span>;
}
