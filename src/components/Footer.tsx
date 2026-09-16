import Link from "next/link";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { localizePath, type Locale } from "@/i18n/config";

export default function Footer({ lang }: { lang: Locale }) {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-14 mb-3 flex flex-row items-center justify-between gap-4">
      <p className="text-xs sm:text-sm text-muted font-jetbrains-mono">
        © {year}{" "}
        <Link
          href={localizePath(lang, "/")}
          className="hover:text-accent transition-colors duration-150"
        >
          sid12g
        </Link>{" "}
        All rights reserved.
      </p>
      <LanguageSwitcher lang={lang} />
    </footer>
  );
}
