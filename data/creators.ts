export interface Creator {
  slug: string;
  name: string;
  role: string;
  tagline: string;
  avatar: string;
  bioParagraphs: string[];
  productCount: number;
  followerCount: number;
}

// NOTE: source design literally contained the placeholder text "[Creator's Name]" in paragraph 1 and
// a lowercase sentence start ("ive into...") in paragraph 2 — both corrected above to read naturally.
// Flag this for the designer; don't assume other creator copy will have the same issue later.
export const CREATOR: Creator = {
  slug: "purepearl-studio",
  name: "PurePearl Studio",
  role: "Creator",
  tagline: "Passionate UI/UX, Web designer",
  avatar: "/images/creator/creator.png",
  bioParagraphs: [
    "Welcome to the creative world of PurePearl Studio. Here, you'll discover the passion, expertise, and inspiration that drive my creative journey. Let's explore and learn together!",
    "Dive into my creative portfolio, showcasing a glimpse of my artistic endeavors. From digital designs to multimedia projects, each piece tells a unique story. Explore the world of creativity with me.",
  ],
  productCount: 3,
  followerCount: 12,
};

export const CREATORS: Creator[] = [CREATOR];

/**
 * Converts a creator name into a URL-friendly slug.
 * e.g. "PurePearl Studio" or "purepearl studio" -> "purepearl-studio"
 */
export function getCreatorSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Generates the full route href for a given creator name.
 * e.g. "purepearl studio" -> "/creators/purepearl-studio"
 */
export function getCreatorHref(name: string): string {
  return `/creators/${getCreatorSlug(name)}`;
}

export function getCreatorBySlug(slug: string): Creator | undefined {
  return CREATORS.find((c) => c.slug === slug);
}

