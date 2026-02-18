import { useId } from "react";
import { useTranslation } from "react-i18next";
import { useDialog } from "../../hooks/use-dialog";
import { Button } from "./button";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const dialogRef = useDialog(open);
  const titleId = useId();
  const { t } = useTranslation();

  return (
    <dialog
      ref={dialogRef}
      onClose={onCancel}
      aria-labelledby={titleId}
      className="rounded-2xl border-none bg-white p-6 shadow-2xl backdrop:bg-black/40 backdrop:backdrop-blur-sm max-w-sm w-full"
    >
      <h2 id={titleId} className="text-lg font-semibold text-gray-900">{title}</h2>
      <p className="mt-2 text-sm text-gray-600">{message}</p>
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="secondary" onClick={onCancel}>
          {t("actions.cancel")}
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          {confirmLabel ?? t("actions.delete")}
        </Button>
      </div>
    </dialog>
  );
}
