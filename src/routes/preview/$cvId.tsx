import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
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

  if (!cv) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
        <p className="text-gray-600">CV not found</p>
        <Link to="/" className="text-blue-600 hover:underline">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 print:hidden">
        <div className="flex items-center gap-4">
          <Link to="/editor/$cvId" params={{ cvId: cv.id }} className="text-sm text-gray-600 hover:text-gray-900">
            &larr; Back to Editor
          </Link>
          <h1 className="text-lg font-semibold text-gray-900">{cv.name}</h1>
        </div>
        <Button onClick={handlePrint}>
          Export PDF
        </Button>
      </div>
      <div className="flex-1 overflow-auto bg-gray-100 p-4 md:p-8">
        <CvDocument ref={printRef} data={cv} />
      </div>
    </div>
  );
}
