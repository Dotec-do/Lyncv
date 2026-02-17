import type { ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  action?: ReactNode;
}

export function SectionHeading({ title, action }: SectionHeadingProps) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      {action}
    </div>
  );
}
