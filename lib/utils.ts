import type { Weekday } from "@/types";

/** Join truthy class names. Lightweight stand-in for clsx. */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

/** Format a USD price; shows cents only when non-integer. */
export function formatPrice(amount: number): string {
  const hasCents = !Number.isInteger(amount);
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: hasCents ? 2 : 0,
  });
}

export const WEEKDAYS: Weekday[] = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];

export const WEEKDAY_LABELS: Record<Weekday, string> = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

/** Sort weekdays into calendar order. */
export function byWeekday(a: Weekday, b: Weekday): number {
  return WEEKDAYS.indexOf(a) - WEEKDAYS.indexOf(b);
}

/** Discount applied to membership pricing when billed annually. */
export const ANNUAL_DISCOUNT = 0.15;

/** Effective monthly price for a plan, discounted when billed annually. */
export function displayPrice(monthly: number, annual: boolean): number {
  const base = annual ? monthly * (1 - ANNUAL_DISCOUNT) : monthly;
  return Math.round(base);
}

/** Deliberately loose: catches typos without rejecting valid addresses. */
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
