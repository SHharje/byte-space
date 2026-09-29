import { ReactNode } from "react";

interface PillProps {
  children: ReactNode;
  active?: boolean;
  className?: string;
  onClick?: () => void;
}

export function Pill({
  children,
  active = false,
  className = "",
  onClick,
}: PillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        inline-flex items-center justify-center
        rounded-full px-4 py-1.5 text-sm font-medium
        transition-all duration-200 cursor-pointer
        ${
          active
            ? "bg-lime text-ink font-medium"
            : "bg-[#F3F4F6] text-ink hover:bg-card-border"
        }
        ${className}
      `}
      style={{ fontFamily: "var(--font-body), sans-serif" }}
    >
      {children}
    </button>
  );
}
