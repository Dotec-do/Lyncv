import { useTranslation } from "react-i18next";
import type { LanguageItem, LanguageProficiency } from "../../types/cv";
import { generateId } from "../../lib/id";
import { LANGUAGE_PROFICIENCIES } from "../../lib/constants";
import { useArrayItemUpdate } from "../../hooks/use-array-update";
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
  const { t } = useTranslation();
  const updateItem = useArrayItemUpdate(items, onChange);

  return (
    <SectionWrapper title={t("sections.languages")}>
      <ArrayField
        items={items}
        onAdd={() => onChange([...items, createEmptyLanguage()])}
        onRemove={(i) => onChange(items.filter((_, idx) => idx !== i))}
        addLabel={t("actions.addLanguage")}
        renderItem={(item, index) => (
          <div className="grid grid-cols-2 gap-3 pr-8">
            <Input
              id={`lang-${item.id}-name`}
              label={t("fields.language")}
              value={item.name}
              onChange={(e) => updateItem(index, "name", e.target.value)}
              placeholder={t("placeholders.language")}
            />
            <Select
              id={`lang-${item.id}-prof`}
              label={t("fields.proficiency")}
              value={item.proficiency}
              onChange={(e) => updateItem(index, "proficiency", e.target.value as LanguageProficiency)}
              options={LANGUAGE_PROFICIENCIES.map((l) => ({ value: l.value, label: t(`proficiency.${l.value}`) }))}
            />
          </div>
        )}
      />
    </SectionWrapper>
  );
}
