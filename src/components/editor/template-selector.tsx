import { TEMPLATE_LIST } from "../../lib/constants";
import type { TemplateId } from "../../types/template";

interface TemplateSelectorProps {
  value: string;
  onChange: (templateId: TemplateId) => void;
}

export function TemplateSelector({ value, onChange }: TemplateSelectorProps) {
  return (
    <div className="flex gap-2 px-4 py-3 border-b border-gray-200">
      {TEMPLATE_LIST.map((tpl) => (
        <button
          key={tpl.id}
          type="button"
          onClick={() => onChange(tpl.id)}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
            value === tpl.id
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {tpl.name}
        </button>
      ))}
    </div>
  );
}
