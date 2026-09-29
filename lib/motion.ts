import type { Variants } from "framer-motion";

/**
 * Shared motion constants across the ByteSpace application.
 * All animations must pull from these centralized tokens.
 */
export const EASE = [0.22, 1, 0.36, 1] as const;
export const PAGE_TRANSITION_DURATION = 0.8;
export const REVEAL_DURATION = 0.5;
export const REVEAL_DISTANCE = 24; // px for fade-up distance
export const STAGGER_GAP = 0.08; // seconds between staggered items

/**
 * Page route transition variants.
 * Smooth, elegant fade with no jarring layout bounce:
 * opacity 0 -> opacity 1 over ~420ms with a gentle ease-out curve.
 */
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: PAGE_TRANSITION_DURATION,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

/**
 * Scroll reveal fade-up variants for sections, cards, and individual elements.
 */
export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: REVEAL_DISTANCE,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: REVEAL_DURATION,
      ease: EASE,
    },
  },
};

/**
 * Container variants for staggering child reveal animations.
 */
export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER_GAP,
    },
  },
};
