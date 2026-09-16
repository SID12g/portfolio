import Link from "next/link";
import Divider from "@/components/Divider";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { localizePath, type Locale } from "@/i18n/config";

export default function Footer({ lang }: { lang: Locale }) {
  const year = new Date().getFullYear();
  return (
    <footer className="mx-auto flex w-full max-w-[768px] flex-col gap-10 px-6 pt-11 pb-6">
      <Divider />
      <div className="flex flex-row flex-wrap items-center justify-between gap-4">
        <p className="text-sm leading-none text-muted">
          © {year}{" "}
          <Link
            href={localizePath(lang, "/")}
            className="py-2 transition-colors duration-150 hover:text-primary"
          >
            sid12g
          </Link>{" "}
          All rights reserved.
        </p>
        <LanguageSwitcher lang={lang} />
      </div>
    </footer>
  );
}
