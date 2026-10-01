import type { ReactNode } from "react";
import Link from "next/link";
import { GridBackground } from "@/components/ui/GridBackground";
import { Logo } from "@/components/ui/Logo";
import { AuthVisualCollage } from "@/components/auth/AuthVisualCollage";

export interface AuthLayoutProps {
  heading: string;
  subtext: string;
  children: ReactNode;
}

export function AuthLayout({ heading, subtext, children }: AuthLayoutProps) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-brand-blue">
      {/* Background grid texture (reused at identical scale/opacity) */}
      <GridBackground />

      <div className="relative z-10 flex min-h-screen flex-col lg:flex-row">
        {/* ── Left Panel (Desktop ~50%, Mobile stack top) ── */}
        <div className="flex w-full flex-col justify-start p-6 sm:p-10 lg:w-1/2 lg:p-[52px]">
          <div>
            {/* Logo top-left (~52px margin on desktop) */}
            <Link
              href="/"
              aria-label="ByteSpace Home"
              className="inline-block transition-opacity hover:opacity-90"
            >
              <Logo variant="light" />
            </Link>

            {/* Heading & Subtext */}
            <div className="mt-6 lg:mt-[56px]">
              <h1
                className="text-[26px] font-bold leading-snug text-white"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {heading}
              </h1>
              <p
                className="mt-3 max-w-[440px] text-[16px] leading-[1.5] text-white/85"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {subtext}
              </p>
            </div>
          </div>

          {/* Floating visual collage — desktop only (≥1024px), shifted further right and up */}
          <div className="hidden lg:block mt-6 lg:mt-[24px] lg:translate-x-12 xl:translate-x-20">
            <AuthVisualCollage />
          </div>
        </div>

        {/* ── Right Panel: Form Card Slot (Desktop ~50%, Mobile full-width with side padding) ── */}
        <div className="flex w-full items-center justify-center p-4 pb-12 sm:p-8 lg:w-1/2 lg:p-[52px]">
          <div className="w-full max-w-[520px]">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AuthLayout;
