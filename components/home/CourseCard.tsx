import Image from "next/image";
import Link from "next/link";
import { BarChart3, Star } from "lucide-react";
import { getCreatorHref } from "@/data/creators";

/* ── Types ── */
export interface CourseCardData {
  id?: string;
  image: string;
  title: string;
  fullTitle: string;
  rating: number;
  byline: string;
  level: string;
  price: string;
  period: string;
  lessons: string;
  duration: string;
  comments: string;
  students: string;
  category: string;
  slug: string;
}

/* ── Component ── */
export function CourseCard({
  course,
  className = "",
}: {
  course: CourseCardData;
  className?: string;
}) {
  return (
    <div
      className={`group relative block rounded-2xl border border-card-border bg-white overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${className}`}
    >
      {/* Primary card link spanning entire card */}
      <Link
        href={`/courses/${course.slug}`}
        className="absolute inset-0 z-0"
        aria-label={course.fullTitle}
      />

      {/* ── Thumbnail ── */}
      <div className="relative aspect-[16/11] overflow-hidden pointer-events-none">
        <Image
          src={course.image}
          alt={course.fullTitle}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
          className="object-cover"
        />

        {/* Overlay chips — bottom-left */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
          {[course.lessons, course.duration, course.comments].map((text) => (
            <span
              key={text}
              className="rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white whitespace-nowrap"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="px-4 pt-4 pb-4">
        {/* Title + Rating */}
        <div className="flex items-start justify-between gap-3">
          <h3
            className="text-[17px] font-semibold leading-snug text-ink line-clamp-1"
            style={{ fontFamily: "var(--font-heading)" }}
            title={course.fullTitle}
          >
            {course.fullTitle}
          </h3>
          <span
            className="flex shrink-0 items-center gap-1 text-[14px] text-muted"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {course.rating}
            <Star size={14} fill="#CCFF00" stroke="#CCFF00" className="text-lime" />
          </span>
        </div>

        {/* Byline with accessible Creator link */}
        <p
          className="relative z-10 mt-0.5 text-[13px] text-muted pointer-events-none"
          style={{ fontFamily: "var(--font-body)" }}
        >
          by{" "}
          <Link
            href={getCreatorHref(course.byline)}
            className="pointer-events-auto text-[#3B82F6] hover:underline"
          >
            {course.byline}
          </Link>
        </p>

        {/* Meta row: Beginner + Avatars + student count */}
        <div className="mt-3 flex items-center justify-between pointer-events-none">
          {/* Level pill */}
          <span
            className="inline-flex items-center gap-1 rounded-full bg-[#F3F4F6] px-2.5 py-1 text-[12px] font-medium text-muted"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <BarChart3 size={12} strokeWidth={2.5} />
            {course.level}
          </span>

          {/* Avatars + count */}
          <div className="flex items-center">
            {["/images/avatars/avatar-1.png", "/images/avatars/avatar-2.png", "/images/avatars/avatar-3.png"].map(
              (src, i) => (
                <div
                  key={src}
                  className="relative h-[24px] w-[24px] rounded-full border-2 border-white overflow-hidden"
                  style={{ marginLeft: i === 0 ? 0 : -6 }}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="24px"
                    className="object-cover"
                  />
                </div>
              )
            )}
            <span
              className="ml-1 flex h-[24px] w-auto min-w-[24px] items-center justify-center rounded-full bg-lime px-1.5 text-[10px] font-bold text-ink"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {course.students}
            </span>
          </div>
        </div>

        {/* Price row */}
        <div className="mt-3 flex items-baseline pointer-events-none">
          <span
            className="text-[18px] font-bold text-[#3B82F6]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {course.price}
          </span>
          <span
            className="ml-0.5 text-[13px] text-muted"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {course.period}
          </span>
        </div>
      </div>
    </div>
  );
}
