import { Suspense } from "react";
import ProjectList, {
  ProjectListFallback,
} from "@/components/section/ProjectList";
import { getProjects } from "@/utils/projects";
import type { Locale } from "@/i18n/config";
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
  const listProps = { lang, projects, allLabel: dict.all };

  return (
    <div className="flex flex-col gap-[60px]">
      <div className="flex flex-col gap-3">
        <h1 className="font-mono text-lg leading-[1.2] font-semibold text-primary">
          Projects
        </h1>
        <p className="font-mono text-sm leading-[1.2] font-medium text-secondary">
          {projects.length} projects
        </p>
      </div>
      <Suspense fallback={<ProjectListFallback {...listProps} />}>
        <ProjectList {...listProps} />
      </Suspense>
    </div>
  );
}
