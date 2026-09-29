import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "outline-white" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-lime text-ink hover:brightness-95 active:brightness-90",
  "outline-white":
    "border border-white text-white bg-transparent hover:bg-white/10 active:bg-white/20",
  ghost:
    "bg-transparent text-ink hover:bg-ink/5 active:bg-ink/10",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-[15px]",
  lg: "px-8 py-3 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center
        rounded-full font-medium
        font-body
        transition-all duration-200 cursor-pointer
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      style={{ fontFamily: "var(--font-body), sans-serif", fontWeight: 500 }}
      {...props}
    >
      {children}
    </button>
  );
}
