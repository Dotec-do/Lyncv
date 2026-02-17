import type { ReactNode } from "react";

interface PageShellProps {
  children: ReactNode;
  className?: string;
}

export function PageShell({ children, className = "" }: PageShellProps) {
  return (
    <div className={`mx-auto max-w-6xl px-4 py-8 ${className}`}>
      {children}
    </div>
  );
}
