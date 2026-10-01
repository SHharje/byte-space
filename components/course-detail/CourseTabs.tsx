"use client";

import { useState } from "react";
import type { CourseDetail } from "@/data/courses-detail";
import { Pill } from "@/components/ui/Pill";
import { AboutTab } from "./tabs/AboutTab";
import { LessonsTab } from "./tabs/LessonsTab";
import { ReviewsTab } from "./tabs/ReviewsTab";

interface CourseTabsProps {
  course: CourseDetail;
}

export type CourseTabType = "About" | "Lessons" | "Reviews";

const TABS: CourseTabType[] = ["About", "Lessons", "Reviews"];

export function CourseTabs({ course }: CourseTabsProps) {
  // Local state for smooth, instant tab switching with no page navigation overhead
  const [activeTab, setActiveTab] = useState<CourseTabType>("About");

  return (
    <div className="w-full">
      {/* ── Tab Pills Row (sitting in the left column, gap ~12px) ── */}
      <div className="flex flex-wrap items-center gap-3">
        {TABS.map((tab) => (
          <Pill
            key={tab}
            active={activeTab === tab}
            onClick={() => setActiveTab(tab)}
            className="px-5 py-2 text-[14px] font-medium"
          >
            {tab}
          </Pill>
        ))}
      </div>

      {/* ── Active Tab Content ── */}
      <div className="mt-8 sm:mt-10">
        {activeTab === "About" && <AboutTab course={course} />}
        {activeTab === "Lessons" && <LessonsTab course={course} />}
        {activeTab === "Reviews" && <ReviewsTab course={course} />}
      </div>
    </div>
  );
}
