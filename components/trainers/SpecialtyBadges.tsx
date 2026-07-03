"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";

export function SpecialtyBadges({ specialties }: { specialties: string[] }) {
  const reduced = useReducedMotion();

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {specialties.map((s, i) => (
        <motion.div
          key={s}
          initial={reduced ? { opacity: 1 } : { opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: Math.min(i * 0.05, 0.2) }}
        >
          <Badge tone="oak">{s}</Badge>
        </motion.div>
      ))}
    </div>
  );
}
