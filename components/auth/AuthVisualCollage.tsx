"use client";

import { CourseCard, type CourseCardData } from "@/components/home/CourseCard";
import { CoilSVG, HappyStudentsCard } from "@/components/home/Hero";
import { BASE_COURSES } from "@/lib/courses-data";

interface AuthVisualCollageProps {
  className?: string;
}

/** 3D lime pyramid / cone matching CTA and hero 3D doodle shapes */
function LimeConeSVG() {
  return (
    <svg viewBox="0 0 80 100" fill="none" className="h-full w-full">
      <polygon points="40,0 0,100 50,85" fill="#D7FF2E" />
      <polygon points="40,0 50,85 80,100" fill="#CCFF00" />
      <polygon points="0,100 50,85 80,100" fill="#8FC400" />
    </svg>
  );
}

export function AuthVisualCollage({ className = "" }: AuthVisualCollageProps) {
  // Course data for back card: "Build Digital Asset" with 17 Lessons chip & Beginner level
  const backCourse: CourseCardData = {
    ...BASE_COURSES[1],
    title: "Build Digital Asset",
    fullTitle: "Build Digital Asset",
    lessons: "17 Lessons",
    level: "Beginner",
  };

  // Course data for front card: "the Power of Big Data" (BASE_COURSES[2])
  const frontCourse: CourseCardData = BASE_COURSES[2];

  return (
    <div
      className={`relative h-[550px] w-[520px] select-none pointer-events-none origin-top-left xl:scale-100 lg:scale-[0.92] ${className}`}
      aria-hidden="true"
    >
      {/* ── CARD LAYERS (Underneath doodles) ── */}

      {/* Back Course Card */}
      <div
        className="absolute rounded-2xl"
        style={{
          left: 20,
          top: 65,
          width: 290,
          transform: "rotate(-4deg)",
          zIndex: 2,
          boxShadow: "0 18px 36px -4px rgba(0, 20, 120, 0.25), 0 8px 16px -4px rgba(0, 0, 0, 0.08)",
        }}
      >
        <CourseCard course={backCourse} />
      </div>

      {/* Front Course Card (Main floating card) */}
      <div
        className="absolute rounded-2xl"
        style={{
          left: 155,
          top: -10,
          width: 370,
          transform: "rotate(2deg)",
          zIndex: 3,
          boxShadow: "0 24px 48px -6px rgba(0, 20, 120, 0.32), 0 12px 24px -4px rgba(0, 0, 0, 0.12)",
        }}
      >
        <CourseCard course={frontCourse} />
      </div>

      {/* Lime 'Happy Students' Card */}
      <div
        className="absolute"
        style={{
          left: 230,
          top: 405,
          width: 255,
          zIndex: 4,
        }}
      >
        <HappyStudentsCard
          variant="lime"
          className="w-[255px] shadow-[0_20px_40px_rgba(0,20,120,0.28)]"
        />
      </div>

      {/* ── TOP LAYER DOODLES (Elevated on top of cards) ── */}

      {/* 1. Lime Donut / Torus Ring (Top layer, overlapping cards) */}
      <div
        className="absolute"
        style={{
          left: 130,
          top: -30,
          width: 110,
          height: 105,
          zIndex: 10,
          transform: "rotate(-22deg)",
          filter: "drop-shadow(0 14px 20px rgba(0, 20, 120, 0.35))",
        }}
      >
        <svg viewBox="0 0 320 288" fill="none" className="h-full w-full">
          <defs>
            <linearGradient id="auth-donut-lime-grad" x1="0" y1="0" x2="1" y2="1">
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
            stroke="url(#auth-donut-lime-grad)"
            strokeWidth={70}
          />
        </svg>
      </div>

      {/* 2. White Zigzag Coil Doodle (Top layer, prominently floating over cards) */}
      <div
        className="absolute"
        style={{
          left: 360,
          top: 315,
          width: 85,
          height: 135,
          zIndex: 20,
          transform: "rotate(-18deg)",
          filter: "drop-shadow(0 14px 20px rgba(0, 20, 120, 0.35))",
        }}
      >
        <CoilSVG id="auth-coil-white" color="white" />
      </div>

      {/* 3. Lime 3D Cone / Pyramid (Top layer, overlapping card corner) */}
      <div
        className="absolute"
        style={{
          left: 15,
          top: 425,
          width: 115,
          height: 135,
          zIndex: 10,
          transform: "rotate(8deg)",
          filter: "drop-shadow(0 14px 22px rgba(0, 20, 120, 0.3))",
        }}
      >
        <LimeConeSVG />
      </div>
    </div>
  );
}
