import { memo } from "react";
import { useTranslation } from "react-i18next";
import type { SkillItem } from "../../../types/cv";
import { SKILL_LEVEL_WIDTH } from "../../../lib/constants";

interface SkillsGridProps {
  items: SkillItem[];
  display?: "tags" | "bars";
  className?: string;
}

export const SkillsGrid = memo(function SkillsGrid({ items, display = "tags", className = "" }: SkillsGridProps) {
  const { t } = useTranslation();
  if (items.length === 0) return null;

  return (
    <div className={className}>
      <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 mb-2">
        {t("sections.skills")}
      </h2>
      {display === "tags" ? (
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <span key={item.id} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
              {item.name}
            </span>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id}>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-gray-700">{item.name}</span>
              </div>
              <div className="h-1.5 rounded-full bg-gray-200">
                <div className={`h-full rounded-full bg-emerald-600 ${SKILL_LEVEL_WIDTH[item.level]}`} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
