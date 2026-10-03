"use client";

import { useSyncExternalStore } from "react";
import { HOURS, formatTime12 } from "@/lib/site";
import type { Weekday } from "@/types";

const MINUTE = 60_000;

function subscribe(callback: () => void) {
  const id = window.setInterval(callback, MINUTE);
  return () => window.clearInterval(id);
}

// Minute resolution keeps the snapshot stable between renders.
const getSnapshot = () => Math.floor(Date.now() / MINUTE) * MINUTE;
const getServerSnapshot = () => null;

/** The current time (to the minute) on the client, `null` during SSR and
 *  hydration. The site is statically exported, so anything date-dependent
 *  must render a neutral fallback first. */
export function useNow(): Date | null {
  const ts = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return ts === null ? null : new Date(ts);
}

const JS_DAY_TO_WEEKDAY: Weekday[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function weekdayOf(date: Date): Weekday {
  return JS_DAY_TO_WEEKDAY[date.getDay()];
}

/** "HH:MM" for a Date, for comparing against schedule times. */
export function hhmm(date: Date): string {
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

/** Whether the studio is open at `date`, and the next change. */
export function openStatus(date: Date): { open: boolean; label: string } {
  const today = HOURS.find((h) => h.dayIndexes.includes(date.getDay()));
  const now = hhmm(date);
  if (today && now >= today.open && now < today.close) {
    return { open: true, label: `Open now · until ${formatTime12(today.close)}` };
  }
  if (today && now < today.open) {
    return { open: false, label: `Closed · opens ${formatTime12(today.open)}` };
  }
  const tomorrow = HOURS.find((h) => h.dayIndexes.includes((date.getDay() + 1) % 7));
  return {
    open: false,
    label: tomorrow ? `Closed · opens ${formatTime12(tomorrow.open)} tomorrow` : "Closed",
  };
}
