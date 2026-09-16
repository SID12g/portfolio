import type { Locale } from "@/i18n/config";

export interface CertificationItem {
  name: Record<Locale, string>;
  issuer: Record<Locale, string>;
  href: string;
  date: string;
}

export const certifications: CertificationItem[] = [
  {
    name: { ko: "육상무선통신사", en: "Land Radio Communications Operator" },
    issuer: {
      ko: "한국방송통신전파진흥원",
      en: "Korea Communication Agency",
    },
    href: "https://www.kca.kr",
    date: "2026.09",
  },
  {
    name: { ko: "프로그래밍기능사", en: "Craftsman Programming" },
    issuer: {
      ko: "한국산업인력공단",
      en: "Human Resources Development Service of Korea",
    },
    href: "https://www.hrdkorea.or.kr",
    date: "2026.04",
  },
  {
    name: { ko: "리눅스마스터 2급", en: "Linux Master Level 2" },
    issuer: {
      ko: "한국정보통신진흥협회",
      en: "Korea Association for AI & ICT Promotion",
    },
    href: "https://www.kait.or.kr",
    date: "2023.10",
  },
];
