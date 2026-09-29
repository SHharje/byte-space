import { CSSProperties } from "react";

export const gridBackgroundStyle: CSSProperties = {
  backgroundImage: [
    "linear-gradient(rgba(255,255,255,0.14) 1px, transparent 1px)",
    "linear-gradient(90deg, rgba(255,255,255,0.14) 1px, transparent 1px)",
  ].join(","),
  backgroundSize: "120px 120px",
  backgroundPosition: "0 -1px",
};

interface GridBackgroundProps {
  className?: string;
  style?: CSSProperties;
}

export function GridBackground({ className = "", style }: GridBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        ...gridBackgroundStyle,
        ...style,
      }}
    />
  );
}
