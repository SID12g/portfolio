// 데이터는 "YYYY-MM" / "YYYY-MM-DD" 형식으로 저장하고, 화면에는 "YYYY.MM" / "YYYY.MM.DD"로 표시합니다.
export function formatDate(date: string): string {
  return date.replaceAll("-", ".");
}

export function formatPeriod(
  start: string,
  end: string | undefined,
  currentLabel: string,
): string {
  return `${formatDate(start)} - ${end ? formatDate(end) : currentLabel}`;
}
