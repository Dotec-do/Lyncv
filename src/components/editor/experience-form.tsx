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
  function updateItem(index: number, field: keyof ExperienceItem, value: string | boolean) {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    if (field === "isCurrent" && value === true) {
      updated[index].endDate = "";
    }
    onChange(updated);
  }

  return (
    <SectionWrapper title="Experience">
      <ArrayField
        items={items}
        onAdd={() => onChange([...items, createEmptyExperience()])}
        onRemove={(i) => onChange(items.filter((_, idx) => idx !== i))}
        addLabel="Add experience"
        renderItem={(item, index) => (
          <div className="space-y-3 pr-8">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Input
                label="Job Title"
                value={item.jobTitle}
                onChange={(e) => updateItem(index, "jobTitle", e.target.value)}
                placeholder="Software Engineer"
              />
              <Input
                label="Company"
                value={item.company}
                onChange={(e) => updateItem(index, "company", e.target.value)}
                placeholder="Acme Corp"
              />
              <Input
                label="Location"
                value={item.location}
                onChange={(e) => updateItem(index, "location", e.target.value)}
                placeholder="New York, USA"
              />
              <div />
              <Input
                label="Start Date"
                type="month"
                value={item.startDate}
                onChange={(e) => updateItem(index, "startDate", e.target.value)}
              />
              {!item.isCurrent && (
                <Input
                  label="End Date"
                  type="month"
                  value={item.endDate}
                  onChange={(e) => updateItem(index, "endDate", e.target.value)}
                />
              )}
            </div>
            <label htmlFor={`isCurrent-${item.id}`} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer select-none">
              <input
                id={`isCurrent-${item.id}`}
                type="checkbox"
                autoComplete="off"
                checked={item.isCurrent}
                onChange={(e) => updateItem(index, "isCurrent", e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              Currently working here
            </label>
            <Textarea
              label="Description"
              value={item.description}
              onChange={(e) => updateItem(index, "description", e.target.value)}
              placeholder="Key responsibilities and achievements..."
              rows={3}
            />
          </div>
        )}
      />
    </SectionWrapper>
  );
}
