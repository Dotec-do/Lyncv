import type { SkillItem, SkillLevel } from "../../../types/cv";

interface SkillsGridProps {
  items: SkillItem[];
  display?: "tags" | "bars";
  className?: string;
}

const levelWidth: Record<SkillLevel, string> = {
  beginner: "w-1/4",
  intermediate: "w-1/2",
  advanced: "w-3/4",
  expert: "w-full",
};

export function SkillsGrid({ items, display = "tags", className = "" }: SkillsGridProps) {
  if (items.length === 0) return null;

  return (
    <div className={className}>
      <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 mb-2">
        Skills
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
                <div className={`h-full rounded-full bg-blue-600 ${levelWidth[item.level]}`} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
