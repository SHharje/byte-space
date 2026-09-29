"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { pageVariants } from "@/lib/motion";

export default function Template({ children }: { children: ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex-1 flex flex-col"
    >
      {children}
    </motion.div>
  );
}
