"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRightIcon } from "@/components/icons";
import { localizePath, type Locale } from "@/i18n/config";

const featuredTags = [
  "Next.js",
  "React Native",
  "Expo",
  "Tailwind CSS",
  "TanStack Query",
  "Vite",
] as const;

export interface ProjectListItem {
  slug: string;
  title: string;
  description: string;
  preview: string;
  stacks: string[];
}

export default function ProjectList({
  lang,
  projects,
  allLabel,
}: {
  lang: Locale;
  projects: ProjectListItem[];
  allLabel: string;
}) {
  const [active, setActive] = useState<string | null>(null);
  const filtered = active
    ? projects.filter((project) =>
        project.stacks.some(
          (stack) => stack.toLocaleLowerCase() === active.toLocaleLowerCase(),
        ),
      )
    : projects;

  return (
    <div className="flex w-full flex-col gap-11">
      <div className="flex flex-wrap items-center gap-3">
        <FilterTag
          label={allLabel}
          active={active === null}
          onClick={() => setActive(null)}
        />
        {featuredTags.map((tag) => (
          <FilterTag
            key={tag}
            label={tag}
            active={active === tag}
            onClick={() => setActive(tag)}
          />
        ))}
      </div>
      <div className="flex flex-col gap-8">
        {filtered.map((project) => (
          <Link
            key={project.slug}
            href={localizePath(lang, `/projects/${project.slug}`)}
            className="group flex w-full items-center justify-between gap-5"
          >
            <div className="flex min-w-0 items-center gap-5">
              <div className="size-20 shrink-0 overflow-hidden rounded-lg bg-muted-15">
                <Image
                  src={project.preview}
                  alt=""
                  width={160}
                  height={160}
                  className="size-full object-cover"
                />
              </div>
              <div className="flex min-w-0 flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <p className="text-base font-semibold">
                    {project.title}
                  </p>
                  <p className="text-sm text-muted">{project.description}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  {project.stacks.map((stack) => (
                    <span key={stack} className="text-sm text-muted">
                      {stack}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <ArrowUpRightIcon className="size-4 shrink-0 text-muted transition-colors duration-150 group-hover:text-primary" />
          </Link>
        ))}
      </div>
    </div>
  );
}

function FilterTag({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "rounded-full bg-invert-bg px-3.5 py-2 text-sm font-medium text-invert-fg"
          : "rounded-full bg-muted-15 px-3.5 py-2 text-sm font-medium transition-colors duration-150 hover:bg-hover"
      }
    >
      {label}
    </button>
  );
}
