import Separator from "@/components/Separator";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default function Intro({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang).intro;
  const textStyle = `font-medium text-sm sm:text-base`;
  return (
    <div>
      <Separator title="INTRO" />
      <div className="flex flex-col gap-4">
        {dict.paragraphs.map((paragraph) => (
          <p key={paragraph} className={textStyle}>
            {paragraph}
          </p>
        ))}
        <p className={textStyle}>
          {dict.figma}{" "}
          <Link
            className="text-muted hover:text-accent transition-colors duration-150"
            href="https://blog.sid12g.dev/figma-book"
            target="_blank"
            rel="noopener noreferrer"
          >
            {dict.learnMore}
          </Link>
        </p>
        <p className={textStyle}>{dict.closing}</p>
      </div>
    </div>
  );
}
