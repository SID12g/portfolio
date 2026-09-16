import { getMdxComponents } from "@/components/mdx-components";
import { MediaGallery } from "@/components/MediaPreview";
import Separator from "@/components/Separator";
import Tag from "@/components/Tag";
import { getProjectAssets, getProjects } from "@/utils/projects";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import remarkGfm from "remark-gfm";
import { locales, localizePath, type Locale } from "@/i18n/config";

export async function generateStaticParams() {
  return locales.flatMap((lang) =>
    getProjects(lang).map((p) => ({ lang, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: rawLang, slug } = await params;
  const lang = rawLang as Locale;
  const project = getProjects(lang).find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.meta.title} • sid12g`,
    description: project.meta.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: rawLang, slug } = await params;
  const lang = rawLang as Locale;
  const project = getProjects(lang).find((p) => p.slug === slug);
  if (!project) notFound();

  const { meta, content } = project;
  const assets = getProjectAssets(slug);

  return (
    <div className="flex flex-col gap-8">
      <Link
        href={localizePath(lang, "/projects")}
        className="text-sm text-muted font-jetbrains-mono hover:text-primary transition-colors duration-150"
      >
        ← PROJECTS
      </Link>

      {/* 썸네일 */}
      <div className="w-full rounded-2xl overflow-hidden border border-faint">
        <Image
          src={meta.image}
          alt={`${meta.title} thumbnail`}
          width={1200}
          height={630}
          className="w-full object-cover"
          priority
        />
      </div>

      {/* 로고 | 프로젝트명, 설명 */}
      <div className="flex flex-row gap-4 items-center">
        <div className="w-[64px] h-[64px] rounded-xl overflow-hidden border border-faint flex-shrink-0">
          <Image
            src={meta.logo}
            alt={`${meta.title} logo`}
            width={128}
            height={128}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-lg font-medium">{meta.title}</p>
          <p className="text-sm text-muted font-medium">{meta.description}</p>
        </div>
      </div>

      {/* 팀 여부, 날짜, 소스 */}
      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-muted font-jetbrains-mono px-3 py-[6px] bg-muted-15 rounded-full border border-faint flex flex-row gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          {meta.team}
        </span>
        <span className="text-xs text-muted font-jetbrains-mono px-3 py-[6px] bg-muted-15 rounded-full border border-faint flex flex-row gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
          </svg>
          {meta.date}
        </span>
        {meta.source && (
          <a
            href={meta.source}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted font-jetbrains-mono px-3 py-[6px] bg-muted-15 rounded-full border border-faint flex flex-row gap-2 items-center hover:border-accent hover:text-primary transition-colors duration-150"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
            Source ↗
          </a>
        )}
      </div>

      {/* 스택 태그 */}
      {meta.stacks && (
        <div className="flex flex-wrap gap-3">
          {meta.stacks.split(",").map((stack) => (
            <Tag key={stack.trim()} label={stack.trim()} />
          ))}
        </div>
      )}

      <div className="w-full h-[1px] bg-white-10" />

      {/* MDX 콘텐츠 */}
      <article className="prose-custom">
        <MDXRemote
          source={content}
          components={getMdxComponents(lang)}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </article>

      {/* 에셋 갤러리 */}
      {assets.length > 0 && (
        <div>
          <Separator title="ASSETS" />
          <MediaGallery
            lang={lang}
            items={assets.map((a) => ({ src: a.url, name: a.name, type: a.type }))}
          />
        </div>
      )}
    </div>
  );
}
