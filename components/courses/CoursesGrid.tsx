"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, SearchX } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { RevealGroup } from "@/components/ui";
import { CourseCard } from "@/components/home/CourseCard";
import { useCoursesFilter } from "@/context/CoursesFilterContext";
import { MOCK_ALL_COURSES } from "@/lib/courses-data";

const PAGE_SIZE = 18;

export function CoursesGrid() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlQ = searchParams.get("q")?.trim() ?? "";

  const {
    searchQuery,
    setSearchQuery,
    searchScope,
    category,
    level,
    sort,
    priceRange,
    minRating,
    resetFilters,
  } = useCoursesFilter();

  const [currentPage, setCurrentPage] = useState(1);
  const gridTopRef = useRef<HTMLDivElement>(null);

  // Active search query combines URL search param and context state
  const activeQuery = urlQ || searchQuery.trim();

  // Reset to page 1 whenever any filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeQuery, searchScope, category, level, sort, priceRange, minRating]);

  // Combined filtering: search query + category pill + level + price + rating
  const filteredCourses = useMemo(() => {
    let result = [...MOCK_ALL_COURSES];

    // 1. Query filter (case-insensitive substring match against title & byline)
    if (activeQuery) {
      const q = activeQuery.toLowerCase();
      result = result.filter((c) => {
        const titleMatch =
          c.fullTitle.toLowerCase().includes(q) ||
          c.title.toLowerCase().includes(q);
        const creatorMatch = c.byline.toLowerCase().includes(q);

        if (searchScope === "Courses") {
          return titleMatch;
        } else if (searchScope === "Creators") {
          return creatorMatch;
        } else {
          return titleMatch || creatorMatch;
        }
      });
    }

    // 2. Category pill filter
    if (category && category !== "Featured" && category !== "All") {
      result = result.filter(
        (c) =>
          c.category.toLowerCase() === category.toLowerCase() ||
          c.fullTitle.toLowerCase().includes(category.toLowerCase())
      );
    }

    // 3. Difficulty Level filter
    if (level && level !== "All Levels") {
      result = result.filter(
        (c) => c.level.toLowerCase() === level.toLowerCase()
      );
    }

    // 4. Rating filter
    if (minRating > 0) {
      result = result.filter((c) => c.rating >= minRating);
    }

    // 5. Price filter
    const maxP = priceRange[1];
    if (maxP < 200) {
      result = result.filter((c) => {
        const num = parseInt(c.price.replace(/[^0-9]/g, ""), 10);
        return isNaN(num) || num <= maxP;
      });
    }

    // 6. Sort
    if (sort === "Newest") {
      result.reverse();
    } else if (sort === "Price: Low to High") {
      result.sort((a, b) => {
        const pA = parseInt(a.price.replace(/[^0-9]/g, ""), 10) || 0;
        const pB = parseInt(b.price.replace(/[^0-9]/g, ""), 10) || 0;
        return pA - pB;
      });
    } else if (sort === "Price: High to Low") {
      result.sort((a, b) => {
        const pA = parseInt(a.price.replace(/[^0-9]/g, ""), 10) || 0;
        const pB = parseInt(b.price.replace(/[^0-9]/g, ""), 10) || 0;
        return pB - pA;
      });
    }

    return result;
  }, [activeQuery, searchScope, category, level, sort, priceRange, minRating]);

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / PAGE_SIZE));
  const currentCourses = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredCourses.slice(start, start + PAGE_SIZE);
  }, [filteredCourses, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
      gridTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Reset all filters action
  const handleClearAllFilters = () => {
    resetFilters();
    setSearchQuery("");
    router.replace("/courses");
  };

  // Generate page numbers array (up to 5 pages)
  const pageNumbers = useMemo(() => {
    const count = Math.min(5, totalPages);
    return Array.from({ length: count }, (_, i) => i + 1);
  }, [totalPages]);

  return (
    <section id="courses-grid" className="bg-white pb-20 pt-8" ref={gridTopRef}>
      <Container>
        {/* ══════════════════════════════════════════════════
            COURSE CARD GRID (18 cards per page) OR EMPTY STATE
            ══════════════════════════════════════════════════ */}
        {filteredCourses.length > 0 ? (
          <>
            <RevealGroup
              resetKey={currentPage}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {currentCourses.map((course, idx) => (
                <CourseCard
                  key={course.id || `${course.slug}-${idx}`}
                  course={course}
                />
              ))}
            </RevealGroup>

            {/* ══════════════════════════════════════════════════
                PAGINATION COMPONENT
                ══════════════════════════════════════════════════ */}
            {totalPages > 1 && (
              <nav
                aria-label="Course pagination"
                className="mt-12 flex items-center justify-center gap-2"
              >
                {/* Previous Page Arrow */}
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-card-border bg-white text-ink transition-all hover:bg-[#F3F4F6] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white"
                >
                  <ChevronLeft size={18} />
                </button>

                {/* Page Number Buttons */}
                {pageNumbers.map((pageNum) => {
                  const isActive = pageNum === currentPage;
                  return (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => handlePageChange(pageNum)}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-[15px] transition-all ${
                        isActive
                          ? "bg-lime font-semibold text-ink shadow-[0_2px_8px_rgba(204,255,0,0.3)]"
                          : "text-ink hover:bg-[#F3F4F6]"
                      }`}
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                {/* Next Page Arrow */}
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-card-border bg-white text-ink transition-all hover:bg-[#F3F4F6] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white"
                >
                  <ChevronRight size={18} />
                </button>
              </nav>
            )}
          </>
        ) : (
          /* ══════════════════════════════════════════════════
              EMPTY STATE (~80px padding-y, centered, pagination hidden)
              ══════════════════════════════════════════════════ */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            {/* Simple muted icon (~48px) */}
            <div className="flex items-center justify-center text-muted/70">
              <SearchX size={48} strokeWidth={1.5} />
            </div>

            {/* Heading */}
            <h2
              className="mt-4 text-[20px] font-semibold text-ink"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {activeQuery
                ? `No courses found for "${activeQuery}"`
                : "No courses match these filters"}
            </h2>

            {/* Subtext */}
            <p
              className="mt-2 text-[14px] text-muted max-w-[420px]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Try a different search term or clear your filters.
            </p>

            {/* Clear all filters Button */}
            <Button
              variant="outline"
              onClick={handleClearAllFilters}
              className="mt-5 px-6 py-2.5 text-[14px]"
            >
              Clear all filters
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}
