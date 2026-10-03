"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";

export function SpecialtyBadges({ specialties }: { specialties: string[] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {specialties.map((s, i) => (
        <motion.div
          key={s}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: Math.min(i * 0.05, 0.2) }}
        >
          <Badge tone="oak">{s}</Badge>
        </motion.div>
      ))}
    </div>
  );
}
