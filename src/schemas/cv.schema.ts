import { z } from "zod";

export const personalInfoSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string(),
  location: z.string(),
  website: z.string(),
  linkedin: z.string(),
});

export const experienceItemSchema = z.object({
  id: z.string(),
  jobTitle: z.string(),
  company: z.string(),
  location: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  isCurrent: z.boolean(),
  description: z.string(),
});

export const educationItemSchema = z.object({
  id: z.string(),
  degree: z.string(),
  institution: z.string(),
  location: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  description: z.string(),
});

export const skillItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  level: z.enum(["beginner", "intermediate", "advanced", "expert"]),
});

export const languageItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  proficiency: z.enum([
    "elementary",
    "limited-working",
    "professional-working",
    "full-professional",
    "native",
  ]),
});

export const cvDataSchema = z.object({
  id: z.string(),
  name: z.string(),
  templateId: z.enum(["classic", "modern"]),
  createdAt: z.string(),
  updatedAt: z.string(),
  personalInfo: personalInfoSchema,
  summary: z.string(),
  experience: z.array(experienceItemSchema),
  education: z.array(educationItemSchema),
  skills: z.array(skillItemSchema),
  languages: z.array(languageItemSchema),
});
