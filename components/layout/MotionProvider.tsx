"use client";

import { MotionConfig } from "framer-motion";

/** Honors the OS "reduce motion" setting for every framer-motion animation
 *  (transforms are skipped, opacity fades remain). Doing it here instead of
 *  branching on useReducedMotion() per component keeps the server and client
 *  markup identical, so there are no hydration mismatches. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
