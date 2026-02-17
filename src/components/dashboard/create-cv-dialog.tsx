import { useEffect, useRef, useState } from "react";
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
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState("");
  const [templateId, setTemplateId] = useState<TemplateId>("classic");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      setName("");
      setTemplateId("classic");
      dialog.showModal();
    }
    if (!open && dialog.open) dialog.close();
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
      className="rounded-2xl border-none bg-white p-6 shadow-2xl backdrop:bg-black/40 backdrop:backdrop-blur-sm max-w-md w-full"
    >
      <h2 className="text-lg font-semibold text-slate-900">Create New CV</h2>
      <form onSubmit={handleSubmit} className="mt-4 space-y-5">
        <Input
          label="CV Name"
          id="cv-name"
          placeholder="e.g. My Tech Resume"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Template</label>
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
                <div className="text-sm font-medium text-slate-800">{tpl.name}</div>
                <div className="mt-1 text-xs text-slate-500">{tpl.description}</div>
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={!name.trim()}>
            Create
          </Button>
        </div>
      </form>
    </dialog>
  );
}
