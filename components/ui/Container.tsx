import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** HTML element to render — defaults to "div" */
  as?: "div" | "section" | "header" | "footer" | "nav";
}

export function Container({
  children,
  className = "",
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={`mx-auto w-full max-w-[1200px] px-6 max-sm:px-4 ${className}`}
    >
      {children}
    </Tag>
  );
}
