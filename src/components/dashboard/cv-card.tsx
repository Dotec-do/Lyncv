import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import type { CvData } from "../../types/cv";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { IconButton } from "../ui/icon-button";

interface CvCardProps {
  cv: CvData;
  onDelete: () => void;
  onDuplicate: () => void;
}

export function CvCard({ cv, onDelete, onDuplicate }: CvCardProps) {
  const { t } = useTranslation();
  const updatedDate = new Date(cv.updatedAt).toLocaleDateString();

  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <Link
            to="/editor/$cvId"
            params={{ cvId: cv.id }}
            className="text-base font-semibold text-slate-800 hover:text-emerald-600 transition-colors truncate block"
          >
            {cv.name}
          </Link>
          <p className="mt-1 text-xs text-slate-400">{t("dashboard.updated", { date: updatedDate })}</p>
        </div>
        <Badge variant="emerald">{t(`templates.${cv.templateId}`)}</Badge>
      </div>

      <div className="flex items-center gap-2 border-t border-slate-100 pt-3">
        <Link
          to="/editor/$cvId"
          params={{ cvId: cv.id }}
          className="flex-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-center text-sm font-medium text-white hover:bg-emerald-700 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          {t("actions.edit")}
        </Link>
        <Link
          to="/preview/$cvId"
          params={{ cvId: cv.id }}
          className="flex-1 rounded-lg bg-slate-100 px-3 py-1.5 text-center text-sm font-medium text-slate-700 hover:bg-slate-200 transition-all duration-200 border border-slate-200"
        >
          {t("actions.preview")}
        </Link>
        <IconButton
          label={t("actions.duplicate")}
          onClick={onDuplicate}
          icon={
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          }
        />
        <IconButton
          label={t("actions.delete")}
          onClick={onDelete}
          className="text-red-400 hover:text-red-600 hover:bg-red-50"
          icon={
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          }
        />
      </div>
    </Card>
  );
}
