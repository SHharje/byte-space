"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

interface FooterProps {
  /** Label for newsletter submit button (default: "Subscribe", supports "Search" to match design) */
  buttonLabel?: string;
}

const LINK_COLUMNS = [
  {
    links: [
      { label: "Featured Courses", href: "/courses" },
      { label: "Featured Categories", href: "/courses" },
      { label: "Business", href: "/courses?category=business" },
      { label: "IT", href: "/courses?category=it" },
      { label: "Design", href: "/courses?category=design" },
    ],
  },
  {
    links: [
      { label: "Development", href: "/courses?category=development" },
      { label: "Marketing", href: "/courses?category=marketing" },
      { label: "Photography", href: "/courses?category=photography" },
      { label: "Finance", href: "/courses?category=finance" },
      { label: "Sport", href: "/courses?category=sport" },
    ],
  },
  {
    links: [
      { label: "Become a Creator", href: "/creators" },
      { label: "Affiliate Program", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Help", href: "#" },
      { label: "About", href: "#" },
    ],
  },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookies Settings", href: "#" },
];

export function Footer({ buttonLabel = "Subscribe" }: FooterProps) {
  const [email, setEmail] = useState("");
  const currentYear = new Date().getFullYear();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      alert("Thank you for subscribing!");
      setEmail("");
    }
  };

  return (
    <footer className="border-t border-card-border bg-white pb-8 pt-16 md:pb-8 md:pt-16">
      <div className="mx-auto w-full max-w-[1200px] px-6 max-sm:px-4">
        {/* ══════════════════════════════════════════════════
            TOP ROW: Newsletter (left) + 3 Link Columns (right)
            ══════════════════════════════════════════════════ */}
        <div className="flex flex-col gap-12 min-[900px]:flex-row min-[900px]:items-start min-[900px]:justify-between min-[900px]:gap-16">
          {/* Newsletter block (~40% width) */}
          <div className="w-full min-[900px]:max-w-[440px]">
            <Link href="/" aria-label="ByteSpace home">
              <Logo variant="dark" />
            </Link>

            <p
              className="mt-4 text-[14px] leading-relaxed text-muted"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Stay Up to date with our latest features and releases by joining
              our newsletter.
            </p>

            {/* Newsletter Form */}
            <form onSubmit={handleSubmit} className="mt-5">
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="h-[46px] w-full rounded-full border border-card-border bg-white px-5 text-[14px] text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-ink/40 sm:w-[280px]"
                  style={{ fontFamily: "var(--font-body)" }}
                />
                <button
                  type="submit"
                  className="h-[46px] cursor-pointer rounded-full bg-lime px-7 text-[15px] font-medium text-ink transition-all hover:brightness-95 active:brightness-90"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {buttonLabel}
                </button>
              </div>
            </form>

            {/* Consent Text */}
            <p
              className="mt-3 max-w-[380px] text-[12px] leading-relaxed text-muted"
              style={{ fontFamily: "var(--font-body)" }}
            >
              By subscribing, you agree to our{" "}
              <Link
                href="#"
                className="underline underline-offset-2 transition-colors hover:text-ink"
              >
                Privacy Policy
              </Link>{" "}
              and consent to receive updates from our company.
            </p>
          </div>

          {/* Three Link Columns (~60% width) */}
          <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-10 min-[900px]:gap-12">
            {LINK_COLUMNS.map((col, colIdx) => (
              <ul key={colIdx} className="flex flex-col gap-4">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-ink transition-colors hover:underline hover:underline-offset-4"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            BOTTOM ROW: Copyright + Legal Links
            ══════════════════════════════════════════════════ */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-card-border pt-6 sm:flex-row">
          {/* Left: Dynamic Copyright */}
          <p
            className="text-[13px] text-muted"
            style={{ fontFamily: "var(--font-body)" }}
          >
            © {currentYear} ByteSpace. All rights reserved.
          </p>

          {/* Right: Legal links */}
          <div className="flex flex-wrap items-center gap-6">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[13px] text-muted transition-colors hover:text-ink hover:underline hover:underline-offset-2"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
