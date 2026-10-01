import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/ui/Navbar";
import { GridBackground } from "@/components/ui/GridBackground";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/home/Footer";

export const metadata: Metadata = {
  title: "Page Not Found — ByteSpace",
  description: "The page you are looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex flex-col justify-between">
      {/* ── Hero Section with GridBackground and Navbar ── */}
      <section className="relative overflow-hidden bg-brand-blue pb-20 sm:pb-24">
        {/* Reused Grid Background */}
        <GridBackground />

        {/* Shared Navbar (No active state on unmatched route) */}
        <div className="relative z-20 mx-auto max-w-[1440px]">
          <Navbar variant="light" />
        </div>

        {/* Centered Content Container (~820-900px total section height on desktop) */}
        <div className="relative z-10 mx-auto flex max-w-[1440px] flex-col items-center justify-center px-6 pt-10 sm:pt-14 min-h-[580px] md:min-h-[680px]">
          {/* ── Giant Decorative 404 Numerals (Behind heading) ── */}
          <div
            aria-hidden="true"
            className="select-none pointer-events-none text-center font-extrabold tracking-tight leading-none"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(6.5rem, 22vw, 17.5rem)",
              background: "linear-gradient(180deg, #CCFF00 10%, #4F9C8C 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
              opacity: 0.9,
            }}
          >
            404
          </div>

          {/* ── Heading + Subtext + CTA (Overlapping the bottom third of numerals) ── */}
          <div className="relative z-10 -mt-16 sm:-mt-24 md:-mt-32 lg:-mt-36 flex flex-col items-center text-center">
            {/* Real Accessible Heading */}
            <h1
              className="text-white text-[28px] sm:text-[38px] md:text-[44px] font-bold leading-[1.2] max-w-[750px]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              The page you are looking <br className="hidden sm:inline" />
              for doesn’t exist
            </h1>

            {/* Subtext */}
            <p
              className="mt-6 sm:mt-7 text-white/85 text-[15px] sm:text-[16px] max-w-[620px] font-medium leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Try to use a correct url or go back to homepage to start again
            </p>

            {/* Back to Home CTA */}
            <div className="mt-6 sm:mt-7">
              <Link href="/">
                <Button
                  variant="primary"
                  size="md"
                  className="px-8 py-3 text-[15px] font-medium text-ink shadow-md transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                  style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
                >
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Reused Footer ── */}
      <Footer />
    </main>
  );
}
