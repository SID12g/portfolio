import Image from "next/image";
import Link from "next/link";
import HeaderNav from "@/components/HeaderNav";
import { localizePath, type Locale } from "@/i18n/config";

export default function Header({ lang }: { lang: Locale }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
      <Link
        href={localizePath(lang, "/")}
        className="flex shrink-0 items-center gap-2 font-mono text-sm leading-[1.2] font-semibold text-primary transition-colors duration-150 hover:text-secondary"
      >
        <Image
          src="https://avatars.githubusercontent.com/u/119688507?v=4"
          alt=""
          width={18}
          height={18}
          className="size-[18px] rounded-full object-cover"
        />
        @lwmsc_
      </Link>
      <HeaderNav projectsHref={localizePath(lang, "/projects")} />
    </header>
  );
}
