import { useState, type ReactNode } from "react";
import { SectionHeading } from "../ui/section-heading";

interface SectionWrapperProps {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function SectionWrapper({ title, action, children, defaultOpen = true }: SectionWrapperProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        type="button"
        className="flex w-full items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <SectionHeading title={title} action={action} />
        <svg
          className={`h-5 w-5 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}
