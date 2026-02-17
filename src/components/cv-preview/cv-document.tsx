import { forwardRef } from "react";
import type { CvData } from "../../types/cv";
import { ClassicTemplate } from "./templates/classic";
import { ModernTemplate } from "./templates/modern";

interface CvDocumentProps {
  data: CvData;
}

export const CvDocument = forwardRef<HTMLDivElement, CvDocumentProps>(
  function CvDocument({ data }, ref) {
    return (
      <div ref={ref} className="w-[210mm] min-h-[297mm] bg-white shadow-lg mx-auto">
        {data.templateId === "modern" ? (
          <ModernTemplate data={data} />
        ) : (
          <ClassicTemplate data={data} />
        )}
      </div>
    );
  },
);
