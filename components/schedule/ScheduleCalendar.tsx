"use client";

import { useMemo, useState } from "react";
import { Check, Clock, Users } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { getClass } from "@/lib/data/classes";
import { getTrainer } from "@/lib/data/trainers";
import { getSlotsByDay, spotsLeft, isFull } from "@/lib/data/schedule";
import { cn, WEEKDAYS, WEEKDAY_LABELS } from "@/lib/utils";
import type { ClassCategory, ScheduleSlot, Weekday } from "@/types";

// ---------- category filter ----------

type FilterLabel = "All" | "Strength" | "Cardio";

const FILTER_MAP: Record<FilterLabel, ClassCategory | null> = {
  All: null,
  Strength: "Strength",
  Cardio: "Conditioning",
};

const FILTERS: FilterLabel[] = ["All", "Strength", "Cardio"];

// ---------- helpers ----------

function fmt12(time: string) {
  const [h, m] = time.split(":").map(Number);
  const suffix = h < 12 ? "am" : "pm";
  const hour = h % 12 || 12;
  return m === 0 ? `${hour}${suffix}` : `${hour}:${m.toString().padStart(2, "0")}${suffix}`;
}

function categoryTone(cat?: ClassCategory) {
  if (cat === "Strength") return "oak" as const;
  if (cat === "Conditioning") return "danger" as const;
  if (cat === "Mobility") return "success" as const;
  return "muted" as const;
}

// ---------- detail row ----------

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-line py-2.5 text-sm last:border-0">
      <dt className="text-bone-faint">{label}</dt>
      <dd className="text-right font-medium text-bone">{value}</dd>
    </div>
  );
}

// ---------- single class card ----------

function ClassRow({
  slot,
  isBooked,
  onClick,
}: {
  slot: ScheduleSlot;
  isBooked: boolean;
  onClick: () => void;
}) {
  const cls = getClass(slot.classSlug);
  const coach = getTrainer(slot.trainerId);
  const full = isFull(slot);
  const left = spotsLeft(slot);

  return (
    <button
      onClick={onClick}
      className="group w-full cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60 rounded-2xl"
    >
      <div
        className={cn(
          "relative flex items-stretch gap-0 overflow-hidden rounded-2xl border transition-colors duration-150",
          "bg-charcoal border-line group-hover:border-oak/40",
        )}
      >
        {/* time column */}
        <div className="flex w-16 sm:w-18 shrink-0 flex-col items-center justify-center gap-0.5 border-r border-line bg-charcoal-2 px-2 py-4">
          <span className="font-display text-xl leading-none text-bone">
            {fmt12(slot.start)}
          </span>
          <span className="text-[10px] text-bone-faint">{fmt12(slot.end)}</span>
        </div>

        {/* main content */}
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5 px-4 py-3.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-display text-base uppercase tracking-wide text-bone">
              {cls?.title ?? slot.classSlug}
            </span>
            <Badge tone={categoryTone(cls?.category)}>
              {cls?.category === "Conditioning" ? "Cardio" : cls?.category}
            </Badge>
          </div>

          <p className="flex flex-wrap items-center gap-x-2 text-xs text-bone-faint">
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {cls?.durationMin} min
            </span>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1">
              {coach && <Avatar initials={coach.initials} image={coach.image} colorKey={coach.id} size="sm" className="h-4 w-4 text-[8px]" />}
              {coach?.name}
            </span>
            <span aria-hidden>·</span>
            <span>{cls?.intensity}</span>
          </p>
        </div>

        {/* status column */}
        <div className="flex shrink-0 flex-col items-end justify-center gap-1.5 pr-4 py-3.5">
          {isBooked ? (
            <Badge tone="success">
              <Check className="h-3 w-3" />
              {full ? "Waitlisted" : "Booked"}
            </Badge>
          ) : full ? (
            <Badge tone="danger">Waitlist</Badge>
          ) : (
            <span
              className={cn(
                "flex items-center gap-1 text-xs",
                left <= 3 ? "text-oak-soft" : "text-bone-faint",
              )}
            >
              <Users className="h-3 w-3" />
              {left}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

// ---------- main component ----------

export function ScheduleCalendar() {
  const [day, setDay] = useState<Weekday>("Mon");
  const [filter, setFilter] = useState<FilterLabel>("All");
  const [bookedIds, setBookedIds] = useState<Set<string>>(new Set());
  const [activeId, setActiveId] = useState<string | null>(null);

  const allSlots = useMemo(() => getSlotsByDay(day), [day]);

  const slots = useMemo(() => {
    const target = FILTER_MAP[filter];
    if (!target) return allSlots;
    return allSlots.filter((s) => getClass(s.classSlug)?.category === target);
  }, [allSlots, filter]);

  const activeSlot = allSlots.find((s) => s.id === activeId) ?? null;

  function book(id: string) {
    setBookedIds((prev) => new Set(prev).add(id));
  }

  function selectDay(d: Weekday) {
    setDay(d);
    setActiveId(null);
  }

  const activeCls = activeSlot ? getClass(activeSlot.classSlug) : null;
  const activeCoach = activeSlot ? getTrainer(activeSlot.trainerId) : null;
  const activeBooked = activeSlot ? bookedIds.has(activeSlot.id) : false;
  const activeFull = activeSlot ? isFull(activeSlot) : false;
  const activeLeft = activeSlot ? spotsLeft(activeSlot) : 0;

  return (
    <div className="flex flex-col gap-6">
      {/* ── Day selector ── */}
      <div
        role="tablist"
        aria-label="Day"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-none md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
      >
        {WEEKDAYS.map((d) => {
          const active = d === day;
          const count = getSlotsByDay(d).length;
          return (
            <button
              key={d}
              role="tab"
              aria-selected={active}
              onClick={() => selectDay(d)}
              className={cn(
                "flex shrink-0 cursor-pointer flex-col items-center rounded-xl border px-4 py-2.5 transition-all duration-150 min-w-14",
                active
                  ? "border-bronze bg-bronze text-ink shadow-sm"
                  : "border-line bg-charcoal text-bone-muted hover:border-oak/40 hover:text-bone",
              )}
            >
              <span className="font-display text-sm uppercase tracking-widest leading-none">
                {d}
              </span>
              <span
                className={cn(
                  "mt-1 text-[10px] tabular-nums",
                  active ? "text-ink/60" : "text-bone-faint",
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Category filter ── */}
      <div
        role="group"
        aria-label="Category filter"
        className="flex gap-2"
      >
        {FILTERS.map((f) => {
          const active = f === filter;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "cursor-pointer rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors duration-150",
                active
                  ? "border-bronze bg-bronze/15 text-bronze"
                  : "border-line bg-charcoal text-bone-faint hover:border-oak/40 hover:text-bone",
              )}
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* ── Class list ── */}
      {slots.length > 0 ? (
        <div className="flex flex-col gap-2.5">
          {slots.map((slot) => (
            <ClassRow
              key={slot.id}
              slot={slot}
              isBooked={bookedIds.has(slot.id)}
              onClick={() => setActiveId(slot.id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-line bg-charcoal py-14 text-center">
          <p className="font-display text-lg uppercase tracking-wider text-bone-muted">
            No classes
          </p>
          <p className="text-sm text-bone-faint">
            Try a different day or category.
          </p>
        </div>
      )}

      {/* ── Booking dialog ── */}
      <Dialog
        open={!!activeSlot}
        onClose={() => setActiveId(null)}
        title={activeCls?.title}
      >
        {activeSlot && (
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge tone={categoryTone(activeCls?.category)}>
                {activeCls?.category === "Conditioning" ? "Cardio" : activeCls?.category}
              </Badge>
              <Badge>{activeCls?.intensity}</Badge>
              <Badge>{activeCls?.durationMin} min</Badge>
            </div>

            {activeCls?.description && (
              <p className="mt-4 text-sm leading-relaxed text-bone-muted">
                {activeCls.description}
              </p>
            )}

            <dl className="mt-5">
              <Row
                label="When"
                value={`${WEEKDAY_LABELS[day]} · ${activeSlot.start}–${activeSlot.end}`}
              />
              <div className="flex items-center justify-between gap-4 border-b border-line py-2.5 text-sm">
                <dt className="text-bone-faint">Coach</dt>
                <dd className="flex items-center gap-1.5 font-medium text-bone">
                  {activeCoach && <Avatar initials={activeCoach.initials} image={activeCoach.image} colorKey={activeCoach.id} size="sm" className="h-6 w-6 text-[9px]" />}
                  {activeCoach?.name ?? "-"}
                </dd>
              </div>
              <Row
                label="Availability"
                value={
                  activeFull
                    ? "Full - waitlist open"
                    : `${activeLeft} of ${activeSlot.capacity} spots left`
                }
              />
            </dl>

            {activeBooked ? (
              <div className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-200">
                <Check className="mt-0.5 h-5 w-5 shrink-0" />
                <span>
                  {activeFull
                    ? "You're on the waitlist - we'll text you if a spot opens up."
                    : "You're booked in. See you on the floor!"}
                </span>
              </div>
            ) : (
              <Button
                size="lg"
                className="mt-6 w-full"
                onClick={() => book(activeSlot.id)}
              >
                {activeFull ? "Join the waitlist" : "Confirm booking"}
              </Button>
            )}

            <p className="mt-3 text-center text-xs text-bone-faint">
              Demo only - no booking is actually made.
            </p>
          </div>
        )}
      </Dialog>
    </div>
  );
}
