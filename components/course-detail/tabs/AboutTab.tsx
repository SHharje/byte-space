import Image from "next/image";
import { Check } from "lucide-react";
import type { CourseDetail } from "@/data/courses-detail";

interface AboutTabProps {
  course: CourseDetail;
}

export function AboutTab({ course }: AboutTabProps) {
  return (
    <div className="w-full">
      {/* ── Description Heading ── */}
      <h2
        className="text-[22px] font-bold text-ink leading-tight mb-4"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Description
      </h2>

      {/* ── Description Paragraphs ── */}
      <div className="space-y-5">
        {course.description.map((paragraph, idx) => (
          <p
            key={idx}
            className="text-[15px] sm:text-[16px] leading-[1.6] text-[#374151] font-normal"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {paragraph}
          </p>
        ))}
      </div>

      {/* ── Sneak Peak Heading ── */}
      <h3
        className="mt-8 text-[22px] font-bold text-ink leading-tight mb-5"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Sneak Peak
      </h3>

      {/* ── Sneak Peak Image Grid ── */}
      {/* Note: /images/courses/course-1.jpg through course-4.jpg are placeholders until dedicated photography is added */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {course.sneakPeek.map((src, idx) => (
          <div
            key={idx}
            className="relative aspect-square overflow-hidden rounded-[12px] border border-card-border/80 bg-slate-100 shadow-xs"
          >
            <Image
              src={src}
              alt={`Sneak peek preview ${idx + 1}`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 180px"
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* ── Key Points Heading ── */}
      <h3
        className="mt-8 text-[22px] font-bold text-ink leading-tight mb-4"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Key Points
      </h3>

      {/* ── Key Points List ── */}
      <ul className="mt-4 flex flex-col gap-3.5">
        {course.keyPoints.map((point) => (
          <li key={point} className="flex items-center gap-3">
            {/* Blue checkmark circle matching Home page's checklist design */}
            <div className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-brand-blue shadow-xs">
              <Check size={13} strokeWidth={3} className="text-white" />
            </div>
            <span
              className="text-[15px] font-medium text-ink leading-snug"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {point}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
