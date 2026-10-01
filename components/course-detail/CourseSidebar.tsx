"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FileText,
  Video,
  BadgeCheck,
  MessageCircle,
} from "lucide-react";
import type { CourseDetail } from "@/data/courses-detail";
import { getCreatorHref } from "@/data/creators";
import { Button } from "@/components/ui/Button";

interface CourseSidebarProps {
  course: CourseDetail;
  className?: string;
}

/**
 * Maps the includes item string to the appropriate Lucide icon
 */
function getIncludeIcon(item: string) {
  const lower = item.toLowerCase();
  if (lower.includes("resource") || lower.includes("learning")) {
    return <FileText size={18} className="text-brand-blue shrink-0" />;
  }
  if (lower.includes("video") || lower.includes("lesson")) {
    return <Video size={18} className="text-brand-blue shrink-0" />;
  }
  if (lower.includes("certificate") || lower.includes("completion")) {
    return <BadgeCheck size={18} className="text-brand-blue shrink-0" />;
  }
  if (lower.includes("consultation") || lower.includes("private") || lower.includes("message")) {
    return <MessageCircle size={18} className="text-brand-blue shrink-0" />;
  }
  return <FileText size={18} className="text-brand-blue shrink-0" />;
}

export function CourseSidebar({ course, className = "" }: CourseSidebarProps) {
  const router = useRouter();

  const moreVideosCount = Math.max(
    0,
    course.totalLessons - (course.lessonsPreview?.length ?? 0)
  );

  const handleEnroll = () => {
    // TEMP: "Enroll Now" has no real checkout flow yet. Routing to a nonexistent path so it hits our
    // custom 404 page instead of doing nothing. Replace with the real enrollment route/flow later.
    router.push("/enroll");
  };

  return (
    <aside
      className={`w-full rounded-[16px] border border-card-border bg-white p-7 shadow-sm ${className}`}
      aria-label="Course enrollment and curriculum overview"
    >
      {/* ── Heading: Total Lessons and Hours ── */}
      <h2
        className="text-[18px] font-bold text-ink leading-tight"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {course.totalLessons} Lessons ({course.totalDurationHours} hours)
      </h2>

      {/* ── Lessons Preview List ── */}
      <div className="mt-4 flex flex-col gap-4">
        {course.lessonsPreview.map((lesson, idx) => {
          const indexNum = String(idx + 1).padStart(2, "0");
          return (
            <div
              key={lesson.title}
              className="flex items-start justify-between gap-3 text-sm"
            >
              {/* 2-digit zero-padded index */}
              <span
                className="text-muted text-[14px] font-medium w-6 shrink-0 pt-0.5"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {indexNum}
              </span>

              {/* Lesson title */}
              <span
                className="text-ink text-[14px] sm:text-[15px] font-medium flex-1 pr-2 leading-snug"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {lesson.title}
              </span>

              {/* Duration */}
              <span
                className="text-brand-blue text-[14px] font-medium shrink-0 whitespace-nowrap pt-0.5"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {lesson.duration}
              </span>
            </div>
          );
        })}
      </div>

      {/* ── More videos count ── */}
      <p
        className="mt-3 text-[14px] text-muted font-normal"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {moreVideosCount} more videos
      </p>

      {/* ── Divider ── */}
      <div className="my-5 border-t border-card-border" />

      {/* ── CTA line ── */}
      <p
        className="mb-4 text-[14px] text-muted leading-relaxed"
        style={{ fontFamily: "var(--font-body)" }}
      >
        Ready to Dive In? Enroll Now and Start Building Your Digital Future!
      </p>

      {/* ── Price Row ── */}
      <div className="flex items-baseline">
        <span
          className="text-[32px] font-bold text-brand-blue leading-none tracking-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          ${course.price}
        </span>
        <span
          className="text-[14px] text-muted ml-1 font-normal"
          style={{ fontFamily: "var(--font-body)" }}
        >
          /{course.pricePeriod}
        </span>
      </div>

      {/* ── Enroll Now Button ── */}
      <Button
        type="button"
        variant="primary"
        size="lg"
        onClick={handleEnroll}
        className="mt-4 w-full justify-center text-[15px] font-semibold py-3"
      >
        Enroll Now
      </Button>

      {/* ── "This course include" Heading ── */}
      <h3
        className="mt-7 text-[16px] font-semibold text-ink leading-tight"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        This course include
      </h3>

      {/* ── Includes List ── */}
      <div className="mt-3.5 flex flex-col gap-3">
        {course.includes.map((item) => (
          <div key={item} className="flex items-center gap-3">
            {getIncludeIcon(item)}
            <span
              className="text-[15px] text-ink font-medium leading-snug"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {item}
            </span>
          </div>
        ))}
      </div>

      {/* ── Divider ── */}
      <div className="my-5 border-t border-card-border" />

      {/* ── Creator Row ── */}
      <div className="flex items-center gap-2.5">
        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-card-border bg-slate-100">
          <Image
            src={course.creatorAvatar}
            alt={course.creatorName}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h4
            className="text-[15px] font-semibold text-ink leading-tight"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {course.creatorName}
          </h4>
          <p
            className="text-[13px] text-muted font-normal mt-0.5"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {course.creatorRole}
          </p>
        </div>
      </div>

      {/* ── CTA line again ── */}
      <p
        className="mt-4 text-[14px] text-muted leading-relaxed"
        style={{ fontFamily: "var(--font-body)" }}
      >
        Ready to Dive In? Enroll Now and Start Building Your Digital Future!
      </p>

      {/* ── See Full Profile Button ── */}
      <Link href={getCreatorHref(course.creatorName)} className="mt-3 block w-full">
        <Button
          type="button"
          variant="outline"
          className="w-full justify-center text-[14px] font-medium py-2.5 cursor-pointer"
        >
          See Full Profile
        </Button>
      </Link>
    </aside>
  );
}
