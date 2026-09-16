import type { Locale } from "@/i18n/config";

export interface ActivityItem {
  role: string;
  organization: Record<Locale, string>;
  href: string;
  period: string;
  current?: boolean;
}

export const activities: ActivityItem[] = [
  {
    role: "Frontend Developer",
    organization: { ko: "Fingoo", en: "Fingoo" },
    href: "https://fingoo.vercel.app",
    period: "2026.05 ~",
    current: true,
  },
  {
    role: "Supporter",
    organization: {
      ko: "서울시립대학교 빅데이터혁신융합대학사업단",
      en: "University of Seoul BIGDATAHUB UNIVERSITY",
    },
    href: "https://bigdatahub.ac.kr",
    period: "2026.04 ~",
    current: true,
  },
];
