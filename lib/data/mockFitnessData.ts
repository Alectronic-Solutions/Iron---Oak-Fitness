/**
 * Centralized mock data store for Iron & Oak Fitness.
 *
 * Provides:
 *  - `membershipTiers`  - 3 plans with features, price, and CTA text
 *  - `weeklySchedule`   - denormalized, display-ready schedule entries
 *
 * All upstream typed arrays (classes, trainers, schedule, plans, member)
 * are re-exported here so components can import from a single location.
 */

import type { MembershipPlan, WeeklyScheduleEntry } from "@/types";
import { classes } from "./classes";
import { trainers } from "./trainers";
import { schedule } from "./schedule";

// ---------------------------------------------------------------------------
// Re-exports - single import surface for consumers
// ---------------------------------------------------------------------------
export { classes, getClass, getClassesByCoach } from "./classes";
export { trainers, getTrainer, getTrainerBySlug } from "./trainers";
export { schedule, getSlotsByDay, getSlotsForClass, spotsLeft, isFull } from "./schedule";
export { plans, classPacks, getPlan, perClass } from "./plans";
export { demoMember } from "./members";

// ---------------------------------------------------------------------------
// Membership tiers
// ---------------------------------------------------------------------------

/** The three membership tiers with price, feature list, and CTA text. */
export const membershipTiers: MembershipPlan[] = [
  {
    id: "essential",
    name: "Essential",
    priceMonthly: 79,
    blurb: "For the member finding their rhythm.",
    ctaText: "Start Essential",
    perks: [
      "8 group classes per month",
      "Full gym floor access",
      "Iron & Oak member app",
      "Free Iron Foundations on-ramp",
    ],
  },
  {
    id: "unlimited",
    name: "Unlimited",
    priceMonthly: 129,
    blurb: "Our most popular membership.",
    ctaText: "Join Unlimited",
    highlighted: true,
    badge: "Most popular",
    perks: [
      "Unlimited group classes",
      "Full gym floor access",
      "1 personal-training session monthly",
      "Priority class booking",
      "Guest passes (2 / month)",
    ],
  },
  {
    id: "performance",
    name: "Performance",
    priceMonthly: 199,
    blurb: "For the athlete who wants it all.",
    ctaText: "Go Performance",
    perks: [
      "Everything in Unlimited",
      "4 personal-training sessions monthly",
      "Recovery & mobility programming",
      "Body-composition assessments",
      "Unlimited guest passes",
    ],
  },
];

// ---------------------------------------------------------------------------
// Weekly schedule - denormalized for display
// ---------------------------------------------------------------------------

/** Joins each ScheduleSlot with its FitnessClass and Trainer records so
 *  UI components never need to look up related data separately. */
export const weeklySchedule: WeeklyScheduleEntry[] = schedule.map((slot) => {
  const cls = classes.find((c) => c.slug === slot.classSlug)!;
  const trainer = trainers.find((t) => t.id === slot.trainerId)!;
  const durationMin =
    (() => {
      const [sh, sm] = slot.start.split(":").map(Number);
      const [eh, em] = slot.end.split(":").map(Number);
      return (eh * 60 + em) - (sh * 60 + sm);
    })();

  return {
    id: slot.id,
    classSlug: slot.classSlug,
    className: cls.title,
    tagline: cls.tagline,
    category: cls.category,
    intensity: cls.intensity,
    tags: cls.focus,
    trainerId: slot.trainerId,
    trainerName: trainer.name,
    day: slot.day,
    start: slot.start,
    end: slot.end,
    durationMin,
    capacity: slot.capacity,
    booked: slot.booked,
  };
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function getTier(id: string): MembershipPlan | undefined {
  return membershipTiers.find((t) => t.id === id);
}

export function getScheduleByDay(
  day: WeeklyScheduleEntry["day"]
): WeeklyScheduleEntry[] {
  return weeklySchedule
    .filter((e) => e.day === day)
    .sort((a, b) => a.start.localeCompare(b.start));
}

export function getScheduleByCategory(
  category: WeeklyScheduleEntry["category"]
): WeeklyScheduleEntry[] {
  return weeklySchedule.filter((e) => e.category === category);
}

export function spotsRemaining(entry: WeeklyScheduleEntry): number {
  return Math.max(0, entry.capacity - entry.booked);
}

export function isEntryFull(entry: WeeklyScheduleEntry): boolean {
  return entry.booked >= entry.capacity;
}
