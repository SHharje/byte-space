interface StatBlockProps {
  /** The big number (e.g. "12K", "70+", "55%") */
  value: string;
  /** Label below the number */
  label: string;
  className?: string;
  valueClassName?: string;
}

export function StatBlock({
  value,
  label,
  className = "",
  valueClassName = "text-ink",
}: StatBlockProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <span
        className={`text-3xl sm:text-4xl font-bold leading-none ${valueClassName}`}
        style={{ fontFamily: "var(--font-heading), sans-serif" }}
      >
        {value}
      </span>
      <span
        className="mt-1 text-sm text-muted"
        style={{ fontFamily: "var(--font-body), sans-serif" }}
      >
        {label}
      </span>
    </div>
  );
}
