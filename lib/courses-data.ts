import type { CourseCardData } from "@/components/home/CourseCard";

/**
 * Single source of truth for the 6 core mock courses.
 * Matches images and titles from CourseDiscover.
 */
export const BASE_COURSES: CourseCardData[] = [
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

// TODO: replace with real paginated API data
// Generate a 90-item mock array (5 pages of 18 cards each) by cycling the 6 base courses
export const MOCK_ALL_COURSES: CourseCardData[] = Array.from(
  { length: 90 },
  (_, index) => {
    const base = BASE_COURSES[index % BASE_COURSES.length];
    return {
      ...base,
      slug: `${base.slug}-${index + 1}`,
    };
  }
);
