"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar } from "@/components/ui/Avatar";
import { AppointmentBooker } from "@/components/trainers/AppointmentBooker";
import { trainers } from "@/lib/data/trainers";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export function TrainingBooker() {
  const [id, setId] = useState(trainers[0].id);
  const trainer = trainers.find((t) => t.id === id) ?? trainers[0];

  return (
    <div className="grid gap-6 md:gap-8 md:grid-cols-3">
      <div>
        <p className="eyebrow">Choose your coach</p>
        <div className="mt-3 space-y-2">
          {trainers.map((t) => (
            <button
              key={t.id}
              onClick={() => setId(t.id)}
              className={cn(
                "relative w-full cursor-pointer rounded-xl border p-3 text-left",
                t.id === id
                  ? "border-oak"
                  : "border-line hover:border-oak/50",
              )}
            >
              {t.id === id && (
                <motion.span
                  layoutId="coach-active-pill"
                  className="absolute inset-0 rounded-xl bg-charcoal-2"
                  transition={{ type: "spring", stiffness: 700, damping: 36 }}
                />
              )}
              <div className="relative z-10 flex items-center gap-3">
                <Avatar initials={t.initials} size="sm" image={t.image} colorKey={t.id} />
                <div className="min-w-0">
                  <p className="truncate font-display uppercase text-bone">
                    {t.name}
                  </p>
                  <p className="truncate text-xs text-bone-faint">
                    {t.specialties[0]}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2">
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
    </div>
  );
}
