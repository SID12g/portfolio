import type { Locale } from "@/i18n/config";

// 데이터는 "YYYY-MM" / "YYYY-MM-DD" 형식으로 저장하고, 화면에는 로케일에 맞춰 표시합니다.
// ko: "2026.03" / "2026.03.01", en: "Mar. 2026" / "Mar. 1, 2026"
// en은 표기를 통일하기 위해 모든 달 뒤에 마침표를 붙입니다.
const MONTHS_EN = [
  "Jan.",
  "Feb.",
  "Mar.",
  "Apr.",
  "May.",
  "Jun.",
  "Jul.",
  "Aug.",
  "Sep.",
  "Oct.",
  "Nov.",
  "Dec.",
];

export function formatDate(date: string, lang: Locale): string {
  if (lang === "ko") return date.replaceAll("-", ".");

  const [year, month, day] = date.split("-");
  const monthName = MONTHS_EN[Number(month) - 1];
  return day
    ? `${monthName} ${Number(day)}, ${year}`
    : `${monthName} ${year}`;
}

export function formatPeriod(
  start: string,
  end: string | undefined,
  currentLabel: string,
  lang: Locale,
): string {
  const separator = lang === "ko" ? " - " : " – ";
  const endLabel = end ? formatDate(end, lang) : currentLabel;
  return `${formatDate(start, lang)}${separator}${endLabel}`;
}
