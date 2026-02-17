import type { CvData } from "../../../types/cv";
import { PersonalHeader } from "../sections/personal-header";
import { SummaryBlock } from "../sections/summary-block";
import { ExperienceList } from "../sections/experience-list";
import { EducationList } from "../sections/education-list";
import { SkillsGrid } from "../sections/skills-grid";
import { LanguagesList } from "../sections/languages-list";

interface ModernTemplateProps {
  data: CvData;
}

export function ModernTemplate({ data }: ModernTemplateProps) {
  return (
    <div className="font-sans flex min-h-full">
      {/* Sidebar */}
      <aside className="w-[30%] bg-slate-800 text-white p-6 space-y-6">
        <PersonalHeader
          data={data.personalInfo}
          layout="stacked"
          className="[&_h1]:text-white [&_span]:text-slate-300 [&_a]:text-blue-300"
        />
        <SkillsGrid
          items={data.skills}
          display="bars"
          className="[&_h2]:text-white [&_span]:text-slate-300 [&_.bg-gray-200]:bg-slate-600"
        />
        <LanguagesList
          items={data.languages}
          className="[&_h2]:text-white [&_.font-medium]:text-slate-200 [&_.text-gray-500]:text-slate-400"
        />
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 space-y-5">
        <SummaryBlock content={data.summary} />
        <ExperienceList items={data.experience} />
        <EducationList items={data.education} />
      </main>
    </div>
  );
}
