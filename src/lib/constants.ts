import type { TemplateConfig, TemplateId } from "../types/template";
import type { CvData, PersonalInfo } from "../types/cv";
import { generateId } from "./id";
import { nowISO } from "./date";

export const STORAGE_KEY = "lyncv:cv-list";

export const TEMPLATES: Record<TemplateId, TemplateConfig> = {
  classic: {
    id: "classic",
    name: "Classic Professional",
    description: "Clean single-column layout with traditional formatting",
  },
  modern: {
    id: "modern",
    name: "Modern Creative",
    description: "Two-column layout with accent colors and visual elements",
  },
};

export const TEMPLATE_LIST = Object.values(TEMPLATES);

const EMPTY_PERSONAL_INFO: PersonalInfo = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  location: "",
  website: "",
  linkedin: "",
};

export function createEmptyCv(
  name: string,
  templateId: TemplateId = "classic",
): CvData {
  const now = nowISO();
  return {
    id: generateId(),
    name,
    templateId,
    createdAt: now,
    updatedAt: now,
    personalInfo: { ...EMPTY_PERSONAL_INFO },
    summary: "",
    experience: [],
    education: [],
    skills: [],
    languages: [],
  };
}

export const SKILL_LEVELS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "expert", label: "Expert" },
] as const;

export const LANGUAGE_PROFICIENCIES = [
  { value: "elementary", label: "Elementary" },
  { value: "limited-working", label: "Limited Working" },
  { value: "professional-working", label: "Professional Working" },
  { value: "full-professional", label: "Full Professional" },
  { value: "native", label: "Native" },
] as const;
