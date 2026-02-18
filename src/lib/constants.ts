import type { TemplateId } from "../types/template";
import type { CvData, PersonalInfo, SkillLevel } from "../types/cv";
import { generateId } from "./id";
import { nowISO } from "./date";

export const STORAGE_KEY = "lyncv:cv-list";

export const TEMPLATE_IDS = ["classic", "modern"] as const;

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

export const SKILL_LEVELS: readonly { value: SkillLevel }[] = [
  { value: "beginner" },
  { value: "intermediate" },
  { value: "advanced" },
  { value: "expert" },
];

export const LANGUAGE_PROFICIENCIES = [
  { value: "elementary" },
  { value: "limited-working" },
  { value: "professional-working" },
  { value: "full-professional" },
  { value: "native" },
] as const;

export const SKILL_LEVEL_WIDTH: Record<SkillLevel, string> = {
  beginner: "w-1/4",
  intermediate: "w-1/2",
  advanced: "w-3/4",
  expert: "w-full",
};
