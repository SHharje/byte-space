import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Footer } from "@/components/home/Footer";
import { CreatorHero } from "@/components/creator/CreatorHero";
import { FilterSortRow } from "@/components/courses/CoursesToolbar";
import { CreatorCoursesGrid } from "@/components/creator/CreatorCoursesGrid";
import { CoursesFilterProvider } from "@/context/CoursesFilterContext";
import { getCreatorBySlug } from "@/data/creators";

interface CreatorPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return [{ slug: "purepearl-studio" }];
}

export default async function CreatorDetailPage({ params }: CreatorPageProps) {
  const { slug } = await params;
  const creator = getCreatorBySlug(slug);

  if (!creator) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      {/* ── 1. Creator Hero (includes light Navbar and GridBackground) ── */}
      <CreatorHero creator={creator} />

      {/* ── 2. Courses Filter & 6-Course Grid ── */}
      {/* NOTE: Since this one creator (PurePearl Studio) made every existing course,
          this grid currently renders the 6 base courses without pagination.
          Once multiple creators exist, filter the course list by creatorSlug instead. */}
      <Suspense fallback={<div className="h-[220px] bg-white" />}>
        <CoursesFilterProvider>
          {/* Filter/Level/Category (left) + Most relevant sort (right) */}
          <FilterSortRow className="pt-10 pb-0" />

          {/* 6 Course cards in responsive grid (1/2/3 columns, gap ~24px) */}
          <CreatorCoursesGrid />
        </CoursesFilterProvider>
      </Suspense>

      {/* ── 3. Footer ── */}
      <Footer />
    </main>
  );
}
