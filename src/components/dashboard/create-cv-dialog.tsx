import { useState, useEffect, useId } from "react";
import { useTranslation } from "react-i18next";
import { useDialog } from "../../hooks/use-dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { TEMPLATE_LIST } from "../../lib/constants";
import type { TemplateId } from "../../types/template";

interface CreateCvDialogProps {
  open: boolean;
  onConfirm: (name: string, templateId: TemplateId) => void;
  onCancel: () => void;
}

export function CreateCvDialog({ open, onConfirm, onCancel }: CreateCvDialogProps) {
  const dialogRef = useDialog(open);
  const titleId = useId();
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [templateId, setTemplateId] = useState<TemplateId>("classic");

  // Reset form state when dialog opens
  useEffect(() => {
    if (open) {
      setName("");
      setTemplateId("classic");
    }
  }, [open]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    onConfirm(name.trim(), templateId);
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onCancel}
      aria-labelledby={titleId}
      className="m-auto rounded-2xl border-none bg-white p-6 shadow-2xl backdrop:bg-black/40 backdrop:backdrop-blur-sm max-w-md w-full"
    >
      <h2 id={titleId} className="text-lg font-semibold text-slate-900">{t("dialogs.createTitle")}</h2>
      <form onSubmit={handleSubmit} className="mt-4 space-y-5">
        <Input
          label={t("fields.cvName")}
          id="cv-name"
          placeholder={t("placeholders.cvName")}
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
        <div className="space-y-2">
          <span className="text-sm font-medium text-slate-700">{t("fields.template")}</span>
          <div className="grid grid-cols-2 gap-3">
            {TEMPLATE_LIST.map((tpl) => (
              <button
                key={tpl.id}
                type="button"
                onClick={() => setTemplateId(tpl.id)}
                className={`rounded-xl border-2 p-4 text-left transition-all duration-200 ${
                  templateId === tpl.id
                    ? "border-emerald-500 bg-emerald-50 shadow-sm"
                    : "border-slate-200 hover:border-slate-300 hover:shadow-sm"
                }`}
              >
                <div className="text-sm font-medium text-slate-800">{t(`templates.${tpl.id}`)}</div>
                <div className="mt-1 text-xs text-slate-500">{t(`templates.${tpl.id}Desc`)}</div>
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onCancel}>
            {t("actions.cancel")}
          </Button>
          <Button type="submit" disabled={!name.trim()}>
            {t("actions.create")}
          </Button>
        </div>
      </form>
    </dialog>
  );
}
