"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Share2,
  BarChart2,
  Star,
  Users,
  Play,
  Check,
} from "lucide-react";
import type { CourseDetail } from "@/data/courses-detail";
import { getCreatorHref } from "@/data/creators";
import { Navbar } from "@/components/ui/Navbar";
import { GridBackground } from "@/components/ui/GridBackground";
import { Button } from "@/components/ui/Button";

/* ── Small Reusable InfoBadge Component ── */
interface InfoBadgeProps {
  icon: React.ReactNode;
  children: React.ReactNode;
}

export function InfoBadge({ icon, children }: InfoBadgeProps) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full bg-white px-[18px] py-[10px] text-[15px] font-medium text-ink shadow-sm"
      style={{ fontFamily: "var(--font-body)" }}
    >
      <span className="flex shrink-0 items-center justify-center">{icon}</span>
      <span>{children}</span>
    </div>
  );
}

/* ── CourseHero Props ── */
interface CourseHeroProps {
  course: CourseDetail;
}

export function CourseHero({ course }: CourseHeroProps) {
  const [copied, setCopied] = useState(false);

  /* ── Share handler with navigator.share and clipboard fallback ── */
  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: course.title,
          url,
        });
        return;
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
      }
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      } catch {
        // Fallback if clipboard permission is denied
      }
    }
  };

  return (
    <section className="relative overflow-hidden bg-brand-blue pb-10 lg:pb-12">
      {/* ── Reused Faint Grid Background ── */}
      <GridBackground />

      {/* ── Shared Navbar (exact same component, automatically highlights 'Courses') ── */}
      <div className="relative z-20 mx-auto max-w-[1440px]">
        <Navbar variant="light" />
      </div>

      {/* ── Main Content Container (Aligned with Navbar) ── */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-[60px] pt-10 sm:pt-14">
        {/* ── Top Row: Title block left, Share button right (~56px below navbar) ── */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          {/* Left: Title + Subtitle + Byline */}
          <div className="max-w-[760px]">
            {/* H1 */}
            <h1
              className="text-white text-[28px] sm:text-[32px] md:text-[34px] font-bold leading-tight tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {course.title}
            </h1>

            {/* Subtitle */}
            <p
              className="mt-[6px] text-white text-[16px] sm:text-[17px] font-medium leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {course.subtitle}
            </p>

            {/* Byline */}
            <p
              className="mt-[14px] text-[16px] text-white/80 font-medium"
              style={{ fontFamily: "var(--font-body)" }}
            >
              by{" "}
              <Link
                href={getCreatorHref(course.creatorName)}
                className="text-lime hover:underline transition-opacity"
                style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
              >
                {course.creatorName}
              </Link>
            </p>
          </div>

          {/* Right: Small Lime Pill Share Button */}
          <div className="relative shrink-0 sm:pt-1">
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={handleShare}
              className="gap-2 px-5 py-2.5 text-[15px] font-medium text-ink shadow-sm"
              aria-label="Share this course"
            >
              {copied ? (
                <>
                  <Check size={16} className="text-ink stroke-[2.5]" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Share2 size={16} className="text-ink stroke-[2.2]" />
                  <span>Share</span>
                </>
              )}
            </Button>

            {/* Confirmation toast */}
            {copied && (
              <div
                role="status"
                className="absolute top-full mt-2 right-0 z-30 rounded-lg bg-ink/95 px-3 py-1.5 text-xs font-medium text-white shadow-xl whitespace-nowrap animate-in fade-in zoom-in-95 duration-150"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Link copied to clipboard!
              </div>
            )}
          </div>
        </div>

        {/* ── Info Badges Row (margin-top ~28px, flex gap ~14px) ── */}
        <div className="mt-[28px] flex flex-wrap items-center gap-[14px]">
          {/* 1. Level */}
          <InfoBadge
            icon={<BarChart2 size={16} className="text-brand-blue stroke-[2.2]" />}
          >
            {course.level}
          </InfoBadge>

          {/* 2. Rating & Review Count */}
          <InfoBadge
            icon={<Star size={16} fill="#CCFF00" stroke="#CCFF00" className="shrink-0" />}
          >
            {course.rating} ({course.reviewCount} reviews)
          </InfoBadge>

          {/* 3. Student Count */}
          <InfoBadge
            icon={<Users size={16} className="text-brand-blue stroke-[2.2]" />}
          >
            {course.studentCount} Students
          </InfoBadge>
        </div>

        {/* ── Video Thumbnail (margin-top ~40px) ── */}
        <div className="mt-[40px] relative aspect-[16/10] w-full max-w-[720px] overflow-hidden rounded-[20px] shadow-2xl bg-slate-900">
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 720px"
            className="object-cover"
          />

          {/* Centered Squircle Play Button (~72px, radius ~16px, dark semi-transparent) */}
          <button
            type="button"
            onClick={() => {
              // TODO: wire up real video player when video asset exists
            }}
            aria-label="Play course preview video"
            className="group/play absolute inset-0 m-auto flex h-[72px] w-[72px] items-center justify-center rounded-[16px] bg-[#3C3746]/55 backdrop-blur-[2px] transition-all duration-200 hover:scale-105 hover:bg-[#3C3746]/75 cursor-pointer shadow-lg"
          >
            <Play
              size={28}
              className="fill-white text-white translate-x-[2px] transition-transform duration-200 group-hover/play:scale-110"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
