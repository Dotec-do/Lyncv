import { memo } from "react";
import { useTranslation } from "react-i18next";
import type { PersonalInfo } from "../../../types/cv";

interface PersonalHeaderProps {
  data: PersonalInfo;
  layout?: "inline" | "stacked";
  className?: string;
}

export const PersonalHeader = memo(function PersonalHeader({ data, layout = "inline", className = "" }: PersonalHeaderProps) {
  const { t } = useTranslation();
  const fullName = `${data.firstName} ${data.lastName}`.trim();
  const contactItems = [data.email, data.phone, data.location].filter(Boolean);
  const links = [
    data.website && { label: t("cv.website"), url: data.website },
    data.linkedin && { label: t("cv.linkedin"), url: data.linkedin },
  ].filter(Boolean) as { label: string; url: string }[];

  if (!fullName && contactItems.length === 0) return null;

  return (
    <div className={className}>
      {fullName && <h1 className="text-2xl font-bold">{fullName}</h1>}
      <div className={`mt-1 text-sm text-gray-600 ${layout === "inline" ? "flex flex-wrap gap-x-3 gap-y-1" : "flex flex-col gap-1"}`}>
        {contactItems.map((item) => (
          <span key={item}>{item}</span>
        ))}
        {links.map((link) => (
          <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="text-emerald-600 hover:underline">
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
});
