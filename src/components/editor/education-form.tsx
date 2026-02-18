import { useTranslation } from "react-i18next";
import type { EducationItem } from "../../types/cv";
import { generateId } from "../../lib/id";
import { useArrayItemUpdate } from "../../hooks/use-array-update";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { SectionWrapper } from "./section-wrapper";
import { ArrayField } from "./array-field";

interface EducationFormProps {
  items: EducationItem[];
  onChange: (items: EducationItem[]) => void;
}

function createEmptyEducation(): EducationItem {
  return {
    id: generateId(),
    degree: "",
    institution: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
  };
}

export function EducationForm({ items, onChange }: EducationFormProps) {
  const { t } = useTranslation();
  const updateItem = useArrayItemUpdate(items, onChange);

  return (
    <SectionWrapper title={t("sections.education")}>
      <ArrayField
        items={items}
        onAdd={() => onChange([...items, createEmptyEducation()])}
        onRemove={(i) => onChange(items.filter((_, idx) => idx !== i))}
        addLabel={t("actions.addEducation")}
        renderItem={(item, index) => (
          <div className="space-y-3 pr-8">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Input
                id={`edu-${item.id}-degree`}
                label={t("fields.degree")}
                value={item.degree}
                onChange={(e) => updateItem(index, "degree", e.target.value)}
                placeholder={t("placeholders.degree")}
              />
              <Input
                id={`edu-${item.id}-inst`}
                label={t("fields.institution")}
                value={item.institution}
                onChange={(e) => updateItem(index, "institution", e.target.value)}
                placeholder={t("placeholders.institution")}
              />
              <Input
                id={`edu-${item.id}-location`}
                label={t("fields.location")}
                value={item.location}
                onChange={(e) => updateItem(index, "location", e.target.value)}
                placeholder={t("placeholders.locationEdu")}
              />
              <div />
              <Input
                id={`edu-${item.id}-start`}
                label={t("fields.startDate")}
                type="month"
                value={item.startDate}
                onChange={(e) => updateItem(index, "startDate", e.target.value)}
              />
              <Input
                id={`edu-${item.id}-end`}
                label={t("fields.endDate")}
                type="month"
                value={item.endDate}
                onChange={(e) => updateItem(index, "endDate", e.target.value)}
              />
            </div>
            <Textarea
              id={`edu-${item.id}-desc`}
              label={t("fields.description")}
              value={item.description}
              onChange={(e) => updateItem(index, "description", e.target.value)}
              placeholder={t("placeholders.eduDesc")}
              rows={2}
            />
          </div>
        )}
      />
    </SectionWrapper>
  );
}
