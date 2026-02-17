export type TemplateId = "classic" | "modern";

export interface TemplateConfig {
  id: TemplateId;
  name: string;
  description: string;
}
