export type InfoIcon = "linkedin" | "github" | "resume" | "email";

export interface InfoItem {
  icon: InfoIcon;
  label: string;
  content: string;
  href: string;
}

export const info: InfoItem[] = [
  {
    icon: "linkedin",
    label: "LinkedIn",
    content: "linkedin.com/in/sid12g",
    href: "https://linkedin.com/in/sid12g",
  },
  {
    icon: "github",
    label: "GitHub",
    content: "github.com/SID12g",
    href: "https://github.com/SID12g",
  },
  {
    icon: "resume",
    label: "Resume",
    content: "sid12g.dev/resume",
    href: "/resume",
  },
  {
    icon: "email",
    label: "Email",
    content: "i@sid12g.dev",
    href: "mailto:i@sid12g.dev",
  },
];
