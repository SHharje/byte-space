import type { CourseCardData } from "@/components/home/CourseCard";

/**
 * Single source of truth for the 6 core mock courses.
 * Matches images and titles from CourseDiscover.
 */
// NOTE: "build-digital-asset-a-comprehensive-guide" is the only course with a real detail page.
// The other mock courses point to this same slug for now as placeholders until their dedicated detail pages exist.
export const BASE_COURSES: CourseCardData[] = [
  {
    id: "course-1",
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
    slug: "build-digital-asset-a-comprehensive-guide",
  },
  {
    id: "course-2",
    image: "/images/courses/course-2.jpg",
    title: "Build Digital Asset: A...",
    fullTitle: "Build Digital Asset: A Comprehensive Guide",
    rating: 4.8,
    byline: "purepearl studio",
    level: "Intermediate",
    price: "$25",
    period: "/lifetime",
    lessons: "112 Lessons",
    duration: "24 hours",
    comments: "172 Comments",
    students: "199+",
    category: "Featured",
    slug: "build-digital-asset-a-comprehensive-guide",
  },
  {
    id: "course-3",
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
    slug: "build-digital-asset-a-comprehensive-guide",
  },
  {
    id: "course-4",
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
    slug: "build-digital-asset-a-comprehensive-guide",
  },
  {
    id: "course-5",
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
    slug: "build-digital-asset-a-comprehensive-guide",
  },
  {
    id: "course-6",
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
    slug: "build-digital-asset-a-comprehensive-guide",
  },
];

// Generate a 90-item mock array (5 pages of 18 cards each) by cycling the base courses
export const MOCK_ALL_COURSES: CourseCardData[] = Array.from(
  { length: 90 },
  (_, index) => {
    const base = BASE_COURSES[index % BASE_COURSES.length];
    return {
      ...base,
      id: `all-course-${index + 1}`,
      slug: "build-digital-asset-a-comprehensive-guide",
    };
  }
);
