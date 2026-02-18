import { useTranslation } from "react-i18next";
import { Textarea } from "../ui/textarea";
import { SectionWrapper } from "./section-wrapper";

interface SummaryFormProps {
  value: string;
  onChange: (value: string) => void;
}

export function SummaryForm({ value, onChange }: SummaryFormProps) {
  const { t } = useTranslation();

  return (
    <SectionWrapper title={t("sections.summary")}>
      <Textarea
        id="summary"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t("placeholders.summary")}
        rows={4}
      />
    </SectionWrapper>
  );
}
