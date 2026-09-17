import Divider from "@/components/Divider";
import {
  ArrowLeftIcon,
  CalendarIcon,
  CodeIcon,
  UsersIcon,
} from "@/components/icons";
import { MediaGallery } from "@/components/MediaPreview";
import { getMdxComponents } from "@/components/mdx-components";
import { getProjectAssets, getProjects } from "@/utils/projects";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import remarkGfm from "remark-gfm";
import { locales, localizePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

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
  const dict = getDictionary(lang).projectsPage;
  const stacks = meta.stacks
    ? meta.stacks.split(",").map((stack) => stack.trim())
    : [];

  return (
    <div className="flex flex-col gap-11">
      <Link
        href={localizePath(lang, "/projects")}
        className="-my-2 flex w-fit items-center gap-2 py-2 pr-2 text-sm leading-none font-medium text-nav-inactive transition-colors duration-150 hover:text-primary"
      >
        <ArrowLeftIcon className="size-3.5" />
        {dict.title}
      </Link>

      <div className="aspect-video w-full overflow-hidden rounded-2xl border border-surface-border">
        <Image
          src={meta.image}
          alt={`${meta.title} thumbnail`}
          width={1440}
          height={810}
          sizes="(min-width: 768px) 720px, 100vw"
          className="size-full object-cover"
          preload
        />
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-5">
          <div className="size-14 shrink-0 overflow-hidden rounded-lg">
            <Image
              src={meta.logo}
              alt={`${meta.title} logo`}
              width={112}
              height={112}
              className="size-full object-cover"
            />
          </div>
          <div className="flex min-w-0 flex-col gap-2">
            <h1 className="text-[32px] leading-none font-semibold">
              {meta.title}
            </h1>
            <p className="text-base leading-[1.4] font-medium text-muted">
              {meta.description}
            </p>
          </div>
        </div>

        {/* Source 버튼은 제목 옆에 두면 모바일이나 긴 설명에서 제목 영역이 좁아지므로 팀·날짜 줄 오른쪽에 배치 */}
        <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3">
          <div className="flex flex-wrap items-center gap-5">
            <span className="flex items-center gap-2 text-sm font-medium text-muted">
              <UsersIcon className="size-3.5" />
              {meta.team}
            </span>
            <span className="flex items-center gap-2 text-sm font-medium text-muted">
              <CalendarIcon className="size-3.5" />
              {meta.date}
            </span>
          </div>
          {meta.source && (
            <Link
              href={meta.source}
              target="_blank"
              rel="noopener noreferrer"
              className="flex shrink-0 items-center gap-2 rounded-full border border-surface-border bg-background px-3.5 py-2 text-sm font-medium text-muted transition-colors duration-150 hover:bg-muted-15 hover:text-primary"
            >
              <CodeIcon className="size-3.5" />
              Source
            </Link>
          )}
        </div>

        {stacks.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {stacks.map((stack) => (
              <Link
                key={stack}
                href={`${localizePath(lang, "/projects")}?tag=${encodeURIComponent(stack)}`}
                className="rounded-full bg-muted-15 px-3.5 py-2 text-sm font-medium transition-colors duration-150 hover:bg-surface-border"
              >
                {stack}
              </Link>
            ))}
          </div>
        )}
      </div>

      <Divider />

      <article className="prose-custom">
        <MDXRemote
          source={content}
          components={getMdxComponents(lang)}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </article>

      {assets.length > 0 && (
        <section className="flex flex-col gap-8">
          <h2 className="text-xl leading-none font-bold">{dict.assets}</h2>
          <MediaGallery
            lang={lang}
            items={assets.map((a) => ({
              src: a.url,
              name: a.name,
              type: a.type,
            }))}
          />
        </section>
      )}
    </div>
  );
}
