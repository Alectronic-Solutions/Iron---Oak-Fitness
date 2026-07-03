"use client";

import { Award } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export function CertificationList({ certifications }: { certifications: string[] }) {
  const reduced = useReducedMotion();

  return (
    <ul className="mt-3 space-y-2">
      {certifications.map((c, i) => (
        <motion.li
          key={c}
          className="flex items-center gap-3 text-sm text-bone-muted"
          initial={reduced ? { opacity: 1 } : { opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: Math.min(i * 0.05, 0.2) }}
        >
          <Award className="h-4 w-4 shrink-0 text-oak" />
          {c}
        </motion.li>
      ))}
    </ul>
  );
}
