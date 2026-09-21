import type { Locale } from "@/i18n/config";

export interface ActivityItem {
  role: Record<Locale, string>;
  organization: Record<Locale, string>;
  href: string;
  icon: string;
  iconRounded?: boolean;
  start: string;
  end?: string;
}

export const activities: ActivityItem[] = [
  {
    role: { ko: "Frontend Developer", en: "Frontend Developer" },
    organization: { ko: "Fingoo", en: "Fingoo" },
    href: "https://fingoo.vercel.app",
    icon: "/images/logos/fingoo.svg",
    iconRounded: true,
    start: "2026-05",
  },
  {
    role: { ko: "Supporter", en: "Student Ambassador" },
    organization: {
      ko: "서울시립대학교 빅데이터혁신융합대학사업단",
      en: "University of Seoul BigData University",
    },
    href: "https://bigdatahub.ac.kr",
    icon: "/images/logos/coss.svg",
    start: "2026-04",
  },
];
