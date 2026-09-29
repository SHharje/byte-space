import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  /** Toggle the default border */
  border?: boolean;
  /** Toggle the default shadow */
  shadow?: boolean;
  /** Override border-radius — defaults to "rounded-2xl" (16px) */
  radius?: string;
}

export function Card({
  children,
  className = "",
  border = true,
  shadow = false,
  radius = "rounded-2xl",
}: CardProps) {
  return (
    <div
      className={`
        bg-white ${radius} overflow-hidden
        ${border ? "border border-card-border" : ""}
        ${shadow ? "shadow-md" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
