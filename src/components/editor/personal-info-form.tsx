import type { PersonalInfo } from "../../types/cv";
import { Input } from "../ui/input";
import { SectionWrapper } from "./section-wrapper";

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export function PersonalInfoForm({ data, onChange }: PersonalInfoFormProps) {
  function update(field: keyof PersonalInfo, value: string) {
    onChange({ ...data, [field]: value });
  }

  return (
    <SectionWrapper title="Personal Info">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Input
          label="First Name"
          id="firstName"
          value={data.firstName}
          onChange={(e) => update("firstName", e.target.value)}
          placeholder="John"
        />
        <Input
          label="Last Name"
          id="lastName"
          value={data.lastName}
          onChange={(e) => update("lastName", e.target.value)}
          placeholder="Doe"
        />
        <Input
          label="Email"
          id="email"
          type="email"
          value={data.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="john@example.com"
        />
        <Input
          label="Phone"
          id="phone"
          type="tel"
          value={data.phone}
          onChange={(e) => update("phone", e.target.value)}
          placeholder="+1 234 567 890"
        />
        <Input
          label="Location"
          id="location"
          value={data.location}
          onChange={(e) => update("location", e.target.value)}
          placeholder="New York, USA"
          className="sm:col-span-2"
        />
        <Input
          label="Website"
          id="website"
          type="url"
          value={data.website}
          onChange={(e) => update("website", e.target.value)}
          placeholder="https://mywebsite.com"
        />
        <Input
          label="LinkedIn"
          id="linkedin"
          type="url"
          value={data.linkedin}
          onChange={(e) => update("linkedin", e.target.value)}
          placeholder="https://linkedin.com/in/johndoe"
        />
      </div>
    </SectionWrapper>
  );
}
