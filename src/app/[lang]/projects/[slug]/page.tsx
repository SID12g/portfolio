import { chipClass } from "@/components/Chip";
import { ArrowLeftIcon, ArrowUpRightIcon } from "@/components/icons";
import { MediaGallery } from "@/components/MediaPreview";
import Section from "@/components/Section";
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

  const source = meta.source?.replace(/^https?:\/\/(www\.)?/, "");
  const details = [
    { label: dict.team, value: meta.team },
    { label: dict.year, value: meta.date },
  ];

  return (
    <div className="flex flex-col gap-[60px]">
      <div className="flex flex-col gap-8">
        <Link
          href={localizePath(lang, "/projects")}
          className="-my-1 flex w-fit items-center gap-1.5 py-1 pr-2 text-sm leading-[1.2] font-medium text-secondary transition-colors duration-150 hover:text-primary"
        >
          <ArrowLeftIcon className="size-3.5" />
          {dict.title}
        </Link>

        <div className="aspect-video w-full overflow-hidden rounded-lg bg-surface">
          <Image
            src={meta.image}
            alt={`${meta.title} thumbnail`}
            width={1200}
            height={675}
            sizes="(min-width: 648px) 600px, 100vw"
            className="size-full object-cover"
            preload
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="size-12 shrink-0 overflow-hidden rounded-lg">
            <Image
              src={meta.logo}
              alt={`${meta.title} logo`}
              width={96}
              height={96}
              className="size-full object-cover"
            />
          </div>
          {/* 줄바꿈 시 줄 간격을 위해 leading 1.4를 주고, 음수 margin으로 한 줄일 때 높이는 leading 1.2와 같게 유지 */}
          <div className="flex min-w-0 flex-col gap-2 leading-[1.4] break-keep *:-my-[0.1em]">
            <h1 className="text-lg font-semibold text-primary">
              {meta.title}
            </h1>
            <p className="text-sm text-secondary">{meta.description}</p>
          </div>
        </div>

        {/* 본문과 구분되도록 테두리로 묶고, 행마다 구분선을 넣어 한눈에 훑어볼 수 있게 함 */}
        <dl className="flex flex-col divide-y divide-line rounded-xl border border-line text-sm leading-[1.2]">
          {details.map(({ label, value }) => (
            <DetailRow key={label} label={label}>
              <span className="font-medium text-primary">{value}</span>
            </DetailRow>
          ))}
          {source && (
            <DetailRow label={dict.link}>
              <Link
                href={meta.source}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-w-0 items-center gap-1 font-medium text-primary underline decoration-line decoration-1 underline-offset-4 transition-colors duration-150 hover:decoration-current"
              >
                <span className="truncate">{source}</span>
                <ArrowUpRightIcon className="size-3 shrink-0 text-secondary transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </DetailRow>
          )}
          {stacks.length > 0 && (
            <DetailRow label={dict.stack} className="py-3">
              <ul className="flex flex-wrap gap-x-2 gap-y-2.5">
                {stacks.map((stack) => (
                  <li key={stack} className="flex">
                    <Link
                      href={`${localizePath(lang, "/projects")}?tag=${encodeURIComponent(stack)}`}
                      data-cursor="lift"
                      className={`${chipClass} bg-invert-bg text-invert-fg transition-colors duration-150 [--lift-scale:1.05] hover:bg-invert-hover`}
                    >
                      {stack}
                    </Link>
                  </li>
                ))}
              </ul>
            </DetailRow>
          )}
        </dl>
      </div>

      <article className="prose-custom">
        <MDXRemote
          source={content}
          components={getMdxComponents(lang)}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </article>

      {assets.length > 0 && (
        <Section title={dict.assets}>
          <MediaGallery
            lang={lang}
            items={assets.map((a) => ({
              src: a.url,
              name: a.name,
              type: a.type,
            }))}
          />
        </Section>
      )}
    </div>
  );
}

function DetailRow({
  label,
  className = "py-4",
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    // 스택 칩처럼 높이가 다른 값도 첫 줄 글자 기준선에 라벨을 맞춤
    <div className={`flex items-baseline gap-6 px-4 sm:gap-10 sm:px-5 ${className}`}>
      <dt className="w-14 shrink-0 text-secondary sm:w-20">{label}</dt>
      <dd className="flex min-w-0 flex-1">{children}</dd>
    </div>
  );
}
