"use client";

import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getClass } from "@/lib/data/classes";
import { getTrainer } from "@/lib/data/trainers";
import { getSlotsByDay, spotsLeft } from "@/lib/data/schedule";
import { formatTime12 } from "@/lib/site";
import { hhmm, openStatus, useNow, weekdayOf } from "@/lib/useNow";
import { WEEKDAYS } from "@/lib/utils";
import type { ScheduleSlot, Weekday } from "@/types";

/** The next three sessions from now - rolling into tomorrow when today's
 *  are done. Before hydration it shows Monday's first sessions. */
function upcoming(now: Date | null): { label: string; day: Weekday; slots: ScheduleSlot[] } {
  if (!now) return { label: "Up next", day: "Mon", slots: getSlotsByDay("Mon").slice(0, 3) };

  const today = weekdayOf(now);
  const later = getSlotsByDay(today).filter((s) => s.start > hhmm(now));
  if (later.length > 0) return { label: "Today at the studio", day: today, slots: later.slice(0, 3) };

  const tomorrow = WEEKDAYS[(WEEKDAYS.indexOf(today) + 1) % 7];
  return { label: "Tomorrow at the studio", day: tomorrow, slots: getSlotsByDay(tomorrow).slice(0, 3) };
}

export function TodayAtStudio() {
  const now = useNow();
  const { label, day, slots } = upcoming(now);
  const status = now ? openStatus(now) : null;

  return (
    <Card className="border-white/10 bg-ink/55 p-5 shadow-2xl backdrop-blur-md sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="eyebrow">{label}</p>
        {status && (
          <Badge tone={status.open ? "success" : "muted"}>{status.open ? "Open now" : "Closed"}</Badge>
        )}
      </div>
      <ul className="mt-4 space-y-2.5">
        {slots.map((slot) => {
          const cls = getClass(slot.classSlug);
          const coach = getTrainer(slot.trainerId);
          const left = spotsLeft(slot);
          return (
            <li key={slot.id}>
              <Link
                href={`/schedule?day=${day}&class=${slot.classSlug}`}
                className="flex items-center gap-3 rounded-xl border border-white/8 bg-ink/50 p-3 transition-colors hover:border-oak/40 sm:gap-4"
              >
                <p className="w-14 shrink-0 font-display text-lg text-bone">{formatTime12(slot.start)}</p>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display uppercase text-bone">{cls?.title}</p>
                  <p className="flex items-center gap-1.5 truncate text-xs text-bone-faint">
                    {coach && (
                      <Avatar
                        initials={coach.initials}
                        image={coach.image}
                        colorKey={coach.id}
                        size="sm"
                        className="h-4 w-4 shrink-0 text-[8px]"
                      />
                    )}
                    {coach?.name}
                  </p>
                </div>
                <Badge tone={left === 0 ? "danger" : left <= 3 ? "oak" : "success"}>
                  {left === 0 ? "Waitlist" : `${left} left`}
                </Badge>
              </Link>
            </li>
          );
        })}
      </ul>
      <ButtonLink href="/schedule" variant="secondary" className="mt-5 w-full">
        See full schedule
      </ButtonLink>
    </Card>
  );
}
