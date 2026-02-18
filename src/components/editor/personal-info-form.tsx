import { useTranslation } from "react-i18next";
import type { PersonalInfo } from "../../types/cv";
import { Input } from "../ui/input";
import { SectionWrapper } from "./section-wrapper";

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export function PersonalInfoForm({ data, onChange }: PersonalInfoFormProps) {
  const { t } = useTranslation();

  function update(field: keyof PersonalInfo, value: string) {
    onChange({ ...data, [field]: value });
  }

  return (
    <SectionWrapper title={t("sections.personalInfo")}>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Input
          label={t("fields.firstName")}
          id="firstName"
          autoComplete="given-name"
          value={data.firstName}
          onChange={(e) => update("firstName", e.target.value)}
          placeholder={t("placeholders.firstName")}
        />
        <Input
          label={t("fields.lastName")}
          id="lastName"
          autoComplete="family-name"
          value={data.lastName}
          onChange={(e) => update("lastName", e.target.value)}
          placeholder={t("placeholders.lastName")}
        />
        <Input
          label={t("fields.email")}
          id="email"
          type="email"
          autoComplete="email"
          value={data.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder={t("placeholders.email")}
        />
        <Input
          label={t("fields.phone")}
          id="phone"
          type="tel"
          autoComplete="tel"
          value={data.phone}
          onChange={(e) => update("phone", e.target.value)}
          placeholder={t("placeholders.phone")}
        />
        <Input
          label={t("fields.location")}
          id="location"
          autoComplete="address-level2"
          value={data.location}
          onChange={(e) => update("location", e.target.value)}
          placeholder={t("placeholders.location")}
          className="sm:col-span-2"
        />
        <Input
          label={t("fields.website")}
          id="website"
          type="url"
          autoComplete="url"
          value={data.website}
          onChange={(e) => update("website", e.target.value)}
          placeholder={t("placeholders.website")}
        />
        <Input
          label={t("fields.linkedin")}
          id="linkedin"
          type="url"
          autoComplete="url"
          value={data.linkedin}
          onChange={(e) => update("linkedin", e.target.value)}
          placeholder={t("placeholders.linkedin")}
        />
      </div>
    </SectionWrapper>
  );
}
