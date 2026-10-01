import type { CourseDetail, CourseModule } from "@/data/courses-detail";
import { LearningProgressCard } from "@/components/ui/LearningProgressCard";

interface LessonsTabProps {
  course: CourseDetail;
}

/**
 * Filled video camera glyph matching the reference's solid camera icon
 */
function CameraIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-ink shrink-0"
      aria-hidden="true"
    >
      <rect x="2" y="6" width="13" height="12" rx="2.5" fill="currentColor" />
      <path
        d="M17 14.25L21.2 17.4C21.6 17.7 22 17.45 22 17V7C22 6.55 21.6 6.3 21.2 6.6L17 9.75V14.25Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Single module row subcomponent
 */
function ModuleRow({ module }: { module: CourseModule }) {
  return (
    <div className="flex items-start gap-5">
      {/* Lime filled rounded-square icon tile (~64px, radius ~16px) */}
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[16px] bg-lime shadow-xs">
        <CameraIcon />
      </div>

      {/* Module info */}
      <div className="flex-1 min-w-0">
        <h3
          className="text-[17px] font-semibold text-ink leading-tight"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Module {module.number}: {module.title}
        </h3>
        <p
          className="mt-1 text-[15px] leading-[1.5] text-muted max-w-[700px]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {module.description}
        </p>
      </div>
    </div>
  );
}

export function LessonsTab({ course }: LessonsTabProps) {
  return (
    <div className="w-full">
      {/* ── 1. Explore the Modules Heading ── */}
      <h2
        className="text-[22px] font-bold text-ink leading-tight mb-2.5"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Explore the Modules
      </h2>

      {/* ── 2. Paragraph below ── */}
      <p
        className="text-[15px] sm:text-[16px] leading-[1.6] text-muted mb-8 max-w-[720px]"
        style={{ fontFamily: "var(--font-body)" }}
      >
        Immerse yourself in the course content as we break down each module into
        comprehensive lessons, providing practical insights and hands-on
        experiences.
      </p>

      {/* ── 3. Lesson List Heading ── */}
      <h3
        className="text-[22px] font-bold text-ink leading-tight mb-5"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Lesson List
      </h3>

      {/* ── 4. Module List (Vertical Stack) ── */}
      {/* NOTE: source design skips from Module 2 to Module 4 — no Module 3 exists in the Figma file. */}
      {/* Confirm with design whether this is intentional before launch. */}
      <div className="flex flex-col gap-6">
        {course.modules.map((mod) => (
          <ModuleRow key={mod.number} module={mod} />
        ))}
      </div>

      {/* ── 5. Lesson Content Heading ── */}
      <h3
        className="mt-10 text-[22px] font-bold text-ink leading-tight mb-2.5"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Lesson Content
      </h3>

      {/* ── 6. Paragraph below ── */}
      <p
        className="text-[15px] sm:text-[16px] leading-[1.6] text-muted mb-8 max-w-[720px]"
        style={{ fontFamily: "var(--font-body)" }}
      >
        Engage with each lesson through captivating video content, detailed
        textual explanations, and interactive elements. Download resources,
        complete assignments, and test your understanding with quizzes.
      </p>

      {/* ── 7. Lesson Progress Tracking Heading ── */}
      <h3
        className="mt-2 text-[22px] font-bold text-ink leading-tight mb-2.5"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Lesson Progress Tracking
      </h3>

      {/* ── 8. Paragraph below ── */}
      <p
        className="text-[15px] sm:text-[16px] leading-[1.6] text-muted mb-6 max-w-[720px]"
        style={{ fontFamily: "var(--font-body)" }}
      >
        Witness your growth as you complete lessons, with an intuitive progress
        tracking feature guiding you through your learning journey.
      </p>

      {/* ── 9. Learning Progress Card (Max width ~720px) ── */}
      <div className="max-w-[720px]">
        <LearningProgressCard value={course.learningProgress} />
      </div>
    </div>
  );
}
