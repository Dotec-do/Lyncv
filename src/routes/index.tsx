import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PageShell } from "../components/layout/page-shell";
import { Button } from "../components/ui/button";
import { ConfirmDialog } from "../components/ui/confirm-dialog";
import { CvCard } from "../components/dashboard/cv-card";
import { CreateCvDialog } from "../components/dashboard/create-cv-dialog";
import { useCvList } from "../hooks/use-cv-list";
import type { TemplateId } from "../types/template";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const { cvList, addCv, deleteCv, duplicateCv } = useCvList();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showCreate, setShowCreate] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  function handleCreate(name: string, templateId: TemplateId) {
    const cv = addCv(name, templateId);
    setShowCreate(false);
    navigate({ to: "/editor/$cvId", params: { cvId: cv.id } });
  }

  function handleDelete() {
    if (deleteTarget) {
      deleteCv(deleteTarget);
      setDeleteTarget(null);
    }
  }

  return (
    <PageShell>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{t("dashboard.title")}</h1>
          <p className="mt-1 text-slate-500">{t("dashboard.subtitle")}</p>
        </div>
        <Button onClick={() => setShowCreate(true)}>
          {t("dashboard.newCv")}
        </Button>
      </div>

      {cvList.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 py-20 bg-white">
          <svg className="h-14 w-14 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-slate-800">{t("dashboard.noCvs")}</h3>
          <p className="mt-1 text-sm text-slate-400">{t("dashboard.noCvsDesc")}</p>
          <Button className="mt-4" onClick={() => setShowCreate(true)}>
            {t("dashboard.createFirst")}
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cvList.map((cv) => (
            <CvCard
              key={cv.id}
              cv={cv}
              onDelete={() => setDeleteTarget(cv.id)}
              onDuplicate={() => duplicateCv(cv)}
            />
          ))}
        </div>
      )}

      <CreateCvDialog
        open={showCreate}
        onConfirm={handleCreate}
        onCancel={() => setShowCreate(false)}
      />
      <ConfirmDialog
        open={deleteTarget !== null}
        title={t("dialogs.deleteTitle")}
        message={t("dialogs.deleteMessage")}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </PageShell>
  );
}
