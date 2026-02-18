export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
}

export interface ExperienceItem {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";

export interface SkillItem {
  id: string;
  name: string;
  level: SkillLevel;
}

export type LanguageProficiency =
  | "elementary"
  | "limited-working"
  | "professional-working"
  | "full-professional"
  | "native";

export interface LanguageItem {
  id: string;
  name: string;
  proficiency: LanguageProficiency;
}

import type { TemplateId } from "./template";

export interface CvData {
  id: string;
  name: string;
  templateId: TemplateId;
  createdAt: string;
  updatedAt: string;
  personalInfo: PersonalInfo;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  languages: LanguageItem[];
}
