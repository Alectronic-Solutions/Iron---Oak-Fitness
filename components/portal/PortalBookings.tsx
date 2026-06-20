"use client";

import { useState } from "react";
import { CalendarDays, Dumbbell, X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { MemberBooking } from "@/types";

export function PortalBookings({ initial }: { initial: MemberBooking[] }) {
  const [bookings, setBookings] = useState(initial);

  function cancel(id: string) {
    setBookings((prev) => prev.filter((b) => b.id !== id));
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
    <div className="space-y-3">
      {bookings.map((b) => (
        <Card key={b.id} className="flex items-center gap-4 p-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-oak/15 text-oak-soft">
            {b.type === "appointment" ? (
              <Dumbbell className="h-5 w-5" />
            ) : (
              <CalendarDays className="h-5 w-5" />
            )}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="truncate font-display uppercase text-bone">
                {b.title}
              </p>
              {b.status === "waitlist" && <Badge tone="danger">Waitlist</Badge>}
            </div>
            <p className="mt-0.5 text-xs text-bone-faint">
              {b.date} · {b.time} · {b.trainer}
            </p>
          </div>
          <button
            onClick={() => cancel(b.id)}
            aria-label={`Cancel ${b.title}`}
            className="grid h-9 w-9 cursor-pointer shrink-0 place-items-center rounded-full text-bone-faint transition-colors hover:bg-charcoal-2 hover:text-red-300"
          >
            <X className="h-4 w-4" />
          </button>
        </Card>
      ))}
    </div>
  );
}
