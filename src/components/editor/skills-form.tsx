import { useTranslation } from "react-i18next";
import type { SkillItem, SkillLevel } from "../../types/cv";
import { generateId } from "../../lib/id";
import { SKILL_LEVELS } from "../../lib/constants";
import { useArrayItemUpdate } from "../../hooks/use-array-update";
import { Input } from "../ui/input";
import { Select } from "../ui/select";
import { SectionWrapper } from "./section-wrapper";
import { ArrayField } from "./array-field";

interface SkillsFormProps {
  items: SkillItem[];
  onChange: (items: SkillItem[]) => void;
}

function createEmptySkill(): SkillItem {
  return { id: generateId(), name: "", level: "intermediate" };
}

export function SkillsForm({ items, onChange }: SkillsFormProps) {
  const { t } = useTranslation();
  const updateItem = useArrayItemUpdate(items, onChange);

  return (
    <SectionWrapper title={t("sections.skills")}>
      <ArrayField
        items={items}
        onAdd={() => onChange([...items, createEmptySkill()])}
        onRemove={(i) => onChange(items.filter((_, idx) => idx !== i))}
        addLabel={t("actions.addSkill")}
        renderItem={(item, index) => (
          <div className="grid grid-cols-2 gap-3 pr-8">
            <Input
              id={`skill-${item.id}-name`}
              label={t("fields.skill")}
              value={item.name}
              onChange={(e) => updateItem(index, "name", e.target.value)}
              placeholder={t("placeholders.skill")}
            />
            <Select
              id={`skill-${item.id}-level`}
              label={t("fields.level")}
              value={item.level}
              onChange={(e) => updateItem(index, "level", e.target.value as SkillLevel)}
              options={SKILL_LEVELS.map((l) => ({ value: l.value, label: t(`skillLevels.${l.value}`) }))}
            />
          </div>
        )}
      />
    </SectionWrapper>
  );
}
