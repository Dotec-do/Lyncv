import { useTranslation } from "react-i18next";
import type { ExperienceItem } from "../../types/cv";
import { generateId } from "../../lib/id";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { SectionWrapper } from "./section-wrapper";
import { ArrayField } from "./array-field";

interface ExperienceFormProps {
  items: ExperienceItem[];
  onChange: (items: ExperienceItem[]) => void;
}

function createEmptyExperience(): ExperienceItem {
  return {
    id: generateId(),
    jobTitle: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    description: "",
  };
}

export function ExperienceForm({ items, onChange }: ExperienceFormProps) {
  const { t } = useTranslation();

  function updateItem(index: number, field: keyof ExperienceItem, value: string | boolean) {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    if (field === "isCurrent" && value === true) {
      updated[index].endDate = "";
    }
    onChange(updated);
  }

  return (
    <SectionWrapper title={t("sections.experience")}>
      <ArrayField
        items={items}
        onAdd={() => onChange([...items, createEmptyExperience()])}
        onRemove={(i) => onChange(items.filter((_, idx) => idx !== i))}
        addLabel={t("actions.addExperience")}
        renderItem={(item, index) => (
          <div className="space-y-3 pr-8">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Input
                id={`exp-${item.id}-title`}
                label={t("fields.jobTitle")}
                value={item.jobTitle}
                onChange={(e) => updateItem(index, "jobTitle", e.target.value)}
                placeholder={t("placeholders.jobTitle")}
              />
              <Input
                id={`exp-${item.id}-company`}
                label={t("fields.company")}
                value={item.company}
                onChange={(e) => updateItem(index, "company", e.target.value)}
                placeholder={t("placeholders.company")}
              />
              <Input
                id={`exp-${item.id}-location`}
                label={t("fields.location")}
                value={item.location}
                onChange={(e) => updateItem(index, "location", e.target.value)}
                placeholder={t("placeholders.location")}
              />
              <div />
              <Input
                id={`exp-${item.id}-start`}
                label={t("fields.startDate")}
                type="month"
                value={item.startDate}
                onChange={(e) => updateItem(index, "startDate", e.target.value)}
              />
              {!item.isCurrent && (
                <Input
                  id={`exp-${item.id}-end`}
                  label={t("fields.endDate")}
                  type="month"
                  value={item.endDate}
                  onChange={(e) => updateItem(index, "endDate", e.target.value)}
                />
              )}
            </div>
            <label htmlFor={`exp-${item.id}-current`} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer select-none">
              <input
                id={`exp-${item.id}-current`}
                type="checkbox"
                autoComplete="off"
                checked={item.isCurrent}
                onChange={(e) => updateItem(index, "isCurrent", e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              {t("fields.currentlyWorking")}
            </label>
            <Textarea
              id={`exp-${item.id}-desc`}
              label={t("fields.description")}
              value={item.description}
              onChange={(e) => updateItem(index, "description", e.target.value)}
              placeholder={t("placeholders.expDesc")}
              rows={3}
            />
          </div>
        )}
      />
    </SectionWrapper>
  );
}
