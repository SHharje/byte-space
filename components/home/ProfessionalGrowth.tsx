"use client";

import Image from "next/image";
import { Check, BarChart3 } from "lucide-react";
import { Reveal, CountUp } from "@/components/ui";

/* ══════════════════════════════════════════════════════════
   LIME COIL DOODLE SVG (Matches Figma #D4FB20 Electric Lime)
   ══════════════════════════════════════════════════════════ */

function GrowthCoilSVG({ id }: { id: string }) {
  const d =
    "M 30,20 C 80,40 80,65 30,85 C -20,105 -20,130 30,150 C 80,170 80,195 30,215 C -20,235 -20,260 30,280";

  return (
    <svg viewBox="-55 -15 170 320" fill="none" className="w-full h-full drop-shadow-[0_10px_20px_rgba(212,251,32,0.3)]">
      <defs>
        <filter id={`${id}-hl`}>
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>
      {/* Shadow layer */}
      <path
        d={d}
        stroke="#8EB500"
        strokeWidth={46}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        transform="translate(4,6)"
      />
      {/* Base layer */}
      <path
        d={d}
        stroke="#D4FB20"
        strokeWidth={42}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Highlight layer */}
      <path
        d={d}
        stroke="rgba(255,255,255,0.65)"
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

/* ══════════════════════════════════════════════════════════
   SUB-BLOCK A DECORATIVE CARDS
   ══════════════════════════════════════════════════════════ */

/** Course Card 1 (Figma: width 373px, height 384px, left 0, top 0) */
function CourseCardPeek() {
  return (
    <div
      className="pointer-events-none absolute left-0 top-0 z-10 w-[330px] sm:w-[373px] h-[340px] sm:h-[384px] rounded-[24px] border border-[#CED0D3] bg-white p-4 shadow-[0_12px_32px_rgba(0,0,0,0.06)] select-none"
      aria-hidden="true"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/9.5] w-full overflow-hidden rounded-[12px]">
        <Image
          src="/images/courses/course-1.jpg"
          alt=""
          fill
          sizes="373px"
          className="object-cover"
        />
        {/* Overlay chips */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span
            className="rounded-[24px] bg-[#F6F6F6]/80 backdrop-blur-[4px] px-3 py-1 text-[12px] font-medium text-[#4F4F4F]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            17 Lessons
          </span>
          <span
            className="rounded-[24px] bg-[#F6F6F6]/80 backdrop-blur-[4px] px-3 py-1 text-[12px] font-medium text-[#4F4F4F]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            2 hours 16 mins
          </span>
        </div>
      </div>

      {/* Title + Rating */}
      <div className="mt-4 flex items-start justify-between">
        <div>
          <h4
            className="text-[20px] font-semibold text-black tracking-[-0.01em] line-clamp-1 leading-[28px]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Learn Figma from Basic
          </h4>
          <p
            className="text-[12px] text-[#4F4F4F]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            by purepearl studio
          </p>
        </div>
        <div className="flex items-center gap-1">
          <span
            className="text-[18px] font-medium text-[#4F4F4F]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            4.5
          </span>
          <svg width={20} height={20} viewBox="0 0 24 24" fill="#D4FB20">
            <polygon points="12,2 15.1,8.3 22,9.3 17,14.1 18.2,21 12,17.8 5.8,21 7,14.1 2,9.3 8.9,8.3" />
          </svg>
        </div>
      </div>

      {/* Meta: Beginner + Avatars */}
      <div className="mt-3 flex items-center justify-between">
        <span
          className="inline-flex items-center gap-1 rounded-[24px] bg-[#F5F5F6] px-3 py-1 text-[12px] font-medium text-[#4B4C53]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          <BarChart3 size={14} strokeWidth={2.5} />
          Beginner
        </span>

        {/* Avatars */}
        <div className="flex items-center">
          {[1, 2, 3].map((n, i) => (
            <div
              key={i}
              className="relative h-7 w-7 rounded-full border border-white overflow-hidden"
              style={{ marginLeft: i === 0 ? 0 : -8 }}
            >
              <Image
                src={`/images/avatars/avatar-${n}.png`}
                alt=""
                fill
                sizes="28px"
                className="object-cover"
              />
            </div>
          ))}
          <div
            className="relative flex h-7 w-7 items-center justify-center rounded-full bg-black text-[11px] font-medium text-white"
            style={{ marginLeft: -8 }}
          >
            26+
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="mt-3 flex items-baseline">
        <span
          className="text-[20px] font-medium text-[#003BE2]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          $25
        </span>
        <span
          className="ml-1 text-[12px] text-[#4F4F4F]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          /lifetime
        </span>
      </div>
    </div>
  );
}

/** Learning Progress Card (Figma: width 232px, height 138px, left 345px, top 213px) */
function LearningProgressCard() {
  return (
    <div className="absolute right-0 sm:left-[345px] top-[185px] sm:top-[213px] z-30 w-[215px] sm:w-[232px] rounded-[16px] bg-white/95 backdrop-blur-[10px] p-4 shadow-[0_12px_28px_rgba(0,20,120,0.12)]">
      <p
        className="text-[14px] font-medium text-[#242528] leading-[24px]"
        style={{ fontFamily: "var(--font-body)" }}
      >
        Learning Progress
      </p>
      <p
        className="mt-1 text-[44px] sm:text-[48px] font-semibold leading-[1.2] tracking-[-0.01em] text-[#242528]"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        55%
      </p>
      <div
        className="mt-2 h-2 w-[200px] max-w-full rounded-[24px] bg-[#F6F6F6]"
        role="progressbar"
        aria-valuenow={55}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-[24px] bg-[#D4FB20] transition-all duration-1000"
          style={{ width: "55%" }}
        />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   SUB-BLOCK B DECORATIVE CARDS
   ══════════════════════════════════════════════════════════ */

/** Total Revenue Card (Figma: left 0, top 44px, width 232px, height 119px) */
function TotalRevenueCard() {
  return (
    <div className="absolute left-0 top-[35px] sm:top-[44px] z-10 w-[210px] sm:w-[232px] rounded-[16px] bg-[#003BE2] p-4 text-white shadow-[0_12px_28px_rgba(0,59,226,0.35)]">
      <div className="flex flex-col">
        <span
          className="text-[16px] font-medium leading-[19px] text-[#F5F5F6]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Total Revenue
        </span>
        <span
          className="mt-0.5 text-[10px] text-[#F5F5F6]/80 leading-[12px]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          July 1-28
        </span>
      </div>
      <p
        className="mt-2 text-[24px] font-semibold leading-[32px] tracking-[-0.01em] text-[#F5F5F6]"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        $120.29
      </p>
      <div className="mt-2 h-2 w-[200px] max-w-full rounded-[24px] bg-white">
        <div className="h-full w-[56%] rounded-[24px] bg-[#D4FB20]" />
      </div>
    </div>
  );
}

/** Year to Date Card (Figma: left 0, top 180px, width 148px) */
function YearToDateCard() {
  return (
    <div className="absolute left-0 top-[170px] sm:top-[180px] z-10 w-[148px] rounded-[16px] bg-[#003BE2] p-4 text-white shadow-[0_14px_30px_rgba(0,59,226,0.4)]">
      <div className="flex flex-col">
        <span
          className="text-[16px] font-medium leading-[19px] text-[#F5F5F6]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Year to Date
        </span>
        <span
          className="mt-0.5 text-[10px] text-[#F5F5F6]/80 leading-[12px]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          2023
        </span>
      </div>
      <p
        className="mt-2 text-[24px] font-semibold leading-[32px] tracking-[-0.01em] text-[#F5F5F6]"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        $1,200.38
      </p>
      <span
        className="mt-2 inline-block rounded-[24px] bg-[#CBFC01] px-2.5 py-0.5 text-[10px] font-medium text-[#242528] leading-[20px]"
        style={{ fontFamily: "var(--font-body)" }}
      >
        +12$
      </span>
    </div>
  );
}

/** Happy Students Card (Figma: left 283px, positioned higher behind the doodle) */
function FigmaHappyStudentsCard() {
  return (
    <div className="absolute right-0 sm:left-[265px] bottom-[70px] sm:bottom-auto sm:top-[310px] z-30 w-[240px] sm:w-[258px] rounded-[16px] bg-white/95 backdrop-blur-[10px] p-4 shadow-[0_12px_28px_rgba(0,20,120,0.12)]">
      <p
        className="text-[16px] font-medium leading-[24px] text-[#242528]"
        style={{ fontFamily: "var(--font-body)" }}
      >
        Happy Students
      </p>
      <div className="mt-0.5 flex items-center gap-1.5">
        <span
          className="text-[10px] font-bold leading-[15px] text-[#242528]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          4.5 (240)
        </span>
        <svg width={16} height={16} viewBox="0 0 24 24" fill="#D4FB20">
          <polygon points="12,2 15.1,8.3 22,9.3 17,14.1 18.2,21 12,17.8 5.8,21 7,14.1 2,9.3 8.9,8.3" />
        </svg>
      </div>
      <div className="mt-2.5 flex items-center">
        {[1, 2, 3, 1, 2].map((n, i) => (
          <div
            key={i}
            className="relative h-[38px] w-[38px] overflow-hidden rounded-full border-2 border-white"
            style={{ marginLeft: i > 0 ? -12 : 0, zIndex: 10 - i }}
          >
            <Image
              src={`/images/avatars/avatar-${n}.png`}
              alt=""
              width={38}
              height={38}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
        <div
          className="relative flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#D4FB20]"
          style={{ marginLeft: -12, zIndex: 0 }}
        >
          <span
            className="text-[12px] font-bold text-[#242528]"
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
   CHECKLIST ITEMS DATA
   ══════════════════════════════════════════════════════════ */
const CHECKLIST_ITEMS = [
  "Share Your Expertise",
  "Monetize Your Passion",
  "Flexibility and Autonomy",
  "Build a Community",
];

/* ══════════════════════════════════════════════════════════
   MAIN COMPONENT: ProfessionalGrowth
   ══════════════════════════════════════════════════════════ */

export function ProfessionalGrowth() {
  return (
    <section className="relative overflow-hidden bg-[#FAFAFA] py-16 sm:py-24 lg:py-[100px]">
      {/* ══════════════════════════════════════════════════════
          FIGMA GRADIENT BLURS (Exact Ellipses from Frame 15)
          ══════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Ellipse 11: Top-Left Lime */}
        <div
          className="absolute rounded-full"
          style={{
            width: 1137,
            height: 1137,
            left: "calc(50% - 720px - 152px)",
            top: -466,
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(203, 252, 1, 0.4) 0%, rgba(203, 252, 1, 0.092) 53%, rgba(203, 252, 1, 0.024) 75%, rgba(203, 252, 1, 0) 100%)",
            filter: "blur(20px)",
          }}
        />

        {/* Ellipse 10: Top-Right Blue */}
        <div
          className="absolute rounded-full"
          style={{
            width: 1137,
            height: 1137,
            left: "calc(50% - 720px + 811px)",
            top: -458,
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(0, 59, 226, 0.08) 0%, rgba(0, 59, 226, 0.0184) 53%, rgba(0, 59, 226, 0.0048) 75%, rgba(0, 59, 226, 0) 100%)",
            filter: "blur(20px)",
          }}
        />

        {/* Ellipse 9: Mid-Left Blue */}
        <div
          className="absolute rounded-full"
          style={{
            width: 1137,
            height: 1137,
            left: "calc(50% - 720px - 471px)",
            top: 173.5,
            background:
              "radial-gradient(50% 50% at 46.75% 50.84%, rgba(0, 59, 226, 0.16) 0%, rgba(0, 59, 226, 0.0368) 53%, rgba(0, 59, 226, 0.0096) 75%, rgba(0, 59, 226, 0) 100%)",
            filter: "blur(20px)",
          }}
        />

        {/* Ellipse 8: Bottom-Right Blue */}
        <div
          className="absolute rounded-full"
          style={{
            width: 1137,
            height: 1137,
            left: "calc(50% - 720px + 722px)",
            top: 788,
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(0, 59, 226, 0.24) 0%, rgba(0, 59, 226, 0.0552) 53%, rgba(0, 59, 226, 0.0144) 75%, rgba(0, 59, 226, 0) 100%)",
            filter: "blur(20px)",
          }}
        />

        {/* Ellipse 12: Bottom-Left Lime */}
        <div
          className="absolute rounded-full"
          style={{
            width: 672,
            height: 672,
            left: "calc(50% - 720px - 287px)",
            top: 946,
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(203, 252, 1, 0.6) 0%, rgba(203, 252, 1, 0.138) 53%, rgba(203, 252, 1, 0.036) 75%, rgba(203, 252, 1, 0) 100%)",
            filter: "blur(20px)",
          }}
        />
      </div>

      {/* ══════════════════════════════════════════════════════
          FRAME 16 (Inner Content: max-w-[1258px], gap: 72px)
          ══════════════════════════════════════════════════════ */}
      <div className="relative mx-auto w-full max-w-[1258px] px-4 sm:px-6">
        <div className="flex flex-col gap-16 lg:gap-[72px]">
          {/* ══════════════════════════════════════════════════
              SUB-BLOCK A: Frame 13 (gap: 63px)
              ══════════════════════════════════════════════════ */}
          <div className="grid grid-cols-1 lg:grid-cols-[574px_1fr] gap-10 lg:gap-[63px] items-center">
            {/* Left column: Text & Stats (Figma: width 574px) */}
            <div className="order-2 lg:order-1 max-w-[577px]">
              <Reveal>
                <h2
                  className="text-[32px] sm:text-[40px] lg:text-[44px] font-semibold leading-[1.2] tracking-[-0.01em] text-[#242528]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Your Path to Professional Growth Starts Here!
                </h2>

                <p
                  className="mt-6 sm:mt-8 text-[16px] sm:text-[18px] leading-[1.6] text-[#4B4C53] max-w-[477px]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Explore our curated selection of courses tailored to enhance
                  your capabilities and accelerate your career journey. Whether
                  you are looking to sharpen specific skills, gain industry
                  expertise, or embark on a new career path entirely, we have the
                  resources you need.
                </p>
              </Reveal>

              {/* Stats Row (Figma: gap 56px, numbers 36px #003BE2, labels 18px #4B4C53) */}
              <div className="mt-8 sm:mt-10 flex items-end gap-8 sm:gap-[56px]">
                <div className="flex flex-col">
                  <span
                    className="text-[32px] sm:text-[36px] font-medium leading-[44px] tracking-[-0.01em] text-[#003BE2]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    <CountUp target={12} suffix="K" />
                  </span>
                  <span
                    className="text-[16px] sm:text-[18px] leading-[29px] text-[#4B4C53]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Students
                  </span>
                </div>

                <div className="flex flex-col">
                  <span
                    className="text-[32px] sm:text-[36px] font-medium leading-[44px] tracking-[-0.01em] text-[#003BE2]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    <CountUp target={70} suffix="+" />
                  </span>
                  <span
                    className="text-[16px] sm:text-[18px] leading-[29px] text-[#4B4C53]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Courses
                  </span>
                </div>

                <div className="flex flex-col">
                  <span
                    className="text-[32px] sm:text-[36px] font-medium leading-[44px] tracking-[-0.01em] text-[#003BE2]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    <CountUp target={16} />
                  </span>
                  <span
                    className="text-[16px] sm:text-[18px] leading-[29px] text-[#4B4C53]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Creators
                  </span>
                </div>
              </div>
            </div>

            {/* Right column: Frame 11 (Figma: width 621px, height 552px) */}
            <div className="order-1 lg:order-2 flex items-center justify-center w-full">
              <div className="relative w-full max-w-[621px] h-[450px] sm:h-[552px] scale-[0.84] xs:scale-[0.92] sm:scale-100 origin-center">
                {/* Course Card peeking behind person (left 0, top 0) */}
                <CourseCardPeek />

                {/* Main Person Image (left 0, top 12px, width 577px, height 540px) */}
                <div
                  className="absolute left-3 sm:left-5 top-3 z-20 w-[490px] sm:w-[577px] pointer-events-none"
                  style={{
                    filter:
                      "drop-shadow(30px 45px 45px rgba(0, 0, 0, 0.12)) drop-shadow(15px 22px 22px rgba(0, 0, 0, 0.08)) drop-shadow(5px 8px 10px rgba(0, 0, 0, 0.05))",
                  }}
                >
                  <Image
                    src="/images/professional-growth/growth-person.png"
                    alt="Professional growth student holding laptop"
                    width={577}
                    height={540}
                    priority
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Lime zigzag-coil doodle on TOP layer overlapping everything */}
                <div className="absolute right-2 sm:left-[415px] top-[40px] sm:top-[67px] z-40 w-[120px] sm:w-[140px] h-[160px] sm:h-[190px] rotate-[18deg] pointer-events-none select-none">
                  <GrowthCoilSVG id="growth-coil-a" />
                </div>

                {/* Learning Progress Card (left 345px, top 213px) */}
                <LearningProgressCard />
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════
              SUB-BLOCK B: Frame 14 (gap: 79px)
              ══════════════════════════════════════════════════ */}
          <div className="grid grid-cols-1 lg:grid-cols-[541px_1fr] gap-10 lg:gap-[79px] items-center">
            {/* Left column: Frame 12 (Figma: width 541px, height 596px) */}
            <div className="order-1 flex items-center justify-center w-full">
              <div className="relative w-full max-w-[541px] h-[500px] sm:h-[610px] scale-[0.84] xs:scale-[0.92] sm:scale-100 origin-center">
                {/* Total Revenue Card (left 0, top 44px) */}
                <TotalRevenueCard />

                {/* Year to Date Card (left 0, top 180px) */}
                <YearToDateCard />

                {/* Main Creator Woman Image (shifted left to overlap revenue cards) */}
                <div
                  className="absolute -left-6 sm:-left-12 top-3 z-20 w-[490px] sm:w-[577px] pointer-events-none"
                  style={{
                    filter:
                      "drop-shadow(30px 45px 45px rgba(0, 0, 0, 0.12)) drop-shadow(15px 22px 22px rgba(0, 0, 0, 0.08)) drop-shadow(5px 8px 10px rgba(0, 0, 0, 0.05))",
                  }}
                >
                  <Image
                    src="/images/professional-growth/creator-woman.png"
                    alt="Course creator woman holding tablet"
                    width={500}
                    height={685}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Lime zigzag-coil doodle on TOP layer overlapping woman */}
                <div className="absolute right-0 sm:left-[325px] top-[140px] sm:top-[160px] z-40 w-[125px] sm:w-[145px] h-[165px] sm:h-[195px] -rotate-[22deg] pointer-events-none select-none">
                  <GrowthCoilSVG id="growth-coil-b" />
                </div>

                {/* Happy Students Card (positioned higher behind the doodle) */}
                <FigmaHappyStudentsCard />
              </div>
            </div>

            {/* Right column: Text & Checklist (Figma: width 580px) */}
            <div className="order-2 max-w-[580px]">
              <Reveal>
                <h2
                  className="text-[32px] sm:text-[40px] lg:text-[44px] font-semibold leading-[1.2] tracking-[-0.01em] text-[#242528] max-w-[391px]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Create &amp; Manage Courses Easily.
                </h2>

                <p
                  className="mt-6 sm:mt-8 text-[16px] sm:text-[18px] leading-[28px] font-bold text-[#242528] max-w-[574px]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  ByteSpace supports individuals or entities in the creation,
                  publication, and administration of educational courses.
                </p>
              </Reveal>

              {/* Checklist (Figma: gap 16px, icon 24px #003BE2, text 18px #242528) */}
              <ul className="mt-7 flex flex-col gap-4">
                {CHECKLIST_ITEMS.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#003BE2]">
                      <Check size={14} strokeWidth={3} className="text-white" />
                    </div>
                    <span
                      className="text-[16px] sm:text-[18px] font-medium leading-[22px] text-[#242528]"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
