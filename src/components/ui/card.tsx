import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  as?: "div" | "button";
}

export function Card({ className = "", children, as = "div", ...props }: CardProps) {
  const Component = as;
  return (
    <Component
      className={`rounded-xl border border-gray-200 bg-white p-4 shadow-sm ${className}`}
      {...props}
    />
  );
}
