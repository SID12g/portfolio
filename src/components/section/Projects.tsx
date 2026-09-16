import Separator from "@/components/Separator";
import Tag from "@/components/Tag";
import MoreLink from "@/components/MoreLink";
import { getProjects } from "@/utils/projects";
import Image from "next/image";
import Link from "next/link";
import { localizePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default function Projects({ lang }: { lang: Locale }) {
  const projects = getProjects(lang).slice(0, 4);
  const dict = getDictionary(lang).common;

  return (
    <div>
      <Separator title="PROJECTS" />
      <div className="flex flex-col gap-5">
        {projects.map((project) => (
          <ProjectItemView
            key={project.slug}
            href={localizePath(lang, `/projects/${project.slug}`)}
            image={project.meta.preview}
            title={project.meta.title}
            description={project.meta.description}
            tags={project.meta.stacks.split(",")}
          />
        ))}
        <MoreLink href={localizePath(lang, "/projects")} label={dict.more} />
      </div>
    </div>
  );
}

function ProjectItemView({
  href,
  image,
  title,
  description,
  tags,
}: {
  href: string;
  image: string;
  title: string;
  description: string;
  tags: string[];
}) {
  return (
    <Link
      href={href}
      className="flex flex-col gap-4 px-5 py-6 rounded-2xl border border-faint bg-muted-5 hover:border-accent hover:bg-hover transition-colors duration-150"
    >
      <div className="flex flex-row">
        <div className="w-[120px] h-[120px] flex-shrink-0 rounded-md overflow-hidden mr-4">
          <Image
            src={image}
            alt="Project Image"
            width={256}
            height={256}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-base sm:text-lg font-semibold">{title}</p>
            <p className="text-sm sm:text-base text-muted font-medium">
              {description}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
