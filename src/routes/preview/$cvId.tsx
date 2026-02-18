import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useCv } from "../../hooks/use-cv";
import { usePrintCv } from "../../hooks/use-print-cv";
import { CvDocument } from "../../components/cv-preview/cv-document";
import { Button } from "../../components/ui/button";

export const Route = createFileRoute("/preview/$cvId")({
  component: PreviewPage,
});

function PreviewPage() {
  const { cvId } = Route.useParams();
  const { cv } = useCv(cvId);
  const printRef = useRef<HTMLDivElement>(null);
  const handlePrint = usePrintCv(printRef);
  const { t } = useTranslation();

  if (!cv) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
        <p className="text-slate-500">{t("editor.notFound")}</p>
        <Link to="/" className="text-emerald-600 hover:underline">
          {t("editor.backToDashboard")}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 print:hidden">
        <div className="flex items-center gap-4">
          <Link to="/editor/$cvId" params={{ cvId: cv.id }} className="text-sm text-slate-500 hover:text-slate-800 transition-colors">
            &larr; {t("preview.backToEditor")}
          </Link>
          <h1 className="text-lg font-semibold text-slate-800">{cv.name}</h1>
        </div>
        <Button onClick={handlePrint}>
          {t("preview.exportPdf")}
        </Button>
      </div>
      <div className="flex-1 overflow-auto bg-slate-100 p-4 md:p-8">
        <CvDocument ref={printRef} data={cv} />
      </div>
    </div>
  );
}
