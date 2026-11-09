"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

const linkClass = "transition-colors duration-150 hover:text-primary";

export default function HeaderNav({ projectsHref }: { projectsHref: string }) {
  // 프록시 리라이트(/ → /ko) 영향을 받지 않도록 [lang] 레이아웃 아래 세그먼트로 현재 위치를 판단
  // (404 페이지는 레이아웃 밖에서 렌더링되어 세그먼트가 null)
  const isProjects = useSelectedLayoutSegment() === "projects";

  return (
    <nav className="flex items-center gap-4 font-mono text-sm leading-[1.2] font-medium whitespace-nowrap text-secondary sm:gap-7">
      <Link
        href={projectsHref}
        aria-current={isProjects ? "page" : undefined}
        // JetBrains Mono는 굵기와 관계없이 글자 폭이 같아 굵기가 바뀌어도 메뉴가 흔들리지 않음
        className={`${linkClass} ${isProjects ? "font-semibold text-primary" : ""}`}
      >
        projects
      </Link>
      <a
        href="https://blog.sid12g.dev"
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        blog
      </a>
      <a href="mailto:i@sid12g.dev" className={linkClass}>
        i@sid12g.dev
      </a>
    </nav>
  );
}
