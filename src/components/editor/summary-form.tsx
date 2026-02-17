import { Textarea } from "../ui/textarea";
import { SectionWrapper } from "./section-wrapper";

interface SummaryFormProps {
  value: string;
  onChange: (value: string) => void;
}

export function SummaryForm({ value, onChange }: SummaryFormProps) {
  return (
    <SectionWrapper title="Summary">
      <Textarea
        id="summary"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="A brief professional summary..."
        rows={4}
      />
    </SectionWrapper>
  );
}
