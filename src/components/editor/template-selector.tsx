import { useTranslation } from "react-i18next";
import { TEMPLATE_IDS } from "../../lib/constants";
import type { TemplateId } from "../../types/template";

interface TemplateSelectorProps {
  value: string;
  onChange: (templateId: TemplateId) => void;
}

export function TemplateSelector({ value, onChange }: TemplateSelectorProps) {
  const { t } = useTranslation();

  return (
    <div className="flex gap-2 px-4 py-3 border-b border-slate-200 bg-slate-50/50">
      {TEMPLATE_IDS.map((id) => (
        <button
          key={id}
          type="button"
          aria-pressed={value === id}
          onClick={() => onChange(id)}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
            value === id
              ? "bg-emerald-600 text-white shadow-sm"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          {t(`templates.${id}`)}
        </button>
      ))}
    </div>
  );
}
