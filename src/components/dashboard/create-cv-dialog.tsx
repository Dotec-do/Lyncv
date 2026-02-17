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
      className="rounded-xl border-none bg-white p-6 shadow-xl backdrop:bg-black/50 max-w-md w-full"
    >
      <h2 className="text-lg font-semibold text-gray-900">Create New CV</h2>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <Input
          label="CV Name"
          id="cv-name"
          placeholder="e.g. My Tech Resume"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Template</label>
          <div className="grid grid-cols-2 gap-3">
            {TEMPLATE_LIST.map((tpl) => (
              <button
                key={tpl.id}
                type="button"
                onClick={() => setTemplateId(tpl.id)}
                className={`rounded-lg border-2 p-3 text-left transition-colors ${
                  templateId === tpl.id
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="text-sm font-medium text-gray-900">{tpl.name}</div>
                <div className="mt-1 text-xs text-gray-500">{tpl.description}</div>
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
