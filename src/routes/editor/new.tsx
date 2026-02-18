import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useRef } from "react";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { useCvList } from "../../hooks/use-cv-list";
import type { TemplateId } from "../../types/template";
import { TEMPLATE_IDS } from "../../lib/constants";

const searchSchema = z.object({
  name: z.string().optional(),
  template: z.enum(TEMPLATE_IDS).catch("classic"),
});

export const Route = createFileRoute("/editor/new")({
  validateSearch: searchSchema,
  component: NewCvRedirect,
});

// Component creates the CV via context dispatch and redirects to the editor
function NewCvRedirect() {
  const { name, template } = Route.useSearch();
  const { t } = useTranslation();
  const { addCv } = useCvList();
  const cvRef = useRef<string | null>(null);

  if (!cvRef.current) {
    const cv = addCv(name || t("dashboard.untitledCv"), template as TemplateId);
    cvRef.current = cv.id;
  }

  return <Navigate to="/editor/$cvId" params={{ cvId: cvRef.current }} />;
}
