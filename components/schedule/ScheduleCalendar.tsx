"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Clock, Users, X } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { getClass } from "@/lib/data/classes";
import { getTrainer } from "@/lib/data/trainers";
import { getSlotsByDay, spotsLeft } from "@/lib/data/schedule";
import { CATEGORIES, CATEGORY_STYLE } from "@/lib/categories";
import { formatTime12 } from "@/lib/site";
import { hhmm, useNow, weekdayOf } from "@/lib/useNow";
import { useSearchParam } from "@/lib/useSearchParam";
import { cn, WEEKDAYS, WEEKDAY_LABELS } from "@/lib/utils";
import type { ClassCategory, ScheduleSlot, Weekday } from "@/types";

type Filter = "All" | ClassCategory;

function isWeekday(v: string | null | undefined): v is Weekday {
  return !!v && (WEEKDAYS as string[]).includes(v);
}

/** The next seven days starting today, or Mon–Sun before hydration. */
function useDayStrip(now: Date | null) {
  return useMemo(() => {
    if (!now) return WEEKDAYS.map((day) => ({ day, date: null as Date | null }));
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(now);
      date.setDate(now.getDate() + i);
      return { day: weekdayOf(date), date };
    });
  }, [now]);
}

/* ------------------------------------------------------------------ */
/*  Row                                                                */
/* ------------------------------------------------------------------ */
function ClassRow({
  slot,
  left,
  isBooked,
  isPast,
  onClick,
}: {
  slot: ScheduleSlot;
  left: number;
  isBooked: boolean;
  isPast: boolean;
  onClick: () => void;
}) {
  const cls = getClass(slot.classSlug);
  const coach = getTrainer(slot.trainerId);
  const full = left === 0 && !isBooked;
  const style = cls ? CATEGORY_STYLE[cls.category] : null;
  const fill = Math.min(100, ((slot.capacity - left) / slot.capacity) * 100);

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isPast}
      className="group block w-full cursor-pointer rounded-2xl text-left disabled:cursor-not-allowed"
    >
      <div
        className={cn(
          "relative flex items-stretch overflow-hidden rounded-2xl border border-l-2 border-line bg-charcoal transition-colors duration-150",
          style?.border,
          !isPast && "group-hover:border-oak/40 group-hover:bg-charcoal-2",
          isPast && "opacity-45",
        )}
      >
        {/* Time */}
        <div className="flex w-18 shrink-0 flex-col items-center justify-center gap-1 border-r border-line px-2 py-4 sm:w-24">
          <span className="font-display text-lg leading-none text-bone sm:text-xl">
            {formatTime12(slot.start)}
          </span>
          <span className="text-[11px] text-bone-faint">{cls?.durationMin} min</span>
        </div>

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5 px-4 py-3.5">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="font-display text-base uppercase tracking-wide text-bone sm:text-lg">
              {cls?.title ?? slot.classSlug}
            </span>
            {style && (
              <Badge tone={style.tone} className="hidden min-[400px]:inline-flex">
                {cls?.category}
              </Badge>
            )}
          </div>
          <p className="flex min-w-0 items-center gap-1.5 text-xs text-bone-faint">
            {coach && (
              <Avatar
                initials={coach.initials}
                image={coach.image}
                colorKey={coach.id}
                size="sm"
                className="h-5 w-5 shrink-0 text-[8px]"
              />
            )}
            <span className="truncate">
              {coach?.name}
              <span className="hidden sm:inline"> · {cls?.intensity}</span>
            </span>
          </p>
          {/* Capacity bar */}
          {!isPast && (
            <div className="mt-1 h-1 w-full max-w-48 overflow-hidden rounded-full bg-line" aria-hidden>
              <div
                className={cn(
                  "h-full rounded-full",
                  full ? "bg-red-400/70" : left <= 3 ? "bg-bronze" : "bg-oak/60",
                )}
                style={{ width: `${fill}%` }}
              />
            </div>
          )}
        </div>

        {/* Status */}
        <div className="flex shrink-0 flex-col items-end justify-center gap-1 py-3.5 pr-4">
          {isPast ? (
            <span className="text-xs text-bone-faint">Finished</span>
          ) : isBooked ? (
            <Badge tone="success">
              <Check className="h-3 w-3" />
              {spotsLeft(slot) === 0 ? "Waitlist" : "Booked"}
            </Badge>
          ) : full ? (
            <Badge tone="danger">Waitlist</Badge>
          ) : (
            <span
              className={cn(
                "flex items-center gap-1 text-xs",
                left <= 3 ? "font-medium text-bronze" : "text-bone-muted",
              )}
            >
              <Users className="h-3.5 w-3.5" />
              {left} left
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Main                                                               */
/* ------------------------------------------------------------------ */
export function ScheduleCalendar() {
  const now = useNow();
  const paramDay = useSearchParam("day");
  const paramClass = useSearchParam("class");
  const strip = useDayStrip(now);

  // `undefined` = user hasn't chosen yet, so fall back to URL, then today.
  const [pickedDay, setPickedDay] = useState<Weekday>();
  const [pickedClass, setPickedClass] = useState<string | null>();
  const [filter, setFilter] = useState<Filter>("All");
  const [bookedIds, setBookedIds] = useState<Set<string>>(new Set());
  const [activeId, setActiveId] = useState<string | null>(null);

  const today = now ? weekdayOf(now) : null;
  const day: Weekday = pickedDay ?? (isWeekday(paramDay) ? paramDay : today ?? "Mon");
  const classFilter = pickedClass === undefined ? paramClass : pickedClass;
  const classFilterTitle = classFilter ? getClass(classFilter)?.title : undefined;

  const matches = (slot: ScheduleSlot) => {
    const cls = getClass(slot.classSlug);
    if (classFilterTitle && slot.classSlug !== classFilter) return false;
    return filter === "All" || cls?.category === filter;
  };

  const slots = getSlotsByDay(day).filter(matches);

  const leftFor = (slot: ScheduleSlot) => {
    const base = spotsLeft(slot);
    return bookedIds.has(slot.id) && base > 0 ? base - 1 : base;
  };
  const isPast = (slot: ScheduleSlot) => !!now && day === today && slot.start <= hhmm(now);

  const activeSlot = getSlotsByDay(day).find((s) => s.id === activeId) ?? null;
  const activeCls = activeSlot ? getClass(activeSlot.classSlug) : null;
  const activeCoach = activeSlot ? getTrainer(activeSlot.trainerId) : null;
  const activeBooked = activeSlot ? bookedIds.has(activeSlot.id) : false;
  const activeWasFull = activeSlot ? spotsLeft(activeSlot) === 0 : false;
  const activeLeft = activeSlot ? leftFor(activeSlot) : 0;
  const activeDate = strip.find((d) => d.day === day)?.date ?? null;

  function book(id: string) {
    setBookedIds((prev) => new Set(prev).add(id));
  }

  // Keep the selected day visible in the swipeable strip on phones.
  const stripRef = useRef<HTMLDivElement>(null);
  const firstStripDay = strip[0].day;
  useEffect(() => {
    const el = stripRef.current;
    const tab = el?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!el || !tab || el.scrollWidth <= el.clientWidth) return;
    el.scrollTo({ left: Math.max(0, tab.offsetLeft - 20), behavior: "smooth" });
  }, [day, firstStripDay]);

  return (
    <div className="flex flex-col gap-5">
      {/* ── Day strip ── */}
      <div
        ref={stripRef}
        role="tablist"
        aria-label="Choose a day"
        className="scrollbar-none relative -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:grid md:grid-cols-7 md:overflow-visible md:px-0"
      >
        {strip.map(({ day: d, date }) => {
          const active = d === day;
          const count = getSlotsByDay(d).filter(matches).length;
          const isToday = !!date && d === today && date.getDate() === now?.getDate();
          return (
            <button
              key={d}
              type="button"
              role="tab"
              aria-selected={active}
              aria-label={`${WEEKDAY_LABELS[d]}, ${count} ${count === 1 ? "class" : "classes"}`}
              onClick={() => {
                setPickedDay(d);
                setActiveId(null);
              }}
              className={cn(
                "flex min-h-16 min-w-16 shrink-0 cursor-pointer flex-col items-center justify-center rounded-xl border px-3 py-2 transition-colors duration-150",
                active
                  ? "border-bronze bg-bronze text-ink"
                  : "border-line bg-charcoal text-bone-muted hover:border-oak/40 hover:text-bone",
              )}
            >
              <span className="font-display text-[11px] uppercase tracking-widest">
                {isToday ? "Today" : d}
              </span>
              <span className="font-display text-xl leading-tight">
                {date ? date.getDate() : d.slice(0, 1)}
              </span>
              <span className={cn("text-[10px]", active ? "text-ink/70" : "text-bone-faint")}>
                {count} {count === 1 ? "class" : "classes"}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Category filter ── */}
      <div
        role="group"
        aria-label="Filter by category"
        className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0"
      >
        {(["All", ...CATEGORIES] as Filter[]).map((f) => {
          const active = f === filter;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f)}
              className={cn(
                "min-h-10 shrink-0 cursor-pointer rounded-full border px-4 text-xs font-medium uppercase tracking-wider transition-colors duration-150",
                active
                  ? "border-bronze bg-bronze/15 text-bronze"
                  : "border-line bg-charcoal text-bone-muted hover:border-oak/40 hover:text-bone",
              )}
            >
              {f}
            </button>
          );
        })}
        {classFilterTitle && (
          <button
            type="button"
            onClick={() => setPickedClass(null)}
            className="inline-flex min-h-10 shrink-0 cursor-pointer items-center gap-2 rounded-full border border-oak/50 bg-oak/10 px-4 text-xs font-medium uppercase tracking-wider text-oak-soft"
          >
            {classFilterTitle}
            <X className="h-3.5 w-3.5" aria-hidden />
            <span className="sr-only">Clear class filter</span>
          </button>
        )}
      </div>

      {/* ── Heading for the chosen day ── */}
      <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
        <h2 className="font-display text-2xl uppercase text-bone">
          {WEEKDAY_LABELS[day]}
          {activeDate && (
            <span className="ml-2 text-base text-bone-faint">
              {activeDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </span>
          )}
        </h2>
        <p className="text-xs text-bone-faint" aria-live="polite">
          {slots.length} {slots.length === 1 ? "session" : "sessions"}
        </p>
      </div>

      {/* ── Class list ── */}
      {slots.length > 0 ? (
        <ul className="flex flex-col gap-2.5">
          {slots.map((slot) => (
            <li key={slot.id}>
              <ClassRow
                slot={slot}
                left={leftFor(slot)}
                isBooked={bookedIds.has(slot.id)}
                isPast={isPast(slot)}
                onClick={() => setActiveId(slot.id)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-line bg-charcoal px-6 py-14 text-center">
          <p className="font-display text-lg uppercase tracking-wider text-bone-muted">
            No matching classes
          </p>
          <p className="text-sm text-bone-faint">Try another day or clear your filters.</p>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setFilter("All");
              setPickedClass(null);
            }}
          >
            Clear filters
          </Button>
        </div>
      )}

      {/* ── Legend ── */}
      <p className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-bone-faint">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1 w-5 rounded-full bg-bronze" aria-hidden /> Almost full
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1 w-5 rounded-full bg-red-400/70" aria-hidden /> Waitlist only
        </span>
        <span>Members book 7 days ahead · cancel free up to 8h before</span>
      </p>

      {/* ── Booking dialog ── */}
      <Dialog open={!!activeSlot} onClose={() => setActiveId(null)} title={activeCls?.title}>
        {activeSlot && activeCls && (
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge tone={CATEGORY_STYLE[activeCls.category].tone}>{activeCls.category}</Badge>
              <Badge>{activeCls.intensity}</Badge>
              <Badge>
                <Clock className="h-3 w-3" />
                {activeCls.durationMin} min
              </Badge>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-bone-muted">{activeCls.description}</p>

            <dl className="mt-5">
              <div className="flex items-center justify-between gap-4 border-b border-line py-3 text-sm">
                <dt className="text-bone-faint">When</dt>
                <dd className="text-right font-medium text-bone">
                  {activeDate
                    ? activeDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
                    : WEEKDAY_LABELS[day]}{" "}
                  · {formatTime12(activeSlot.start)}–{formatTime12(activeSlot.end)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-line py-3 text-sm">
                <dt className="text-bone-faint">Coach</dt>
                <dd className="flex items-center gap-2 font-medium text-bone">
                  {activeCoach && (
                    <Avatar
                      initials={activeCoach.initials}
                      image={activeCoach.image}
                      colorKey={activeCoach.id}
                      size="sm"
                      className="h-6 w-6 text-[9px]"
                    />
                  )}
                  {activeCoach?.name ?? "-"}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-3 text-sm">
                <dt className="text-bone-faint">Availability</dt>
                <dd className="text-right font-medium text-bone">
                  {activeWasFull
                    ? "Full · waitlist open"
                    : `${activeLeft} of ${activeSlot.capacity} spots left`}
                </dd>
              </div>
            </dl>

            {activeBooked ? (
              <div
                role="status"
                className="mt-5 flex items-start gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-200"
              >
                <Check className="mt-0.5 h-5 w-5 shrink-0" />
                <span>
                  {activeWasFull
                    ? "You're on the waitlist. We'll text you if a spot opens up."
                    : "You're booked in. A confirmation is on its way - see you on the floor!"}
                </span>
              </div>
            ) : (
              <Button size="lg" className="mt-5 w-full" onClick={() => book(activeSlot.id)}>
                {activeWasFull ? "Join the waitlist" : "Confirm booking"}
              </Button>
            )}

            <div className="mt-4 flex items-center justify-between gap-4 text-xs">
              <span className="text-bone-faint">Demo only - no booking is made.</span>
              <Link
                href={`/classes/${activeCls.slug}`}
                className="inline-flex min-h-11 items-center gap-1 text-oak-soft hover:text-bone"
              >
                Class details <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}
