import type { EducationItem } from "../../types/cv";
import { generateId } from "../../lib/id";
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
  function updateItem(index: number, field: keyof EducationItem, value: string) {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  }

  return (
    <SectionWrapper title="Education">
      <ArrayField
        items={items}
        onAdd={() => onChange([...items, createEmptyEducation()])}
        onRemove={(i) => onChange(items.filter((_, idx) => idx !== i))}
        addLabel="Add education"
        renderItem={(item, index) => (
          <div className="space-y-3 pr-8">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Input
                label="Degree"
                value={item.degree}
                onChange={(e) => updateItem(index, "degree", e.target.value)}
                placeholder="Bachelor of Science"
              />
              <Input
                label="Institution"
                value={item.institution}
                onChange={(e) => updateItem(index, "institution", e.target.value)}
                placeholder="MIT"
              />
              <Input
                label="Location"
                value={item.location}
                onChange={(e) => updateItem(index, "location", e.target.value)}
                placeholder="Cambridge, MA"
              />
              <div />
              <Input
                label="Start Date"
                type="month"
                value={item.startDate}
                onChange={(e) => updateItem(index, "startDate", e.target.value)}
              />
              <Input
                label="End Date"
                type="month"
                value={item.endDate}
                onChange={(e) => updateItem(index, "endDate", e.target.value)}
              />
            </div>
            <Textarea
              label="Description"
              value={item.description}
              onChange={(e) => updateItem(index, "description", e.target.value)}
              placeholder="Notable achievements or coursework..."
              rows={2}
            />
          </div>
        )}
      />
    </SectionWrapper>
  );
}
