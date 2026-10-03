"use client";

import { motion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left";
  className?: string;
}

/** Fades content in as it scrolls into view. Reduced motion is handled
 *  globally by MotionProvider. */
export function Reveal({
  children,
  delay = 0,
  direction = "up",
  className,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: direction === "up" ? 20 : 0,
        x: direction === "left" ? -16 : 0,
      }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
