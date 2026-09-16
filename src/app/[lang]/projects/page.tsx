import Separator from "@/components/Separator";
import Tag from "@/components/Tag";
import { getProjects } from "@/utils/projects";
import Image from "next/image";
import Link from "next/link";
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
  const projects = getProjects(lang);

  return (
    <div>
      <Link
        href={localizePath(lang, "/")}
        className="text-sm text-muted font-jetbrains-mono hover:text-primary transition-colors duration-150"
      >
        ← HOME
      </Link>
      <div className="h-8" />
      <Separator title="PROJECTS" />
      <div className="flex flex-col gap-5">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={localizePath(lang, `/projects/${project.slug}`)}
            className="flex flex-col gap-4 px-5 py-6 rounded-2xl border border-faint bg-muted-5 hover:border-accent hover:bg-hover transition-colors duration-150"
          >
            <div className="flex flex-row">
              <div className="w-[120px] h-[120px] flex-shrink-0 rounded-md overflow-hidden mr-4">
                <Image
                  src={project.meta.preview}
                  alt="Project Image"
                  width={256}
                  height={256}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-between gap-6">
                <div className="flex flex-col gap-2">
                  <p className="text-base sm:text-lg font-semibold">
                    {project.meta.title}
                  </p>
                  <p className="text-sm sm:text-base text-muted font-medium">
                    {project.meta.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {project.meta.stacks.split(",").map((tag) => (
                    <Tag key={tag} label={tag} />
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
