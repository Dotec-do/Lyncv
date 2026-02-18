import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useCv } from "../../hooks/use-cv";
import { SplitPane } from "../../components/layout/split-pane";
import { CvDocument } from "../../components/cv-preview/cv-document";
import { PersonalInfoForm } from "../../components/editor/personal-info-form";
import { SummaryForm } from "../../components/editor/summary-form";
import { ExperienceForm } from "../../components/editor/experience-form";
import { EducationForm } from "../../components/editor/education-form";
import { SkillsForm } from "../../components/editor/skills-form";
import { LanguagesForm } from "../../components/editor/languages-form";
import { TemplateSelector } from "../../components/editor/template-selector";
import type { CvData } from "../../types/cv";
import type { TemplateId } from "../../types/template";

export const Route = createFileRoute("/editor/$cvId")({
  component: EditorPage,
});

function EditorPage() {
  const { cvId } = Route.useParams();
  const { cv, updateCv } = useCv(cvId);
  const { t } = useTranslation();
  const previewRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cvRef = useRef(cv);
  cvRef.current = cv;
  const [scale, setScale] = useState(0.5);

  // Scale preview to fit container
  const computeScale = useCallback(() => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.clientWidth - 32;
    const a4Width = 794;
    const fitScale = containerWidth / a4Width;
    setScale(Math.min(Math.max(fitScale, 0.6), 1));
  }, []);

  // Recompute on mount and when cv loads (containerRef becomes available)
  useEffect(() => {
    computeScale();
  }, [computeScale, cv?.id]);

  // Recompute on window resize (debounced)
  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;
    function handleResize() {
      clearTimeout(timerId);
      timerId = setTimeout(computeScale, 150);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timerId);
    };
  }, [computeScale]);

  // Stable callback: uses ref to avoid re-renders from cv dependency
  const updateField = useCallback(
    <K extends keyof CvData>(field: K, value: CvData[K]) => {
      if (!cvRef.current) return;
      updateCv({ ...cvRef.current, [field]: value });
    },
    [updateCv],
  );

  if (!cv) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
        <p className="text-slate-500">{t("editor.notFound")}</p>
        <Link to="/" className="text-emerald-600 hover:underline">
          {t("editor.backToDashboard")}
        </Link>
      </div>
    );
  }

  const editorPanel = (
    <div className="bg-white">
      <TemplateSelector
        value={cv.templateId}
        onChange={(id: TemplateId) => updateField("templateId", id)}
      />
      <PersonalInfoForm
        data={cv.personalInfo}
        onChange={(data) => updateField("personalInfo", data)}
      />
      <SummaryForm
        value={cv.summary}
        onChange={(value) => updateField("summary", value)}
      />
      <ExperienceForm
        items={cv.experience}
        onChange={(items) => updateField("experience", items)}
      />
      <EducationForm
        items={cv.education}
        onChange={(items) => updateField("education", items)}
      />
      <SkillsForm
        items={cv.skills}
        onChange={(items) => updateField("skills", items)}
      />
      <LanguagesForm
        items={cv.languages}
        onChange={(items) => updateField("languages", items)}
      />
    </div>
  );

  const previewPanel = (
    <div ref={containerRef} className="p-4 overflow-x-auto">
      <div className="flex justify-end mb-3 print:hidden">
        <Link
          to="/preview/$cvId"
          params={{ cvId: cv.id }}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          {t("editor.fullPreview")}
        </Link>
      </div>
      <div
        style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
      >
        <CvDocument ref={previewRef} data={cv} />
      </div>
    </div>
  );

  return <SplitPane left={editorPanel} right={previewPanel} />;
}
