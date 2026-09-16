export const locales = ["ko", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ko";

export function localizePath(lang: Locale, path: string): string {
  if (lang === "en") return path === "/" ? "/en" : `/en${path}`;
  return path;
}
