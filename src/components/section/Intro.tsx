import Section from "@/components/Section";
import type { Locale } from "@/i18n/config";
import { getDictionary, type IntroSegment } from "@/i18n/dictionaries";

export default function Intro({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);

  return (
    <Section id="intro" title={dict.sections.intro}>
      <div className="flex flex-col gap-3 text-sm leading-[1.7] break-keep text-secondary">
        {dict.intro.paragraphs.map((segments, i) => (
          <p key={i}>
            {segments.map((segment, j) => (
              <Segment key={j} segment={segment} />
            ))}
          </p>
        ))}
      </div>
    </Section>
  );
}

function Segment({ segment }: { segment: IntroSegment }) {
  const className = segment.bold ? "font-medium text-primary" : undefined;

  if (segment.href) {
    return (
      <a
        href={segment.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${className ?? ""} underline decoration-line decoration-1 underline-offset-4 transition-colors duration-150 hover:decoration-current`.trim()}
      >
        {segment.text}
      </a>
    );
  }

  return <span className={className}>{segment.text}</span>;
}
