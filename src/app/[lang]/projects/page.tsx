import Link from "next/link";
import Divider from "@/components/Divider";
import { ArrowLeftIcon } from "@/components/icons";
import ProjectList from "@/components/section/ProjectList";
import { getProjects } from "@/utils/projects";
import { localizePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = (await params).lang as Locale;

  return {
    title: "Projects • sid12g",
    description: getDictionary(lang).projectsPage.metaDescription,
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = (await params).lang as Locale;
  const dict = getDictionary(lang).projectsPage;
  const projects = getProjects(lang).map((project) => ({
    slug: project.slug,
    title: project.meta.title,
    description: project.meta.description,
    preview: project.meta.preview,
    stacks: project.meta.stacks.split(",").map((stack) => stack.trim()),
  }));

  return (
    <div className="flex flex-col gap-11">
      <div className="flex flex-col gap-6">
        <Link
          href={localizePath(lang, "/")}
          className="flex w-fit items-center gap-2 text-sm font-medium text-nav-inactive transition-colors duration-150 hover:text-primary"
        >
          <ArrowLeftIcon className="size-3.5" />
          {dict.breadcrumb}
        </Link>
        <h1 className="text-[40px] leading-none font-bold tracking-tight">
          {dict.title}
        </h1>
      </div>
      <Divider />
      <ProjectList lang={lang} projects={projects} allLabel={dict.all} />
    </div>
  );
}
