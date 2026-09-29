"use client";

import {
  Children,
  isValidElement,
  type ReactNode,
  type CSSProperties,
} from "react";
import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
} from "framer-motion";
import {
  fadeUpVariants,
  staggerContainerVariants,
  REVEAL_DURATION,
  EASE,
} from "@/lib/motion";

/* ══════════════════════════════════════════════════════════
   1 · <Reveal>
   Fades up and in once when entering viewport (~15% into view).
   ══════════════════════════════════════════════════════════ */

type RevealTag = "div" | "section" | "article" | "header" | "footer" | "p" | "span";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: RevealTag;
  style?: CSSProperties;
}

const MOTION_TAG_MAP = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  header: motion.header,
  footer: motion.footer,
  p: motion.p,
  span: motion.span,
};

export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
  style,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  // If reduced motion is requested, render standard static HTML element with no motion delays
  if (shouldReduceMotion) {
    const StaticTag = as;
    return (
      <StaticTag className={className} style={style}>
        {children}
      </StaticTag>
    );
  }

  const MotionComponent = MOTION_TAG_MAP[as] ?? motion.div;

  return (
    <MotionComponent
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{
        duration: REVEAL_DURATION,
        ease: EASE,
        delay,
      }}
      className={className}
      style={style}
    >
      {children}
    </MotionComponent>
  );
}

/* ══════════════════════════════════════════════════════════
   2 · <RevealGroup>
   Staggers children entry by STAGGER_GAP when entering viewport.
   Accepts resetKey (e.g. pagination page) to replay the stagger.
   ══════════════════════════════════════════════════════════ */

type RevealGroupTag = "div" | "ul" | "ol" | "section";

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  resetKey?: string | number;
  as?: RevealGroupTag;
  style?: CSSProperties;
}

const MOTION_GROUP_TAG_MAP = {
  div: motion.div,
  ul: motion.ul,
  ol: motion.ol,
  section: motion.section,
};

export function RevealGroup({
  children,
  className = "",
  resetKey,
  as = "div",
  style,
}: RevealGroupProps) {
  const shouldReduceMotion = useReducedMotion();

  // If reduced motion is requested, render directly without motion wrappers
  if (shouldReduceMotion) {
    const StaticTag = as;
    return (
      <StaticTag key={resetKey} className={className} style={style}>
        {children}
      </StaticTag>
    );
  }

  const MotionGroupComponent = MOTION_GROUP_TAG_MAP[as] ?? motion.div;

  return (
    <MotionGroupComponent
      key={resetKey}
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15% 0px" }}
      className={className}
      style={style}
    >
      {Children.map(children, (child) => {
        if (!isValidElement(child)) return child;

        return (
          <motion.div variants={fadeUpVariants} className="h-full">
            {child}
          </motion.div>
        );
      })}
    </MotionGroupComponent>
  );
}

/**
 * Optional explicit child wrapper for custom or nested items inside RevealGroup
 */
export function RevealItem({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div variants={fadeUpVariants} className={className} style={style}>
      {children}
    </motion.div>
  );
}
