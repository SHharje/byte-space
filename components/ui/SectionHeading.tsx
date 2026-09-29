import { ReactNode } from "react";

interface SectionHeadingProps {
  /** Optional small eyebrow text above the title */
  eyebrow?: string;
  /** Main heading text (rendered inside a heading tag) */
  title: ReactNode;
  /** Optional subtitle / description below the heading */
  subtitle?: string;
  /** Alignment — defaults to "center" */
  align?: "center" | "left";
  /** Heading level — defaults to h2 */
  as?: "h1" | "h2" | "h3" | "h4";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  as: Tag = "h2",
  className = "",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center" : "text-left";

  return (
    <div className={`${alignment} ${className}`}>
      {eyebrow && (
        <p
          className="text-sm font-medium uppercase tracking-wider text-muted mb-3"
          style={{ fontFamily: "var(--font-body), sans-serif" }}
        >
          {eyebrow}
        </p>
      )}

      <Tag
        className="text-ink text-3xl sm:text-4xl lg:text-[42px] font-semibold leading-tight"
        style={{ fontFamily: "var(--font-heading), sans-serif" }}
      >
        {title}
      </Tag>

      {subtitle && (
        <p
          className="mt-4 text-muted text-base sm:text-lg max-w-2xl leading-relaxed"
          style={{
            fontFamily: "var(--font-body), sans-serif",
            ...(align === "center" ? { marginInline: "auto" } : {}),
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
