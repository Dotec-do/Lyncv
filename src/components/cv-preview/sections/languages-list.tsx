import { memo } from "react";
import { useTranslation } from "react-i18next";
import type { LanguageItem } from "../../../types/cv";

interface LanguagesListProps {
  items: LanguageItem[];
  className?: string;
}

export const LanguagesList = memo(function LanguagesList({ items, className = "" }: LanguagesListProps) {
  const { t } = useTranslation();
  if (items.length === 0) return null;
  return (
    <div className={className}>
      <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 mb-2">
        {t("sections.languages")}
      </h2>
      <div className="space-y-1">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span className="font-medium text-gray-700">{item.name}</span>
            <span className="text-gray-500">{t(`proficiency.${item.proficiency}`)}</span>
          </div>
        ))}
      </div>
    </div>
  );
});
