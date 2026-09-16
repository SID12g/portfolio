import type { Locale } from "@/i18n/config";

export interface EducationItem {
  school: Record<Locale, string>;
  href: string;
  icon: string;
  major: Record<Locale, string>;
  start: string;
  end?: string;
}

export const education: EducationItem[] = [
  {
    school: { ko: "서울시립대학교", en: "University of Seoul" },
    href: "https://www.uos.ac.kr",
    icon: "/images/logos/uos.svg",
    major: { ko: "통계학과", en: "Department of Statistics" },
    start: "2026-03",
  },
  {
    school: {
      ko: "한국디지털미디어고등학교",
      en: "Korea Digital Media High School",
    },
    href: "https://dimigo-h.goeas.kr",
    icon: "/images/logos/dimigo.svg",
    major: { ko: "웹프로그래밍과", en: "Department of Web Programming" },
    start: "2023-03",
    end: "2026-01",
  },
];
