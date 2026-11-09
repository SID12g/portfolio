import Image from "next/image";
import Link from "next/link";
import HeaderNav from "@/components/HeaderNav";
import { localizePath, type Locale } from "@/i18n/config";

export default function Header({ lang }: { lang: Locale }) {
  return (
    // 화면 너비 전체에 걸쳐 상단에 고정되고, 내용은 본문과 같은 폭으로 정렬
    <header className="site-header sticky top-0 z-40 border-b border-transparent bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[648px] flex-wrap items-center justify-between gap-x-4 gap-y-3 px-6 py-4">
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
      </div>
    </header>
  );
}
