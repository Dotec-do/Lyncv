import type { CvData } from "../../../types/cv";
import { PersonalHeader } from "../sections/personal-header";
import { SummaryBlock } from "../sections/summary-block";
import { ExperienceList } from "../sections/experience-list";
import { EducationList } from "../sections/education-list";
import { SkillsGrid } from "../sections/skills-grid";
import { LanguagesList } from "../sections/languages-list";

interface ClassicTemplateProps {
  data: CvData;
}

export function ClassicTemplate({ data }: ClassicTemplateProps) {
  return (
    <div className="font-serif p-8 space-y-5">
      <PersonalHeader data={data.personalInfo} layout="inline" className="text-center" />
      <hr className="border-gray-300" />
      <SummaryBlock content={data.summary} />
      <ExperienceList items={data.experience} />
      <EducationList items={data.education} />
      <SkillsGrid items={data.skills} display="tags" />
      <LanguagesList items={data.languages} />
    </div>
  );
}
