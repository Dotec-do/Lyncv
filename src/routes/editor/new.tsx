import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";
import { createEmptyCv } from "../../lib/constants";
import { saveCv } from "../../services/storage.service";
import type { TemplateId } from "../../types/template";

const searchSchema = z.object({
  name: z.string().default("Untitled CV"),
  template: z.string().default("classic"),
});

export const Route = createFileRoute("/editor/new")({
  validateSearch: searchSchema,
  beforeLoad: ({ search }) => {
    const cv = createEmptyCv(search.name, search.template as TemplateId);
    saveCv(cv);
    throw redirect({ to: "/editor/$cvId", params: { cvId: cv.id } });
  },
});
