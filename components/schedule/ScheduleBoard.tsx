"use client";

import { useMemo, useState } from "react";
import { Check, ChevronRight, Clock } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Dialog } from "@/components/ui/Dialog";
import { getClass } from "@/lib/data/classes";
import { getTrainer } from "@/lib/data/trainers";
import { getSlotsByDay, spotsLeft } from "@/lib/data/schedule";
import { cn, WEEKDAY_LABELS, WEEKDAYS } from "@/lib/utils";
import type { ScheduleSlot, Weekday } from "@/types";
import type { ComponentProps } from "react";

type Tone = ComponentProps<typeof Badge>["tone"];

const categoryTone: Record<string, Tone> = {
  Strength: "oak",
  Conditioning: "conditioning",
  Mobility: "mobility",
  Endurance: "endurance",
};

const categoryBorder: Record<string, string> = {
  Strength: "border-l-oak/70",
  Conditioning: "border-l-amber-500/70",
  Mobility: "border-l-emerald-500/70",
  Endurance: "border-l-blue-500/70",
};

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-line py-2.5 text-sm">
      <dt className="text-bone-faint">{label}</dt>
      <dd className="text-right font-medium text-bone">{value}</dd>
    </div>
  );
}

export function ScheduleBoard() {
  const [day, setDay] = useState<Weekday>("Mon");
  const [bookedIds, setBookedIds] = useState<Set<string>>(new Set());
  const [activeId, setActiveId] = useState<string | null>(null);

  const slots = useMemo(() => getSlotsByDay(day), [day]);
  const activeSlot = slots.find((s) => s.id === activeId) ?? null;

  function statusFor(slot: ScheduleSlot) {
    const baseLeft = spotsLeft(slot);
    const isBooked = bookedIds.has(slot.id);
    const wasFull = baseLeft === 0;
    const left = isBooked && !wasFull ? baseLeft - 1 : baseLeft;
    return { isBooked, wasFull, left };
  }

  function book(id: string) {
    setBookedIds((prev) => new Set(prev).add(id));
  }

  return (
    <div>
      {/* Day selector */}
      <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {WEEKDAYS.map((d) => {
          const count = getSlotsByDay(d).length;
          const active = d === day;
          return (
            <button
              key={d}
              onClick={() => {
                setDay(d);
                setActiveId(null);
              }}
              className={cn(
                "flex shrink-0 cursor-pointer flex-col items-center rounded-xl border px-4 py-2.5 transition-colors",
                active
                  ? "border-bronze bg-bronze text-ink"
                  : "border-line bg-charcoal text-bone-muted hover:border-oak/50 hover:text-bone",
              )}
            >
              <span className="font-display text-sm uppercase tracking-wider">
                {d}
              </span>
              <span
                className={cn(
                  "text-[11px]",
                  active ? "text-ink/70" : "text-bone-faint",
                )}
              >
                {count} {count === 1 ? "class" : "classes"}
              </span>
            </button>
          );
        })}
      </div>

      {/* Slot list */}
      <div className="mt-6 space-y-3">
        {slots.map((slot) => {
          const cls = getClass(slot.classSlug);
          const coach = getTrainer(slot.trainerId);
          const { isBooked, wasFull, left } = statusFor(slot);
          const tone = categoryTone[cls?.category ?? ""] ?? "default";
          const border = categoryBorder[cls?.category ?? ""] ?? "";

          return (
            <button
              key={slot.id}
              onClick={() => setActiveId(slot.id)}
              className="block w-full cursor-pointer text-left"
            >
              <Card
                interactive
                className={cn(
                  "flex flex-col gap-4 border-l-2 p-4 md:flex-row md:items-center md:gap-6",
                  border,
                )}
              >
                <div className="flex items-center gap-4 md:w-32 md:shrink-0">
                  <div>
                    <p className="font-display text-2xl leading-none text-bone">
                      {slot.start}
                    </p>
                    <p className="mt-1 text-xs text-bone-faint">{slot.end}</p>
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-lg uppercase text-bone">
                      {cls?.title}
                    </h3>
                    <Badge tone={tone}>{cls?.category}</Badge>
                  </div>
                  <p className="mt-1 flex flex-wrap items-center gap-x-2 text-xs text-bone-faint">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {cls?.durationMin} min
                    </span>
                    <span aria-hidden>·</span>
                    <span>{cls?.intensity}</span>
                    <span aria-hidden>·</span>
                    <span className="inline-flex items-center gap-1">
                      {coach && <Avatar initials={coach.initials} image={coach.image} colorKey={coach.id} size="sm" className="h-4 w-4 text-[8px]" />}
                      {coach?.name}
                    </span>
                  </p>
                </div>

                <div className="flex items-center justify-between gap-3 md:justify-end">
                  {isBooked ? (
                    <Badge tone="success">
                      <Check className="h-3 w-3" />
                      {wasFull ? "Waitlisted" : "Booked"}
                    </Badge>
                  ) : wasFull ? (
                    <Badge tone="danger">Waitlist</Badge>
                  ) : (
                    <Badge tone={left <= 3 ? "oak" : "muted"}>
                      {left} spots left
                    </Badge>
                  )}
                  <ChevronRight className="h-5 w-5 text-bone-faint" />
                </div>
              </Card>
            </button>
          );
        })}
      </div>

      {/* Booking dialog */}
      <Dialog
        open={!!activeSlot}
        onClose={() => setActiveId(null)}
        title={activeSlot ? getClass(activeSlot.classSlug)?.title : undefined}
      >
        {activeSlot &&
          (() => {
            const cls = getClass(activeSlot.classSlug);
            const coach = getTrainer(activeSlot.trainerId);
            const { isBooked, wasFull, left } = statusFor(activeSlot);
            const tone = categoryTone[cls?.category ?? ""] ?? "default";

            return (
              <div>
                <div className="flex flex-wrap gap-2">
                  <Badge tone={tone}>{cls?.category}</Badge>
                  <Badge>{cls?.intensity}</Badge>
                  <Badge>{cls?.durationMin} min</Badge>
                </div>

                {cls?.description && (
                  <p className="mt-4 text-sm leading-relaxed text-bone-muted">
                    {cls.description}
                  </p>
                )}

                <dl className="mt-5">
                  <DetailRow
                    label="When"
                    value={`${WEEKDAY_LABELS[day]} · ${activeSlot.start}–${activeSlot.end}`}
                  />
                  <div className="flex items-center justify-between gap-4 border-b border-line py-2.5 text-sm">
                    <dt className="text-bone-faint">Coach</dt>
                    <dd className="flex items-center gap-1.5 font-medium text-bone">
                      {coach && <Avatar initials={coach.initials} image={coach.image} colorKey={coach.id} size="sm" className="h-6 w-6 text-[9px]" />}
                      {coach?.name ?? "-"}
                    </dd>
                  </div>
                  <DetailRow
                    label="Availability"
                    value={
                      wasFull
                        ? "Full - waitlist open"
                        : `${left} of ${activeSlot.capacity} spots left`
                    }
                  />
                </dl>

                {isBooked ? (
                  <div className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-200">
                    <Check className="mt-0.5 h-5 w-5 shrink-0" />
                    <span>
                      {wasFull
                        ? "You're on the waitlist. We'll text you if a spot opens up."
                        : "You're booked in. See you on the floor!"}
                    </span>
                  </div>
                ) : (
                  <Button
                    size="lg"
                    className="mt-6 w-full"
                    onClick={() => book(activeSlot.id)}
                  >
                    {wasFull ? "Join the waitlist" : "Confirm booking"}
                  </Button>
                )}

                <p className="mt-3 text-center text-xs text-bone-faint">
                  Demo only. No booking is actually made.
                </p>
              </div>
            );
          })()}
      </Dialog>
    </div>
  );
}
