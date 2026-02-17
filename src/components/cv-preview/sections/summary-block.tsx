interface SummaryBlockProps {
  content: string;
  className?: string;
}

export function SummaryBlock({ content, className = "" }: SummaryBlockProps) {
  if (!content) return null;
  return (
    <div className={className}>
      <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 mb-2">
        Summary
      </h2>
      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{content}</p>
    </div>
  );
}
