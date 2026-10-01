export interface LessonPreview {
  title: string;
  duration: string;
}

export interface CourseReview {
  id: string;
  author: string;
  role?: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface CourseModule {
  number: number;
  title: string;
  description: string;
}

export interface CourseDetail {
  slug: string;
  title: string;
  subtitle: string;
  creatorName: string;
  level: string;
  rating: number;
  reviewCount: number;
  studentCount: number;
  price: number;
  pricePeriod: string;
  thumbnail: string;
  description: string[];
  sneakPeek: string[];
  keyPoints: string[];
  totalLessons: number;
  totalDurationHours: number;
  lessonsPreview: LessonPreview[];
  includes: string[];
  creatorRole: string;
  creatorAvatar: string;
  ratingBreakdown: Record<number, number>;
  reviews: CourseReview[];
  modules: CourseModule[];
  learningProgress: number;
}

export const COURSE_DETAIL: CourseDetail = {
  slug: "build-digital-asset-a-comprehensive-guide",
  title: "Build Digital Asset: A Comprehensive Guide",
  subtitle: "Unlock the Power of Digital Creation with Expert Guidance",
  creatorName: "purepearl studio",
  level: "Intermediate",
  rating: 4.8,
  reviewCount: 172,
  studentCount: 199,
  price: 25,
  pricePeriod: "lifetime",
  thumbnail: "/images/thumbnail/image.jpg",
  description: [
    "Embark on an enlightening exploration into the world of digital creation with our comprehensive course, \"Build Digital Assets: A Comprehensive Guide.\" This transformative learning experience invites you to delve deep into the intricacies of crafting impactful digital content. From laying the groundwork with foundational concepts to mastering advanced techniques, this guide is meticulously curated to empower you with the skills essential for navigating the dynamic landscape of digital asset creation.",
    "In the initial modules, you'll establish a solid foundation by immersing yourself in the foundational concepts that form the backbone of digital asset creation. Understand the fundamental elements that constitute compelling digital content and gain proficiency in leveraging these elements to communicate effectively in the digital realm.",
    "As you progress through the course, you'll ascend to higher levels of expertise, delving into the nuances of design principles that drive impactful creations. Uncover the secrets behind effective visual communication, exploring color theory, typography, and layout strategies that elevate your digital assets to new heights. Engage in hands-on exercises that reinforce your understanding, allowing you to apply these principles in practical scenarios.",
  ],
  sneakPeek: [
    "/images/courses/course-1.jpg",
    "/images/courses/course-2.jpg",
    "/images/courses/course-3.jpg",
    "/images/courses/course-4.jpg",
  ],
  keyPoints: [
    "Foundational Concepts",
    "Design Principles Mastery",
    "Advanced Techniques in Digital Creation",
    "Project Showcase and Critique",
    "Optimizing for Various Platforms",
    "Digital Asset Management Best Practices",
    "Monetization Strategies",
    "Capstone Project: Building Your Portfolio",
  ],
  totalLessons: 112,
  totalDurationHours: 24,
  lessonsPreview: [
    { title: "Introduction to Digital Assets", duration: "12 mins" },
    { title: "Design Principles for Impacts", duration: "21 mins" },
    { title: "Advanced Techniques in Digital Creation", duration: "16 mins" },
  ],
  includes: [
    "Learning Resources",
    "Quality Lesson Videos",
    "Certificate of Completion",
    "Private Consultation",
  ],
  creatorRole: "Professional Creator",
  creatorAvatar: "/images/avatars/avatar-2.png",
  ratingBreakdown: { 5: 720, 4: 120, 3: 21, 2: 12, 1: 16 },
  reviews: [
    {
      id: "rev-1",
      author: "PurePearl Studio",
      role: "UI/UX Designer",
      avatar: "/images/avatars/avatar-1.png",
      rating: 5,
      date: "a year ago",
      comment:
        "The course provided me with a comprehensive understanding of digital asset creation. The lessons were in-depth, practical, and immediately applicable to my work. Highly recommended!",
    },
    {
      id: "rev-2",
      author: "Albert Flores",
      role: "UI/UX Designer",
      avatar: "/images/avatars/avatar-2.png",
      rating: 5,
      date: "a year ago",
      comment:
        "This course transformed my approach to digital design. The combination of theory, hands-on exercises, and real-world applications made it a truly enriching experience. Excited to implement what I've learned!",
    },
    {
      id: "rev-3",
      author: "Cody Fisher",
      role: "UI/UX Designer",
      avatar: "/images/avatars/avatar-3.png",
      rating: 5,
      date: "a year ago",
      comment:
        "The project showcase and critique module created a collaborative environment where I could showcase my work, receive valuable feedback, and refine my skills. It added a unique and valuable dimension to the learning process.",
    },
    {
      id: "rev-4",
      author: "Brooklyn Simmons",
      role: "UI/UX Designer",
      avatar: "/images/avatars/avatar-1.png",
      rating: 5,
      date: "a year ago",
      comment:
        "The lessons on optimizing digital assets for various platforms were particularly insightful. The course adapts to the evolving digital landscape, and the engaging content kept me motivated throughout.",
    },
  ],
  // NOTE: source design skips from Module 2 to Module 4 — no Module 3 exists in the Figma file.
  // Confirm with design whether this is intentional before launch.
  modules: [
    {
      number: 1,
      title: "Introduction to Digital Assets",
      description:
        "Lay the groundwork with lessons like 'Understanding Digital Elements' and 'Navigating Design Software Tools.' Dive into the essentials of digital asset creation.",
    },
    {
      number: 2,
      title: "Design Principles for Impact",
      description:
        "Master the principles that drive impactful designs with lessons such as 'Color Theory in Digital Design' and 'Typography Essentials.' Elevate your visual communication skills.",
    },
    {
      number: 4,
      title: "User-Centric Design Strategies",
      description:
        "Understand 'Design Thinking in Digital Creation' and delve into 'User Experience (UX) Essentials.' Craft digital assets with a focus on user-centric design.",
    },
    {
      number: 5,
      title: "Interactive Media and Engagement",
      description:
        "Engage your audience with lessons like 'Creating Interactive Presentations' and 'Integrating Multimedia Elements.' Master the art of creating immersive digital experiences.",
    },
    {
      number: 6,
      title: "Project Showcase and Critique",
      description:
        "Perfect your presentation skills with 'Effective Presentation Techniques' and embrace collaboration with 'Peer Critique and Collaboration.' Showcase your work with confidence.",
    },
    {
      number: 7,
      title: "Optimizing Digital Assets for Various Platforms",
      description:
        "Adapt your digital creations for 'Mobile Platforms' and optimize for 'Social Media.' Ensure widespread accessibility and engagement across diverse digital landscapes.",
    },
  ],
  learningProgress: 55,
};

/**
 * Helper lookup to retrieve course detail by slug.
 */
export function getCourseDetailBySlug(slug: string): CourseDetail | undefined {
  if (slug === COURSE_DETAIL.slug) {
    return COURSE_DETAIL;
  }
  return undefined;
}
