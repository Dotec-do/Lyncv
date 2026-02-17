import type { CvData } from "../types/cv";
import { cvDataSchema } from "../schemas/cv.schema";
import { STORAGE_KEY } from "../lib/constants";

export function loadCvList(): CvData[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item: unknown) => cvDataSchema.safeParse(item).success);
  } catch {
    return [];
  }
}

export function saveCvList(list: CvData[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    console.error("Failed to save CV list (storage quota exceeded?):", err);
  }
}

export function loadCv(id: string): CvData | undefined {
  return loadCvList().find((cv) => cv.id === id);
}

export function saveCv(cv: CvData): void {
  const list = loadCvList();
  const index = list.findIndex((item) => item.id === cv.id);
  if (index >= 0) {
    list[index] = cv;
  } else {
    list.push(cv);
  }
  saveCvList(list);
}

export function deleteCv(id: string): void {
  saveCvList(loadCvList().filter((cv) => cv.id !== id));
}
