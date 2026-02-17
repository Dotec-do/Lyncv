import type { LanguageItem, LanguageProficiency } from "../../types/cv";
import { generateId } from "../../lib/id";
import { LANGUAGE_PROFICIENCIES } from "../../lib/constants";
import { Input } from "../ui/input";
import { Select } from "../ui/select";
import { SectionWrapper } from "./section-wrapper";
import { ArrayField } from "./array-field";

interface LanguagesFormProps {
  items: LanguageItem[];
  onChange: (items: LanguageItem[]) => void;
}

function createEmptyLanguage(): LanguageItem {
  return { id: generateId(), name: "", proficiency: "professional-working" };
}

export function LanguagesForm({ items, onChange }: LanguagesFormProps) {
  function updateItem(index: number, field: keyof LanguageItem, value: string) {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  }

  return (
    <SectionWrapper title="Languages">
      <ArrayField
        items={items}
        onAdd={() => onChange([...items, createEmptyLanguage()])}
        onRemove={(i) => onChange(items.filter((_, idx) => idx !== i))}
        addLabel="Add language"
        renderItem={(item, index) => (
          <div className="grid grid-cols-2 gap-3 pr-8">
            <Input
              label="Language"
              value={item.name}
              onChange={(e) => updateItem(index, "name", e.target.value)}
              placeholder="English"
            />
            <Select
              label="Proficiency"
              value={item.proficiency}
              onChange={(e) => updateItem(index, "proficiency", e.target.value as LanguageProficiency)}
              options={LANGUAGE_PROFICIENCIES.map((l) => ({ value: l.value, label: l.label }))}
            />
          </div>
        )}
      />
    </SectionWrapper>
  );
}
