import { getMdxComponents } from "@/components/mdx-components";
import { MediaGallery } from "@/components/MediaPreview";
import Divider from "@/components/Divider";
import { ArrowLeftIcon, CalendarIcon, CodeIcon, UsersIcon } from "@/components/icons";
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
        className="flex w-fit items-center gap-2 text-sm font-medium text-nav-inactive transition-colors duration-150 hover:text-primary"
      >
        <ArrowLeftIcon className="size-3.5" />
        {dict.title}
      </Link>

      <div className="aspect-video w-full overflow-hidden rounded-2xl border border-faint">
        <Image
          src={meta.image}
          alt={`${meta.title} thumbnail`}
          width={1440}
          height={810}
          className="size-full object-cover"
          priority
        />
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex min-w-0 flex-1 items-center gap-5">
            <div className="size-14 shrink-0 overflow-hidden rounded-lg border border-faint">
              <Image
                src={meta.logo}
                alt={`${meta.title} logo`}
                width={112}
                height={112}
                className="size-full object-cover"
              />
            </div>
            <div className="flex min-w-0 flex-col gap-2">
              <h1 className="text-[32px] leading-none font-semibold tracking-tight">
                {meta.title}
              </h1>
              <p className="text-base text-muted">{meta.description}</p>
            </div>
          </div>
          {meta.source && (
            <Link
              href={meta.source}
              target="_blank"
              rel="noopener noreferrer"
              className="flex shrink-0 items-center gap-2 rounded-full border border-surface-border bg-background px-3.5 py-2 text-sm font-medium text-muted transition-colors duration-150 hover:text-primary"
            >
              <CodeIcon className="size-3.5" />
              Source
            </Link>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-5">
          <span className="flex items-center gap-2 text-sm text-muted">
            <UsersIcon className="size-3.5" />
            {meta.team}
          </span>
          <span className="flex items-center gap-2 text-sm text-muted">
            <CalendarIcon className="size-3.5" />
            {meta.date}
          </span>
        </div>

        {stacks.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {stacks.map((stack) => (
              <span
                key={stack}
                className="rounded-full bg-muted-15 px-3.5 py-2 text-sm font-medium"
              >
                {stack}
              </span>
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
        <div className="flex flex-col gap-8">
          <h2 className="text-xl font-bold tracking-tight">Assets</h2>
          <MediaGallery
            lang={lang}
            items={assets.map((a) => ({ src: a.url, name: a.name, type: a.type }))}
          />
        </div>
      )}
    </div>
  );
}
