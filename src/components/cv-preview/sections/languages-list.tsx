import type { LanguageItem, LanguageProficiency } from "../../../types/cv";

interface LanguagesListProps {
  items: LanguageItem[];
  className?: string;
}

const proficiencyLabel: Record<LanguageProficiency, string> = {
  elementary: "Elementary",
  "limited-working": "Limited Working",
  "professional-working": "Professional Working",
  "full-professional": "Full Professional",
  native: "Native",
};

export function LanguagesList({ items, className = "" }: LanguagesListProps) {
  if (items.length === 0) return null;
  return (
    <div className={className}>
      <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 mb-2">
        Languages
      </h2>
      <div className="space-y-1">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span className="font-medium text-gray-700">{item.name}</span>
            <span className="text-gray-500">{proficiencyLabel[item.proficiency]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
