export interface StackCategory {
  label: string;
  items: string[];
}

export const stacks: StackCategory[] = [
  {
    label: "Development",
    items: [
      "React",
      "Next.js",
      "React Native",
      "Expo",
      "Tailwind CSS",
      "TanStack Query",
      "Vite",
      "pnpm",
    ],
  },
  {
    label: "Data & Infra",
    items: ["PostgreSQL", "MongoDB", "Vercel", "Cloudflare"],
  },
  {
    label: "Work",
    items: ["Git", "GitHub Actions", "Figma", "Notion", "Claude Code", "Codex"],
  },
];
