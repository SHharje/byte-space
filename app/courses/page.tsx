import { Suspense } from "react";
import { CoursesHero } from "@/components/courses/CoursesHero";
import { CoursesToolbar } from "@/components/courses/CoursesToolbar";
import { CoursesGrid } from "@/components/courses/CoursesGrid";
import { Footer } from "@/components/home/Footer";
import { CoursesFilterProvider } from "@/context/CoursesFilterContext";

export const metadata = {
  title: "Courses — ByteSpace",
  description: "Browse and discover top courses on ByteSpace.",
};

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Suspense fallback={<div className="h-[220px] bg-brand-blue" />}>
        <CoursesFilterProvider>
          {/* Section 1: CoursesHero with Search pre-filled from ?q= */}
          <CoursesHero />

          {/* Section 2: CoursesToolbar (filters + category pills + sort) */}
          <CoursesToolbar />

          {/* Section 3: CoursesGrid (card grid + pagination) */}
          <CoursesGrid />
        </CoursesFilterProvider>
      </Suspense>

      {/* Section 4: Existing Footer */}
      <Footer />
    </main>
  );
}
