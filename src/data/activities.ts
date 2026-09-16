import type { Locale } from "@/i18n/config";

export interface ActivityItem {
  role: string;
  organization: Record<Locale, string>;
  href: string;
  icon: string;
  iconRounded?: boolean;
  start: string;
  end?: string;
}

export const activities: ActivityItem[] = [
  {
    role: "Frontend Developer",
    organization: { ko: "Fingoo", en: "Fingoo" },
    href: "https://fingoo.vercel.app",
    icon: "/images/logos/fingoo.png",
    iconRounded: true,
    start: "2026-05",
  },
  {
    role: "Supporter",
    organization: {
      ko: "서울시립대학교 빅데이터혁신융합대학사업단",
      en: "University of Seoul BIGDATAHUB UNIVERSITY",
    },
    href: "https://bigdatahub.ac.kr",
    icon: "/images/logos/coss.png",
    start: "2026-04",
  },
];
