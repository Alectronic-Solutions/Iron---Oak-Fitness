"use client";

import { useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { AppointmentBooker } from "@/components/trainers/AppointmentBooker";
import { trainers } from "@/lib/data/trainers";
import { cn } from "@/lib/utils";

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
                "flex w-full cursor-pointer items-center gap-3 rounded-xl border p-3 text-left transition-colors",
                t.id === id
                  ? "border-oak bg-charcoal-2"
                  : "border-line bg-charcoal hover:border-oak/50",
              )}
            >
              <Avatar initials={t.initials} size="sm" image={t.image} colorKey={t.id} />
              <div className="min-w-0">
                <p className="truncate font-display uppercase text-bone">
                  {t.name}
                </p>
                <p className="truncate text-xs text-bone-faint">
                  {t.specialties[0]}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2">
        <AppointmentBooker key={trainer.id} trainer={trainer} />
      </div>
    </div>
  );
}
