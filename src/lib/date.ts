import i18next from "i18next";

// Formats "YYYY-MM" to localized "Mon YYYY" using the current i18n language
export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const [year, month] = dateStr.split("-");
  const monthIndex = Number.parseInt(month, 10) - 1;
  if (Number.isNaN(monthIndex) || monthIndex < 0 || monthIndex > 11) return year ?? dateStr;
  const date = new Date(Number.parseInt(year, 10), monthIndex);
  return date.toLocaleDateString(i18next.language, { month: "short", year: "numeric" });
}

export function nowISO(): string {
  return new Date().toISOString();
}
