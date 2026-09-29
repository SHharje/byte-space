"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { GridBackground } from "@/components/ui/GridBackground";
import { Navbar } from "@/components/ui/Navbar";

/* ══════════════════════════════════════════════════════════
   SVG DOODLE SHAPES
   ══════════════════════════════════════════════════════════ */

/** Reusable zigzag coil / spring (lime or white, 3.5 loops). */
export function CoilSVG({ id, color }: { id: string; color: "lime" | "white" }) {
  const isLime = color === "lime";
  const shadow = isLime ? "#8FC400" : "#C3CADF";
  const base = isLime ? "#CCFF00" : "#F4F6FC";
  const d =
    "M 30,20 C 80,40 80,65 30,85 C -20,105 -20,130 30,150 C 80,170 80,195 30,215 C -20,235 -20,260 30,280";

  return (
    <svg viewBox="-55 -15 170 320" fill="none">
      <defs>
        <filter id={`${id}-hl`}>
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>
      {/* Shadow layer */}
      <path
        d={d}
        stroke={shadow}
        strokeWidth={46}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        transform="translate(4,6)"
      />
      {/* Base layer */}
      <path
        d={d}
        stroke={base}
        strokeWidth={42}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Highlight layer */}
      <path
        d={d}
        stroke="rgba(255,255,255,0.55)"
        strokeWidth={8}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        transform="translate(-6,-8)"
        filter={`url(#${id}-hl)`}
      />
    </svg>
  );
}

/** White donut / torus shape. */
function DonutSVG() {
  return (
    <svg viewBox="0 0 320 288" fill="none">
      <defs>
        <linearGradient id="hero-donut-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#DDE2F0" />
        </linearGradient>
      </defs>
      <ellipse
        cx={160}
        cy={144}
        rx={90}
        ry={72}
        fill="none"
        stroke="url(#hero-donut-g)"
        strokeWidth={70}
      />
    </svg>
  );
}

/** White 3-face cone / pyramid. */
function ConeSVG() {
  return (
    <svg viewBox="0 0 80 100" fill="none">
      <polygon points="40,0 0,100 50,85" fill="#FFFFFF" />
      <polygon points="40,0 50,85 80,100" fill="#E4E8F4" />
      <polygon points="0,100 50,85 80,100" fill="#C9D0E6" />
    </svg>
  );
}

/** Lime 3-D cylinder. */
function CylinderSVG() {
  return (
    <svg viewBox="0 0 100 160" fill="none">
      <defs>
        <linearGradient id="hero-cyl-g" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#E6FF66" />
          <stop offset="50%" stopColor="#CCFF00" />
          <stop offset="100%" stopColor="#9BCF00" />
        </linearGradient>
      </defs>
      <rect x={0} y={30} width={100} height={100} rx={10} fill="url(#hero-cyl-g)" />
      <ellipse cx={50} cy={30} rx={50} ry={20} fill="#E6FF66" />
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════
   FLOATING CARDS
   ══════════════════════════════════════════════════════════ */

const CARD =
  "bg-white rounded-[10px] p-4 shadow-[0_8px_24px_rgba(0,20,120,0.12)]";

function UIUXCard() {
  return (
    <div className={CARD} style={{ minWidth: 195 }}>
      <p
        className="text-[16px] font-medium text-ink"
        style={{ fontFamily: "var(--font-body)" }}
      >
        UI/UX Design
      </p>
      <p
        className="mt-0.5 text-[12px] text-muted"
        style={{ fontFamily: "var(--font-body)" }}
      >
        200 Courses &nbsp;•&nbsp; 1000+ Students
      </p>
    </div>
  );
}

function ProgressCard() {
  const [filled, setFilled] = useState(false);
  const [noMotion, setNoMotion] = useState(false);

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setNoMotion(rm);
    if (rm) {
      setFilled(true);
      return;
    }
    const t = setTimeout(() => setFilled(true), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={CARD} style={{ minWidth: 175 }}>
      <p
        className="text-[14px] font-medium text-ink"
        style={{ fontFamily: "var(--font-body)" }}
      >
        Learning Progress
      </p>
      <p
        className="mt-1 text-[48px] font-semibold leading-none text-ink"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        55%
      </p>
      <div
        className="mt-2 h-2 w-full rounded-full bg-[#EEF0F3]"
        role="progressbar"
        aria-valuenow={55}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-lime"
          style={{
            width: filled ? "55%" : "0%",
            transition: !noMotion && filled ? "width 1s ease-out" : "none",
          }}
        />
      </div>
    </div>
  );
}

export function HappyStudentsCard({ className = "" }: { className?: string } = {}) {
  const avatars = [1, 2, 3, 1, 2].map(
    (n) => `/images/avatars/avatar-${n}.png`
  );

  return (
    <div className={`${CARD} ${className}`} style={{ minWidth: 250 }}>
      <p
        className="text-[16px] font-medium text-ink"
        style={{ fontFamily: "var(--font-body)" }}
      >
        Happy Students
      </p>

      {/* Rating row */}
      <div className="mt-0.5 flex items-center gap-1">
        <span
          className="text-[13px] font-medium text-ink"
          style={{ fontFamily: "var(--font-body)" }}
        >
          4.5
        </span>
        <span
          className="text-[13px] text-muted"
          style={{ fontFamily: "var(--font-body)" }}
        >
          (240)
        </span>
        <svg
          width={14}
          height={14}
          viewBox="0 0 24 24"
          fill="#CCFF00"
          aria-hidden="true"
        >
          <polygon points="12,2 15.1,8.3 22,9.3 17,14.1 18.2,21 12,17.8 5.8,21 7,14.1 2,9.3 8.9,8.3" />
        </svg>
      </div>

      {/* Overlapping avatars + "2K+" badge */}
      <div className="mt-2 flex items-center">
        {avatars.map((src, i) => (
          <div
            key={i}
            className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white"
            style={{ marginLeft: i > 0 ? -10 : 0, zIndex: 10 - i }}
          >
            <Image
              src={src}
              alt=""
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
        <div
          className="relative flex h-10 w-10 items-center justify-center rounded-full bg-lime"
          style={{ marginLeft: -10, zIndex: 0 }}
        >
          <span
            className="text-[12px] font-bold text-ink"
            style={{ fontFamily: "var(--font-body)" }}
          >
            2K+
          </span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   HERO SECTION
   ══════════════════════════════════════════════════════════ */

const NAV_LINKS = [
  { label: "Home", href: "/", active: true },
  { label: "Courses", href: "/courses", active: false },
  { label: "Creators", href: "/creators", active: false },
];

const SHAPE_SHADOW = "drop-shadow(0 14px 16px rgba(0,20,120,0.35))";

export function Hero() {
  const [scale, setScale] = useState(1);
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  /* ── Desktop stage scaling ── */
  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      setScale(vw >= 768 ? Math.min(1, vw / 1440) : 1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* ── Mobile menu: focus-trap + Escape ── */
  useEffect(() => {
    if (!menuOpen) return;
    const menu = menuRef.current;
    if (!menu) return;
    const els = menu.querySelectorAll<HTMLElement>(
      'a,button,input,[tabindex]:not([tabindex="-1"])'
    );
    const first = els[0];
    const last = els[els.length - 1];
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        hamburgerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/courses?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/courses");
    }
  };

  return (
    <section className="relative overflow-hidden bg-brand-blue">
      <GridBackground />
      {/* ═══════════════════════════════════════
         DESKTOP LAYOUT (≥ 768 px)
         Stage: 1440×1024, scale(vw/1440) below 1440
         ═══════════════════════════════════════ */}
      <div
        className="hidden md:block"
        style={{ height: Math.round(1024 * scale) }}
      >
        <div
          className="relative mx-auto"
          style={{
            width: 1440,
            height: 1024,
            transform: `scale(${scale})`,
            transformOrigin: "top center",
          }}
        >
          {/* ────────── Navbar (z-10) ────────── */}
          <Navbar className="absolute inset-x-0 top-0 z-10 w-full" />

          {/* ────────── Headline + Subtext + Search (z-10) ────────── */}
          <div className="absolute inset-x-0 top-[185px] z-10 flex flex-col items-center text-center">
            {/* Headline */}
            <div
              data-hero-animate
              style={{ animation: "hero-fade-up 500ms ease-out both" }}
            >
              <h1
                className="mx-auto max-w-[880px] text-white"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: 72,
                  fontWeight: 600,
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                  textWrap: "balance",
                }}
              >
                Get Access to Hundreds Courses Available
              </h1>
            </div>

            {/* Subtext */}
            <div
              data-hero-animate
              style={{
                animation: "hero-fade-up 500ms ease-out 150ms both",
                opacity: 0,
              }}
            >
              <p
                className="mx-auto mt-8 max-w-[830px] text-[18px] leading-relaxed text-white/90"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Unlock your creativity, gain valuable knowledge, and grow your
                business with our wide range of courses.
              </p>
            </div>

            {/* Search */}
            <div
              data-hero-animate
              style={{
                animation: "hero-fade-up 500ms ease-out 300ms both",
                opacity: 0,
              }}
            >
              <form
                role="search"
                onSubmit={onSearch}
                className="mt-[72px] flex items-center gap-[17px]"
              >
                <label htmlFor="hero-search" className="sr-only">
                  Search courses
                </label>
                <div className="relative">
                  <Search
                    size={20}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                  />
                  <input
                    id="hero-search"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Course, topic, creator"
                    className="h-[52px] w-[460px] rounded-full bg-white pl-12 pr-4 text-[17px] text-ink outline-none focus:ring-[3px] focus:ring-lime/60"
                    style={{ fontFamily: "var(--font-body)" }}
                  />
                </div>
                <button
                  type="submit"
                  className="h-[46px] w-[103px] cursor-pointer rounded-full bg-lime text-[17px] font-medium text-ink transition-all hover:brightness-95 active:brightness-90"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Search
                </button>
              </form>
            </div>
          </div>

          {/* ────────── Lime Circle (z-1) ────────── */}
          <div
            className="absolute z-[1] rounded-full bg-lime"
            style={{
              width: 1154,
              height: 1154,
              left: "50%",
              top: 593,
              transform: "translateX(-50%)",
            }}
          />

          {/* ────────── Student Image (z-2) ────────── */}
          <div
            className="absolute z-[2]"
            data-hero-animate
            style={{
              left: 420,
              top: 520,
              animation: "hero-rise-in 600ms ease-out 400ms both",
              opacity: 0,
            }}
          >
            <Image
              src="/images/hero/hero-student.png"
              alt="Smiling student wearing a headset and holding a laptop"
              width={550}
              height={700}
              priority
              style={{
                filter: "drop-shadow(0 20px 30px rgba(0,30,120,0.25))",
              }}
            />
          </div>

          {/* ────────── Floating Cards (z-3) ────────── */}

          {/* Card A – UI/UX Design */}
          <div
            className="absolute z-[3]"
            data-hero-animate
            style={{
              left: 340,
              top: 630,
              animation: "hero-float-card 6s ease-in-out 1.2s infinite",
            }}
          >
            <div
              data-hero-animate
              style={{
                animation: "hero-scale-in 500ms ease-out 500ms both",
                opacity: 0,
              }}
            >
              <UIUXCard />
            </div>
          </div>

          {/* Card B – Learning Progress */}
          <div
            className="absolute z-[3]"
            data-hero-animate
            style={{
              left: 840,
              top: 650,
              animation: "hero-float-card 7s ease-in-out 1.5s infinite",
            }}
          >
            <div
              data-hero-animate
              style={{
                animation: "hero-scale-in 500ms ease-out 600ms both",
                opacity: 0,
              }}
            >
              <ProgressCard />
            </div>
          </div>

          {/* Card C – Happy Students */}
          <div
            className="absolute z-[3]"
            data-hero-animate
            style={{
              left: 250,
              top: 750,
              animation: "hero-float-card 5s ease-in-out 1s infinite",
            }}
          >
            <div
              data-hero-animate
              style={{
                animation: "hero-scale-in 500ms ease-out 700ms both",
                opacity: 0,
              }}
            >
              <HappyStudentsCard />
            </div>
          </div>

          {/* ────────── 6 Doodle Shapes (z-1) ────────── */}

          {/* 1 · Lime chunky coil — upper-left, partially cropped */}
          <div
            className="pointer-events-none absolute z-[1]"
            aria-hidden="true"
            data-hero-animate
            style={{
              left: -60,
              top: 320,
              width: 220,
              transform: "rotate(-15deg)",
              filter: SHAPE_SHADOW,
              animation: "hero-float 8s ease-in-out infinite",
            }}
          >
            <CoilSVG id="coil-lime" color="lime" />
          </div>

          {/* 2 · Small white coil — lower-left */}
          <div
            className="pointer-events-none absolute z-[1]"
            aria-hidden="true"
            data-hero-animate
            style={{
              left: 100,
              top: 680,
              width: 110,
              transform: "rotate(-20deg)",
              filter: SHAPE_SHADOW,
              animation: "hero-float 7s ease-in-out 0.5s infinite",
            }}
          >
            <CoilSVG id="coil-wh-sm" color="white" />
          </div>

          {/* 3 · White donut / torus — lower-left */}
          <div
            className="pointer-events-none absolute z-[1]"
            aria-hidden="true"
            data-hero-animate
            style={{
              left: -20,
              top: 770,
              width: 220,
              transform: "rotate(15deg)",
              filter: SHAPE_SHADOW,
              animation: "hero-float 6s ease-in-out 1s infinite",
            }}
          >
            <DonutSVG />
          </div>

          {/* 4 · Lime cylinder — right edge, partially cropped */}
          <div
            className="pointer-events-none absolute z-[1]"
            aria-hidden="true"
            data-hero-animate
            style={{
              left: 1340,
              top: 260,
              width: 110,
              transform: "rotate(-25deg)",
              filter: SHAPE_SHADOW,
              animation: "hero-float 7s ease-in-out 0.3s infinite",
            }}
          >
            <CylinderSVG />
          </div>

          {/* 5 · White cone / pyramid — mid-right */}
          <div
            className="pointer-events-none absolute z-[1]"
            aria-hidden="true"
            data-hero-animate
            style={{
              left: 1190,
              top: 510,
              width: 70,
              filter: SHAPE_SHADOW,
              animation: "hero-float 6s ease-in-out 0.7s infinite",
            }}
          >
            <ConeSVG />
          </div>

          {/* 6 · Large white coil — lower-right */}
          <div
            className="pointer-events-none absolute z-[1]"
            aria-hidden="true"
            data-hero-animate
            style={{
              left: 1220,
              top: 680,
              width: 220,
              transform: "rotate(10deg)",
              filter: SHAPE_SHADOW,
              animation: "hero-float 8s ease-in-out 1.2s infinite",
            }}
          >
            <CoilSVG id="coil-wh-lg" color="white" />
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
         MOBILE LAYOUT (< 768 px)
         Stacked flow, no stage scaling
         ═══════════════════════════════════════ */}
      <div className="md:hidden">
        {/* ── Mobile Navbar ── */}
        <nav
          aria-label="Primary"
          className="relative z-10 flex h-16 items-center justify-between px-4"
        >
          <Link href="/" aria-label="ByteSpace home">
            <Logo variant="light" />
          </Link>
          <button
            ref={hamburgerRef}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="cursor-pointer text-white"
          >
            <Menu size={24} />
          </button>
        </nav>

        {/* ── Slide-down mobile menu ── */}
        {menuOpen && (
          <div
            ref={menuRef}
            className="fixed inset-0 z-50 flex flex-col bg-brand-blue"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            data-hero-animate
            style={{ animation: "hero-slide-down 200ms ease-out both" }}
          >
            <div className="flex h-16 items-center justify-between px-4">
              <Logo variant="light" />
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="cursor-pointer text-white"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col items-center gap-6 pt-8">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-lg ${
                    l.active ? "font-medium text-white" : "text-white/90"
                  }`}
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {l.label}
                </Link>
              ))}
              <hr className="w-40 border-white/20" />
              <Link
                href="/signin"
                onClick={() => setMenuOpen(false)}
                className="text-lg text-white"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Sign In
              </Link>
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/join");
                }}
              >
                Join Us
              </Button>
            </div>
          </div>
        )}

        {/* ── Mobile Content ── */}
        <div className="relative z-10 flex flex-col items-center px-4 pt-6 text-center">
          <h1
            className="max-w-[90vw] text-white"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: 36,
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              textWrap: "balance",
            }}
          >
            Get Access to Hundreds Courses Available
          </h1>
          <p
            className="mt-5 max-w-[90vw] text-[16px] leading-relaxed text-white/90"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Unlock your creativity, gain valuable knowledge, and grow your
            business with our wide range of courses.
          </p>

          {/* Stacked search */}
          <form
            role="search"
            onSubmit={onSearch}
            className="mt-8 flex w-full max-w-[400px] flex-col items-center gap-3"
          >
            <label htmlFor="hero-search-m" className="sr-only">
              Search courses
            </label>
            <div className="relative w-full">
              <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                id="hero-search-m"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Course, topic, creator"
                className="h-[48px] w-full rounded-full bg-white pl-11 pr-4 text-[16px] text-ink outline-none focus:ring-[3px] focus:ring-lime/60"
                style={{ fontFamily: "var(--font-body)" }}
              />
            </div>
            <button
              type="submit"
              className="h-[46px] w-full cursor-pointer rounded-full bg-lime text-[16px] font-medium text-ink transition-all hover:brightness-95"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Search
            </button>
          </form>
        </div>

        {/* ── Mobile: Student + Dome + Cards + Shapes ── */}
        <div
          className="relative mt-8 flex justify-center overflow-hidden"
          style={{ minHeight: "55vw" }}
        >
          {/* Lime dome */}
          <div
            className="absolute rounded-full bg-lime"
            style={{
              width: "120vw",
              height: "120vw",
              left: "50%",
              top: "20%",
              transform: "translateX(-50%)",
            }}
          />

          {/* Student */}
          <div
            className="relative z-[2]"
            style={{
              width: "78vw",
              maxWidth: 540,
              filter: "drop-shadow(0 15px 20px rgba(0,30,120,0.2))",
            }}
          >
            <Image
              src="/images/hero/hero-student.png"
              alt="Smiling student wearing a headset and holding a laptop"
              width={540}
              height={700}
              priority
              className="h-auto w-full object-contain"
            />
          </div>

          {/* Mobile cards — Learning Progress + Happy Students, 0.8 scale */}
          <div
            className="absolute z-[3] origin-bottom-right"
            style={{ bottom: "18%", right: "3%", transform: "scale(0.8)" }}
          >
            <ProgressCard />
          </div>
          <div
            className="absolute z-[3] origin-bottom-left"
            style={{ bottom: "5%", left: "3%", transform: "scale(0.8)" }}
          >
            <HappyStudentsCard />
          </div>

          {/* Mobile shapes — lime coil (left) + white coil (right), 60% */}
          <div
            className="pointer-events-none absolute z-[1]"
            aria-hidden="true"
            data-hero-animate
            style={{
              left: "-8%",
              top: "8%",
              width: "22vw",
              maxWidth: 130,
              transform: "rotate(-15deg)",
              filter: SHAPE_SHADOW,
              animation: "hero-float 8s ease-in-out infinite",
            }}
          >
            <CoilSVG id="coil-lime-m" color="lime" />
          </div>
          <div
            className="pointer-events-none absolute z-[1]"
            aria-hidden="true"
            data-hero-animate
            style={{
              right: "-6%",
              bottom: "15%",
              width: "22vw",
              maxWidth: 130,
              transform: "rotate(10deg)",
              filter: SHAPE_SHADOW,
              animation: "hero-float 8s ease-in-out 0.5s infinite",
            }}
          >
            <CoilSVG id="coil-wh-m" color="white" />
          </div>
        </div>
      </div>
    </section>
  );
}
