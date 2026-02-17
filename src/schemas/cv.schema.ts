import { z } from "zod";

export const personalInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address").or(z.literal("")),
  phone: z.string(),
  location: z.string(),
  website: z.string().url("Invalid URL").or(z.literal("")),
  linkedin: z.string().url("Invalid URL").or(z.literal("")),
});

export const experienceItemSchema = z.object({
  id: z.string(),
  jobTitle: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company is required"),
  location: z.string(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string(),
  isCurrent: z.boolean(),
  description: z.string(),
});

export const educationItemSchema = z.object({
  id: z.string(),
  degree: z.string().min(1, "Degree is required"),
  institution: z.string().min(1, "Institution is required"),
  location: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  description: z.string(),
});

export const skillItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Skill name is required"),
  level: z.enum(["beginner", "intermediate", "advanced", "expert"]),
});

export const languageItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Language name is required"),
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
  name: z.string().min(1),
  templateId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  personalInfo: personalInfoSchema,
  summary: z.string(),
  experience: z.array(experienceItemSchema),
  education: z.array(educationItemSchema),
  skills: z.array(skillItemSchema),
  languages: z.array(languageItemSchema),
});
