"use client";

import { Button } from "@/components/ui/Button";
import { GridBackground } from "@/components/ui/GridBackground";
import { CoilSVG } from "@/components/home/Hero";
import { Reveal } from "@/components/ui";

const SHAPE_SHADOW = "drop-shadow(0 14px 16px rgba(0,20,120,0.35))";

/** Top-right lime 3D pyramid/cone */
function LimeConeSVG() {
  return (
    <svg viewBox="0 0 80 100" fill="none" className="h-full w-full">
      <polygon points="40,0 0,100 50,85" fill="#D7FF2E" />
      <polygon points="40,0 50,85 80,100" fill="#CCFF00" />
      <polygon points="0,100 50,85 80,100" fill="#8FC400" />
    </svg>
  );
}

/** Bottom-left white 3D cone */
function WhiteConeSVG() {
  return (
    <svg viewBox="0 0 80 100" fill="none" className="h-full w-full">
      <polygon points="40,0 0,100 50,85" fill="#FFFFFF" />
      <polygon points="40,0 50,85 80,100" fill="#E4E8F4" />
      <polygon points="0,100 50,85 80,100" fill="#C9D0E6" />
    </svg>
  );
}

/** Far top-right white 3D cylinder / blob */
function WhiteCylinderSVG() {
  return (
    <svg viewBox="0 0 110 160" fill="none" className="h-full w-full">
      <defs>
        <linearGradient id="cta-cyl-white-g" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#F5F7FD" />
          <stop offset="100%" stopColor="#D5DCF0" />
        </linearGradient>
      </defs>
      <rect x={0} y={30} width={110} height={105} rx={22} fill="url(#cta-cyl-white-g)" />
      <ellipse cx={55} cy={30} rx={55} ry={22} fill="#FFFFFF" />
    </svg>
  );
}

/** Bottom-left lime donut/torus */
function LimeDonutSVG() {
  return (
    <svg viewBox="0 0 320 288" fill="none" className="h-full w-full">
      <defs>
        <linearGradient id="cta-donut-lime-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E6FF66" />
          <stop offset="45%" stopColor="#CCFF00" />
          <stop offset="100%" stopColor="#8FC400" />
        </linearGradient>
      </defs>
      <ellipse
        cx={160}
        cy={144}
        rx={90}
        ry={72}
        fill="none"
        stroke="url(#cta-donut-lime-g)"
        strokeWidth={70}
      />
    </svg>
  );
}

export function CreatorCTA() {
  return (
    <section className="relative overflow-hidden bg-brand-blue py-[100px] md:py-[120px]">
      {/* ── Faint Grid Background (reused from Hero) ── */}
      <GridBackground />

      {/* ══════════════════════════════════════════════════
          DOODLE SHAPES (Reduced scale, corner cropped)
          ══════════════════════════════════════════════════ */}

      {/* 1 · Top-Left: Lime zigzag coil (cropped by left & top edge) */}
      <div
        className="pointer-events-none absolute z-[1] select-none"
        aria-hidden="true"
        data-hero-animate
        style={{
          left: -40,
          top: -40,
          width: 175,
          transform: "rotate(-15deg)",
          filter: SHAPE_SHADOW,
          animation: "hero-float 8s ease-in-out infinite",
        }}
      >
        <CoilSVG id="cta-coil-lime-tl" color="lime" />
      </div>

      {/* 2 · Top-Left-Center: Small white coil (just right of lime coil) */}
      <div
        className="pointer-events-none absolute z-[1] hidden select-none sm:block"
        aria-hidden="true"
        data-hero-animate
        style={{
          left: 150,
          top: 20,
          width: 90,
          transform: "rotate(-35deg)",
          filter: SHAPE_SHADOW,
          animation: "hero-float 7s ease-in-out 0.4s infinite",
        }}
      >
        <CoilSVG id="cta-coil-wh-tl" color="white" />
      </div>

      {/* 3 · Top-Right: Lime 3D pyramid / triangle (pointing up) */}
      <div
        className="pointer-events-none absolute z-[1] hidden select-none sm:block"
        aria-hidden="true"
        data-hero-animate
        style={{
          right: 155,
          top: 15,
          width: 90,
          height: 110,
          transform: "rotate(-12deg)",
          filter: SHAPE_SHADOW,
          animation: "hero-float 6.5s ease-in-out 0.8s infinite",
        }}
      >
        <LimeConeSVG />
      </div>

      {/* 4 · Far Top-Right: White rounded cylinder/blob (cropped by right edge) */}
      <div
        className="pointer-events-none absolute z-[1] select-none"
        aria-hidden="true"
        data-hero-animate
        style={{
          right: -35,
          top: -25,
          width: 145,
          height: 200,
          transform: "rotate(-22deg)",
          filter: SHAPE_SHADOW,
          animation: "hero-float 7.5s ease-in-out 0.2s infinite",
        }}
      >
        <WhiteCylinderSVG />
      </div>

      {/* 5 · Bottom-Left: White cone (cropped by left edge) */}
      <div
        className="pointer-events-none absolute z-[1] select-none"
        aria-hidden="true"
        data-hero-animate
        style={{
          left: -15,
          bottom: 50,
          width: 85,
          height: 105,
          transform: "rotate(6deg)",
          filter: SHAPE_SHADOW,
          animation: "hero-float 6s ease-in-out 1s infinite",
        }}
      >
        <WhiteConeSVG />
      </div>

      {/* 6 · Bottom-Left: Lime donut/torus (next to white cone, cropped by edge) */}
      <div
        className="pointer-events-none absolute z-[1] select-none"
        aria-hidden="true"
        data-hero-animate
        style={{
          left: 65,
          bottom: -55,
          width: 195,
          height: 175,
          transform: "rotate(-22deg)",
          filter: SHAPE_SHADOW,
          animation: "hero-float 7s ease-in-out 0.6s infinite",
        }}
      >
        <LimeDonutSVG />
      </div>

      {/* 7 · Bottom-Right: Large lime zigzag coil (cropped by bottom-right corner) */}
      <div
        className="pointer-events-none absolute z-[1] select-none"
        aria-hidden="true"
        data-hero-animate
        style={{
          right: -40,
          bottom: -50,
          width: 185,
          transform: "rotate(20deg)",
          filter: SHAPE_SHADOW,
          animation: "hero-float 8s ease-in-out 1.2s infinite",
        }}
      >
        <CoilSVG id="cta-coil-lime-br" color="lime" />
      </div>

      {/* ══════════════════════════════════════════════════
          MAIN CONTENT (Centered, z-10 above grid & doodles)
          ══════════════════════════════════════════════════ */}
      <Reveal className="relative z-10 mx-auto max-w-[1280px] px-6 text-center sm:px-8">
        {/* H2 Heading */}
        <h2
          className="mx-auto max-w-[700px] text-center text-[30px] font-semibold leading-[1.25] text-white sm:text-[36px] md:text-[40px]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Unlock Your Potential as a
          <br className="hidden sm:inline" /> Creator with ByteSpace
        </h2>

        {/* Description Paragraph */}
        <p
          className="mx-auto mt-5 max-w-[800px] text-center text-[15px] leading-relaxed text-white/85 md:text-[16px]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Experience the collaboration of numerous creators and an expanding selection
          of courses. Register now and become a part of a community comprising over 10,000
          local and international creators. Utilize our Course Editor, and showcase your
          expertise by publishing your finest course on the ByteSpace Course Library.
        </p>

        {/* CTA Button */}
        <div className="mt-8 flex justify-center">
          <Button
            variant="primary"
            className="h-[46px] px-8 text-[15px] font-medium shadow-[0_4px_16px_rgba(204,255,0,0.25)] transition-all hover:brightness-95 active:brightness-90"
          >
            Join as Creator
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
