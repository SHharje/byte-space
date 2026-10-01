"use client";

import { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import type { CourseDetail } from "@/data/courses-detail";
import { Pill } from "@/components/ui/Pill";

interface ReviewsTabProps {
  course: CourseDetail;
}

export function ReviewsTab({ course }: ReviewsTabProps) {
  const [filterRating, setFilterRating] = useState<number | "all">("all");

  // Total breakdown sum to calculate progress widths accurately
  const totalBreakdown =
    Object.values(course.ratingBreakdown).reduce((a, b) => a + b, 0) || 1;

  // Filter individual reviews based on selected rating
  const filteredReviews =
    filterRating === "all"
      ? course.reviews
      : course.reviews.filter((r) => Math.floor(r.rating) === filterRating);

  return (
    <div className="w-full">
      {/* ── 1. Heading ── */}
      <h2
        className="text-[22px] font-bold text-ink leading-tight"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        What Learners Are Saying
      </h2>

      {/* ── Paragraph below ── */}
      <p
        className="mt-2.5 text-[15px] leading-[1.6] text-muted max-w-[750px]"
        style={{ fontFamily: "var(--font-body)" }}
      >
        Discover what our learners have to say about their experience with &lsquo;
        {course.title}.&rsquo; Read reviews and ratings from individuals who have
        embarked on the transformative journey of mastering digital asset
        creation.
      </p>

      {/* ── 2. Ratings Summary Card ── */}
      <div className="mt-6 flex flex-col gap-6 rounded-[16px] border border-card-border bg-white p-6 sm:flex-row sm:items-center max-w-[720px] shadow-xs">
        {/* Left: Lime Square Box (~130x130px, radius ~10px) */}
        <div className="flex h-[130px] w-[130px] shrink-0 flex-col items-center justify-center rounded-[10px] bg-lime shadow-xs">
          <span
            className="text-[14px] font-medium text-ink"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Ratings
          </span>
          <span
            className="mt-1 text-[40px] font-bold leading-none text-ink tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {course.rating}
          </span>
        </div>

        {/* Right: 5 star progress rows (5 down to 1) */}
        <div className="flex flex-1 flex-col gap-2.5">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = course.ratingBreakdown[stars] ?? 0;
            const pct = Math.max(1.5, Math.round((count / totalBreakdown) * 100));

            return (
              <div key={stars} className="flex items-center gap-3">
                {/* Horizontal Progress Track (~200px wide, 6px tall) */}
                <div
                  className="h-1.5 w-[140px] sm:w-[200px] shrink-0 overflow-hidden rounded-full bg-[#EEF0F3]"
                  role="progressbar"
                  aria-valuenow={count}
                  aria-valuemin={0}
                  aria-valuemax={totalBreakdown}
                  aria-label={`${stars} star ratings breakdown: ${count}`}
                >
                  <div
                    className="h-full rounded-full bg-lime transition-all duration-500 ease-out"
                    style={{ width: `${pct}%` }}
                  />
                </div>

                {/* 5 small filled star icons */}
                <div className="flex items-center gap-0.5 shrink-0 text-ink">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      className="fill-ink text-ink stroke-none"
                    />
                  ))}
                </div>

                {/* Raw count */}
                <span
                  className="w-9 text-right text-[14px] font-medium text-ink tabular-nums"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 3. Individual Reviews Header + Filter ── */}
      <div className="mt-8">
        <h3
          className="text-[18px] font-bold text-ink leading-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Individual Reviews:
        </h3>

        {/* Pill filter row */}
        <div className="mt-4 flex flex-wrap items-center gap-2.5">
          <Pill
            active={filterRating === "all"}
            onClick={() => setFilterRating("all")}
            className="px-4 py-1.5 text-[14px]"
          >
            All rating
          </Pill>
          {[5, 4, 3, 2, 1].map((stars) => (
            <Pill
              key={stars}
              active={filterRating === stars}
              onClick={() => setFilterRating(stars)}
              className="px-3.5 py-1.5 text-[14px]"
            >
              <span className="flex items-center gap-1.5">
                <Star size={13} className="fill-current text-current stroke-none" />
                <span>{stars}</span>
              </span>
            </Pill>
          ))}
        </div>
      </div>

      {/* ── 4. Review Cards Stack ── */}
      <div className="mt-5 flex flex-col gap-5 max-w-[720px]">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <div
              key={review.id}
              className="rounded-[14px] border border-card-border bg-white p-6 shadow-xs"
            >
              {/* Top row: Avatar + Name + Role (Left), Date (Right) */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-card-border/80 bg-slate-100">
                    <Image
                      src={review.avatar}
                      alt={review.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4
                      className="text-[16px] font-semibold text-ink leading-tight"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {review.author}
                    </h4>
                    {review.role && (
                      <p
                        className="mt-0.5 text-[14px] text-muted font-normal"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {review.role}
                      </p>
                    )}
                  </div>
                </div>

                {/* Date */}
                <span
                  className="text-[14px] text-muted shrink-0 pt-0.5"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {review.date}
                </span>
              </div>

              {/* 5 star rating row */}
              <div className="mt-3 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < review.rating
                        ? "fill-ink text-ink stroke-none"
                        : "fill-[#E5E7EB] text-[#E5E7EB] stroke-none"
                    }
                  />
                ))}
              </div>

              {/* Quote text */}
              <p
                className="mt-3 text-[15px] leading-[1.6] text-[#374151] font-normal"
                style={{ fontFamily: "var(--font-body)" }}
              >
                &ldquo;{review.comment.replace(/^["“”]|["“”]$/g, "")}&rdquo;
              </p>
            </div>
          ))
        ) : (
          <div className="py-10 text-center">
            <p
              className="text-muted text-[15px]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              No reviews with this rating yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
