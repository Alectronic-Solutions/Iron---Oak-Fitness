"use client";

import { useState } from "react";
import { CalendarDays, Check, MapPin } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Dialog } from "@/components/ui/Dialog";
import { formatTime12, STUDIO } from "@/lib/site";
import { cn, WEEKDAY_LABELS } from "@/lib/utils";
import type { Trainer, Weekday } from "@/types";

interface Selection {
  day: Weekday;
  time: string;
}

export function AppointmentBooker({ trainer }: { trainer: Trainer }) {
  const [selected, setSelected] = useState<Selection | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [booked, setBooked] = useState(false);

  return (
    <Card className="p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <CalendarDays className="h-5 w-5 text-oak" />
        <h2 className="font-display text-xl uppercase text-bone">
          Book a 1-on-1
        </h2>
      </div>
      <p className="mt-1 text-sm text-bone-muted">
        Pick a time with {trainer.name.split(" ")[0]} - sessions run 60 minutes.
      </p>

      <div className="mt-6 space-y-5">
        {trainer.availability.map((win) => (
          <div key={win.day}>
            <p className="text-xs uppercase tracking-wider text-bone-faint">
              {WEEKDAY_LABELS[win.day]}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {win.slots.map((time) => {
                const isSel =
                  selected?.day === win.day && selected?.time === time;
                return (
                  <button
                    key={time}
                    type="button"
                    aria-pressed={isSel}
                    onClick={() => {
                      setSelected({ day: win.day, time });
                      setBooked(false);
                    }}
                    className={cn(
                      "min-h-11 min-w-20 cursor-pointer rounded-lg border px-3 text-sm tabular-nums transition-colors",
                      isSel
                        ? "border-bronze bg-bronze font-medium text-ink"
                        : "border-line bg-ink/30 text-bone-muted hover:border-oak/60 hover:text-bone",
                    )}
                  >
                    {formatTime12(time)}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <Button
        size="lg"
        className="mt-7 w-full"
        disabled={!selected}
        onClick={() => setConfirmOpen(true)}
      >
        {selected
          ? `Request ${selected.day} ${formatTime12(selected.time)}`
          : "Select a time"}
      </Button>

      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title={booked ? "Session requested" : "Confirm your session"}
      >
        {selected && (
          <AnimatePresence mode="wait">
            {booked ? (
              <motion.div
                key="booked"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-start gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-200">
                  <Check className="mt-0.5 h-5 w-5 shrink-0" />
                  <span>
                    Your 1-on-1 with {trainer.name} on{" "}
                    {WEEKDAY_LABELS[selected.day]} at {formatTime12(selected.time)} is requested.
                    They&apos;ll confirm shortly.
                  </span>
                </div>
                <Button
                  variant="secondary"
                  className="mt-4 w-full"
                  onClick={() => setConfirmOpen(false)}
                >
                  Done
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="pending"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-4">
                  <Avatar initials={trainer.initials} size="md" image={trainer.image} />
                  <div>
                    <p className="font-display text-lg uppercase text-bone">
                      {trainer.name}
                    </p>
                    <p className="text-xs text-oak-soft">{trainer.role}</p>
                  </div>
                </div>

                <dl className="mt-5">
                  <div className="flex items-center justify-between border-b border-line py-2.5 text-sm">
                    <dt className="text-bone-faint">When</dt>
                    <dd className="font-medium text-bone">
                      {WEEKDAY_LABELS[selected.day]} · {formatTime12(selected.time)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between border-b border-line py-2.5 text-sm">
                    <dt className="text-bone-faint">Duration</dt>
                    <dd className="font-medium text-bone">60 minutes</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-b border-line py-2.5 text-sm">
                    <dt className="text-bone-faint">Location</dt>
                    <dd className="inline-flex items-center gap-1.5 text-right font-medium text-bone">
                      <MapPin className="h-3.5 w-3.5 text-oak" />
                      {STUDIO.street}
                    </dd>
                  </div>
                </dl>

                <Button
                  size="lg"
                  className="mt-6 w-full"
                  onClick={() => setBooked(true)}
                >
                  Confirm session
                </Button>
                <p className="mt-3 text-center text-xs text-bone-faint">
                  Demo only - no booking is actually made.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </Dialog>
    </Card>
  );
}
