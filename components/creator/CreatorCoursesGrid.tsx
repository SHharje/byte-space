"use client";

import { useMemo } from "react";
import { Container } from "@/components/ui/Container";
import { RevealGroup } from "@/components/ui";
import { CourseCard, type CourseCardData } from "@/components/home/CourseCard";
import { Button } from "@/components/ui/Button";
import { useCoursesFilter } from "@/context/CoursesFilterContext";
import { BASE_COURSES } from "@/lib/courses-data";

interface CreatorCoursesGridProps {
  courses?: CourseCardData[];
}

export function CreatorCoursesGrid({
  courses = BASE_COURSES,
}: CreatorCoursesGridProps) {
  const {
    searchQuery,
    searchScope,
    category,
    level,
    sort,
    priceRange,
    minRating,
    resetFilters,
  } = useCoursesFilter();

  // NOTE: Since this one creator (PurePearl Studio) made every existing course,
  // this grid currently renders the 6 base courses.
  // Once multiple creators exist, this should filter the course list by creatorSlug
  // instead of showing all of them.
  const filteredCourses = useMemo(() => {
    let result = [...courses];

    // 1. Search Query filter (if active in context)
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
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

    // 2. Category Dropdown filter
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
  }, [courses, searchQuery, searchScope, category, level, sort, priceRange, minRating]);

  return (
    <section className="bg-white pb-20 pt-8">
      <Container>
        {filteredCourses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h3
              className="text-xl font-bold text-ink"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              No courses found
            </h3>
            <p
              className="mt-2 text-[15px] text-muted max-w-md"
              style={{ fontFamily: "var(--font-body)" }}
            >
              No courses match your selected filters. Try resetting the filters to view all courses.
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={resetFilters}
              className="mt-6"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id || course.title} course={course} />
            ))}
          </RevealGroup>
        )}
      </Container>
    </section>
  );
}
