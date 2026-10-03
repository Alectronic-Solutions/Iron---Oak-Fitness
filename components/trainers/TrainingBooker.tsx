"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { AppointmentBooker } from "@/components/trainers/AppointmentBooker";
import { trainers } from "@/lib/data/trainers";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export function TrainingBooker() {
  const [id, setId] = useState(trainers[0].id);
  const trainer = trainers.find((t) => t.id === id) ?? trainers[0];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[260px_minmax(0,1fr)] md:gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
      <div>
        <p id="coach-picker-label" className="eyebrow">
          Choose your coach
        </p>
        {/* Horizontal scroller on phones, vertical list from md up. */}
        <div
          role="radiogroup"
          aria-labelledby="coach-picker-label"
          className="scrollbar-none -mx-5 mt-3 flex snap-x gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-col md:overflow-visible md:px-0"
        >
          {trainers.map((t) => {
            const active = t.id === id;
            return (
              <button
                key={t.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setId(t.id)}
                className={cn(
                  "relative w-44 shrink-0 snap-start cursor-pointer rounded-xl border p-3 text-left md:w-full",
                  active ? "border-oak" : "border-line bg-ink/30 hover:border-oak/50",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="coach-active-pill"
                    className="absolute inset-0 rounded-xl bg-charcoal-2"
                    transition={{ type: "spring", stiffness: 700, damping: 36 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-3">
                  <Avatar initials={t.initials} size="sm" image={t.image} colorKey={t.id} />
                  <span className="min-w-0">
                    <span className="block truncate font-display uppercase text-bone">{t.name}</span>
                    <span className="block truncate text-xs text-bone-faint">{t.role}</span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
        <Link
          href={`/trainers/${trainer.slug}`}
          className="mt-3 inline-flex min-h-11 items-center gap-1 text-sm text-oak-soft hover:text-bone"
        >
          View {trainer.name.split(" ")[0]}&apos;s profile <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={trainer.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
        >
          <AppointmentBooker trainer={trainer} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
