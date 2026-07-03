"use client";

import { motion, useReducedMotion } from "framer-motion";

/** The hero H1: the second line's oak gradient sweeps in right after
 *  the page's .animate-rise entrance (0.5s) finishes. */
export function HeroHeading() {
  const reduced = useReducedMotion();

  return (
    <h1 className="mt-6 text-6xl uppercase leading-[0.9] text-bone sm:text-7xl md:text-6xl lg:text-8xl">
      Strength,
      <br />
      <motion.span
        className="text-gradient-oak inline-block"
        initial={reduced ? { clipPath: "inset(0 0% 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
      >
        grounded.
      </motion.span>
    </h1>
  );
}
