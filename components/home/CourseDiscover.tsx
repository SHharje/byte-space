"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";
import { CourseCard, type CourseCardData } from "./CourseCard";

/* ── Category list ── */
const CATEGORIES = [
  "Featured",
  "Music",
  "Drawing & Painting",
  "Marketing",
  "Animation",
  "Social Media",
  "UI/UX Design",
  "Creative Marketing",
  "Digital Illustration",
  "Film & Video",
  "Crafts",
  "Freelance & Entrepreneurship",
  "Graphic Design",
  "Photography",
  "Productivity",
  "Web Development",
  "Data Science",
  "Cooking",
] as const;

/* ── Mock course data ── */
const COURSES: CourseCardData[] = [
  {
    image: "/images/courses/course-1.jpg",
    title: "Learn Figma from Basic",
    fullTitle: "Learn Figma from Basic",
    rating: 4.5,
    byline: "purepearl studio",
    level: "Beginner",
    price: "$25",
    period: "/lifetime",
    lessons: "17 Lessons",
    duration: "2 hours 16 mins",
    comments: "59 Comments",
    students: "26+",
    category: "Featured",
    slug: "learn-figma-from-basic",
  },
  {
    image: "/images/courses/course-2.jpg",
    title: "Build Digital Asset",
    fullTitle: "Build Digital Asset",
    rating: 4.5,
    byline: "purepearl studio",
    level: "Beginner",
    price: "$25",
    period: "/lifetime",
    lessons: "17 Lessons",
    duration: "2 hours 16 mins",
    comments: "59 Comments",
    students: "26+",
    category: "Featured",
    slug: "build-digital-asset",
  },
  {
    image: "/images/courses/course-3.jpg",
    title: "the Power of Big Data",
    fullTitle: "the Power of Big Data",
    rating: 4.5,
    byline: "purepearl studio",
    level: "Beginner",
    price: "$25",
    period: "/lifetime",
    lessons: "17 Lessons",
    duration: "2 hours 16 mins",
    comments: "59 Comments",
    students: "26+",
    category: "Featured",
    slug: "the-power-of-big-data",
  },
  {
    image: "/images/courses/course-4.jpg",
    title: "Balancing Productivity an…",
    fullTitle: "Balancing Productivity and Creativity in Work",
    rating: 4.5,
    byline: "purepearl studio",
    level: "Beginner",
    price: "$25",
    period: "/lifetime",
    lessons: "17 Lessons",
    duration: "2 hours 16 mins",
    comments: "59 Comments",
    students: "26+",
    category: "Featured",
    slug: "balancing-productivity-and-creativity-in-work",
  },
  {
    image: "/images/courses/course-5.jpg",
    title: "Mastering Money Manage…",
    fullTitle: "Mastering Money Management and Investment",
    rating: 4.5,
    byline: "purepearl studio",
    level: "Beginner",
    price: "$25",
    period: "/lifetime",
    lessons: "17 Lessons",
    duration: "2 hours 16 mins",
    comments: "59 Comments",
    students: "26+",
    category: "Featured",
    slug: "mastering-money-management-and-investment",
  },
  {
    image: "/images/courses/course-6.jpg",
    title: "From Idea to Startup Succ…",
    fullTitle: "From Idea to Startup Success",
    rating: 4.5,
    byline: "purepearl studio",
    level: "Beginner",
    price: "$25",
    period: "/lifetime",
    lessons: "17 Lessons",
    duration: "2 hours 16 mins",
    comments: "59 Comments",
    students: "26+",
    category: "Featured",
    slug: "from-idea-to-startup-success",
  },
];

export function CourseDiscover() {
  const [activeCategory, setActiveCategory] = useState("Featured");

  /* Simple filter: "Featured" shows all; other categories would filter by category.
     Since all mock data is "Featured", switching to another category shows an empty state. */
  const filtered =
    activeCategory === "Featured"
      ? COURSES
      : COURSES.filter((c) => c.category === activeCategory);

  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        {/* ── Heading ── */}
        <div className="mx-auto max-w-[700px] text-center">
          <h2
            className="text-ink text-[32px] sm:text-[36px] lg:text-[40px] font-bold leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Discover Your Passion,
            <br />
            Build Your Skills
          </h2>
          <p
            className="mt-4 text-muted text-[15px] sm:text-[16px] leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            At Bytespace Courses, we bring you closer to life-changing knowledge.
            Explore a variety of courses across different fields, from technology to
            the arts, and make a difference in your career and life.
          </p>
        </div>

        {/* ── Category Pills ── */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
          {CATEGORIES.map((cat) => (
            <Pill
              key={cat}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className="px-[18px] py-[10px] text-[15px]"
            >
              {cat}
            </Pill>
          ))}
          <button
            type="button"
            className="text-[15px] font-medium text-[#3B82F6] hover:underline cursor-pointer"
            style={{ fontFamily: "var(--font-body)" }}
          >
            + More
          </button>
        </div>

        {/* ── Course Grid ── */}
        {filtered.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        ) : (
          <div className="mt-12 flex flex-col items-center justify-center py-16">
            <p
              className="text-muted text-[16px]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              No courses in this category yet — check back soon!
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}
