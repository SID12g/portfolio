import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Locale } from "@/i18n/config";
import { getAssetType, type AssetType } from "@/utils/media";

export interface ProjectAsset {
  name: string;
  url: string;
  type: AssetType;
}

export function getProjectAssets(slug: string): ProjectAsset[] {
  const assetsDir = path.join(process.cwd(), "public", "projects", slug, "assets");
  if (!fs.existsSync(assetsDir)) return [];

  return fs
    .readdirSync(assetsDir)
    .filter((f) => !f.startsWith("."))
    .flatMap((file) => {
      const ext = path.extname(file).toLowerCase();

      if (ext === ".json") {
        const raw = fs.readFileSync(path.join(assetsDir, file), "utf-8");
        const json = JSON.parse(raw) as { type?: string; name?: string; href?: string };
        if ((json.type === "pdf" || json.type === "link") && json.href && json.name) {
          return [{ name: json.name, url: json.href, type: json.type as AssetType }];
        }
        return [];
      }

      return [
        {
          name: file,
          url: `/projects/${slug}/assets/${file}`,
          type: getAssetType(file),
        },
      ];
    });
}

interface ProjectMeta {
  title: string;
  description: string;
  image: string;
  logo: string;
  preview: string;
  team: string;
  date: string;
  source: string;
  stacks: string;
  order: number;
}

interface Project {
  meta: ProjectMeta;
  slug: string;
  content: string;
}

const projectDir = "projects";

export function getProjects(lang: Locale): Project[] {
  const dir = path.join(process.cwd(), projectDir, lang);
  const projectFiles = fs.readdirSync(dir);

  const allProjects: Project[] = projectFiles
    .filter((f) => f.endsWith(".mdx"))
    .map((filename) => {
      const fileContent = fs.readFileSync(
        path.join(dir, filename),
        "utf-8",
      );
      const { data: frontMatter, content } = matter(fileContent);

      return {
        meta: frontMatter as Project["meta"],
        slug: filename.replace(".mdx", ""),
        content,
      };
    });

  return allProjects.sort((a, b) => {
    return b.meta.order - a.meta.order;
  });
}
