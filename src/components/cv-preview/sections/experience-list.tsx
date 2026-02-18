import { memo } from "react";
import { useTranslation } from "react-i18next";
import type { ExperienceItem } from "../../../types/cv";
import { formatDate } from "../../../lib/date";

interface ExperienceListProps {
  items: ExperienceItem[];
  className?: string;
}

export const ExperienceList = memo(function ExperienceList({ items, className = "" }: ExperienceListProps) {
  const { t } = useTranslation();
  if (items.length === 0) return null;
  return (
    <div className={className}>
      <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 mb-3">
        {t("sections.experience")}
      </h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id}>
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="text-sm font-semibold text-gray-900">{item.jobTitle}</h3>
              <span className="text-xs text-gray-500 shrink-0">
                {formatDate(item.startDate)} &ndash; {item.isCurrent ? t("cv.present") : formatDate(item.endDate)}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {item.company}{item.location ? `, ${item.location}` : ""}
            </p>
            {item.description && (
              <p className="mt-1 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
});
