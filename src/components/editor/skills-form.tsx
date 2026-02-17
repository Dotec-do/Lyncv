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
  const updateItem = useArrayItemUpdate(items, onChange);

  return (
    <SectionWrapper title="Skills">
      <ArrayField
        items={items}
        onAdd={() => onChange([...items, createEmptySkill()])}
        onRemove={(i) => onChange(items.filter((_, idx) => idx !== i))}
        addLabel="Add skill"
        renderItem={(item, index) => (
          <div className="grid grid-cols-2 gap-3 pr-8">
            <Input
              id={`skill-${item.id}-name`}
              label="Skill"
              value={item.name}
              onChange={(e) => updateItem(index, "name", e.target.value)}
              placeholder="React"
            />
            <Select
              id={`skill-${item.id}-level`}
              label="Level"
              value={item.level}
              onChange={(e) => updateItem(index, "level", e.target.value as SkillLevel)}
              options={SKILL_LEVELS.map((l) => ({ value: l.value, label: l.label }))}
            />
          </div>
        )}
      />
    </SectionWrapper>
  );
}
