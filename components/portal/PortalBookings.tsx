"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, Dumbbell, X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { MemberBooking } from "@/types";

export function PortalBookings({ initial }: { initial: MemberBooking[] }) {
  const [bookings, setBookings] = useState(initial);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  function cancel(id: string) {
    setBookings((prev) => prev.filter((b) => b.id !== id));
    setConfirmId(null);
  }

  if (bookings.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-bone-muted">No upcoming sessions booked.</p>
        <ButtonLink href="/schedule" className="mt-4">
          Browse the schedule
        </ButtonLink>
      </Card>
    );
  }

  return (
    <ul className="space-y-3">
      <AnimatePresence initial={false}>
        {bookings.map((b) => (
          <motion.li
            key={b.id}
            layout
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Card className="p-4">
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-oak/15 text-oak-soft">
                  {b.type === "appointment" ? (
                    <Dumbbell className="h-5 w-5" />
                  ) : (
                    <CalendarDays className="h-5 w-5" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate font-display uppercase text-bone">{b.title}</p>
                    {b.status === "waitlist" && <Badge tone="danger">Waitlist</Badge>}
                  </div>
                  <p className="mt-0.5 text-xs text-bone-faint">
                    {b.date} · {b.time} · {b.trainer}
                  </p>
                </div>
                {confirmId !== b.id && (
                  <button
                    type="button"
                    onClick={() => setConfirmId(b.id)}
                    aria-label={`Cancel ${b.title} on ${b.date}`}
                    className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-full text-bone-faint transition-colors hover:bg-charcoal-2 hover:text-red-300"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              {confirmId === b.id && (
                <div
                  role="alertdialog"
                  aria-label={`Cancel ${b.title}?`}
                  className="mt-4 flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <p className="text-sm text-bone-muted">
                    {b.status === "waitlist" ? "Leave the waitlist?" : "Cancel this booking? Free up to 8h before."}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm" onClick={() => setConfirmId(null)} autoFocus>
                      Keep it
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => cancel(b.id)}
                      className="bg-red-500/90 text-bone hover:bg-red-500"
                    >
                      Cancel booking
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
