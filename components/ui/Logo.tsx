interface LogoProps {
  className?: string;
  /** "light" = white wordmark (on blue bg), "dark" = ink wordmark (on white bg) */
  variant?: "light" | "dark";
}

/**
 * ByteSpace logo — inline SVG "b" mark + wordmark.
 * Single source of truth for navbar and footer.
 */
export function Logo({ className = "", variant = "dark" }: LogoProps) {
  const wordmarkColor = variant === "light" ? "text-white" : "text-ink";

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* ── "b" mark: lime rounded square with white "b" + leaf notch ── */}
      <svg
        width={30}
        height={30}
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
      >
        {/* Background */}
        <rect width="32" height="32" rx="8" fill="#CCFF00" />

        {/* Lowercase "b" with counter hole (evenodd) */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11 6h3v8.2c.9-1.4 2.7-2.4 5-2.4 3.8 0 6.5 3 6.5 7s-2.7 7-6.5 7c-2.3 0-4.1-1-5-2.4V26h-3V6zm3 13c0-2.5 1.8-4.5 4.2-4.5s4.2 2 4.2 4.5-1.8 4.5-4.2 4.5S14 21.5 14 19z"
          fill="white"
        />

        {/* Leaf / flag notch — lime triangle overlaid on top of the bowl */}
        <polygon points="19,11.8 21,7 23,11.8" fill="#CCFF00" />
      </svg>

      {/* ── Wordmark ── */}
      <span
        className={`text-[22px] font-bold leading-none ${wordmarkColor}`}
        style={{ fontFamily: "var(--font-heading), sans-serif" }}
      >
        ByteSpace
      </span>
    </div>
  );
}
