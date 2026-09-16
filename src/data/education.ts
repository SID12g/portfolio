import type { Locale } from "@/i18n/config";

export interface EducationItem {
  school: Record<Locale, string>;
  href: string;
  major: Record<Locale, string>;
  period: string;
  current?: boolean;
}

export const education: EducationItem[] = [
  {
    school: { ko: "서울시립대학교", en: "University of Seoul" },
    href: "https://www.uos.ac.kr",
    major: { ko: "통계학과", en: "Department of Statistics" },
    period: "2026.03 ~",
    current: true,
  },
  {
    school: {
      ko: "한국디지털미디어고등학교",
      en: "Korea Digital Media High School",
    },
    href: "https://dimigo-h.goeas.kr",
    major: { ko: "웹프로그래밍과", en: "Department of Web Programming" },
    period: "2023.03 ~ 2026.01",
  },
];
