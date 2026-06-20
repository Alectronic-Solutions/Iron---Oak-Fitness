import type { ScheduleSlot, Weekday } from "@/types";

/** A representative weekly group-class timetable. Some slots are full to
 *  demonstrate the waitlist state. */
export const schedule: ScheduleSlot[] = [
  // ---- Monday ----
  { id: "mon-0600-iron", classSlug: "iron-foundations", trainerId: "marcus", day: "Mon", start: "06:00", end: "07:00", capacity: 14, booked: 9 },
  { id: "mon-0700-ember", classSlug: "ember-hiit", trainerId: "nadia", day: "Mon", start: "07:00", end: "07:45", capacity: 16, booked: 16 },
  { id: "mon-1200-flow", classSlug: "oak-flow", trainerId: "theo", day: "Mon", start: "12:00", end: "12:45", capacity: 12, booked: 5 },
  { id: "mon-1700-forge", classSlug: "forge", trainerId: "marcus", day: "Mon", start: "17:00", end: "18:00", capacity: 12, booked: 11 },
  { id: "mon-1800-grit", classSlug: "grit", trainerId: "darius", day: "Mon", start: "18:00", end: "18:45", capacity: 14, booked: 8 },

  // ---- Tuesday ----
  { id: "tue-0600-kettle", classSlug: "kettle-forge", trainerId: "saanvi", day: "Tue", start: "06:00", end: "06:45", capacity: 14, booked: 12 },
  { id: "tue-0900-summit", classSlug: "summit", trainerId: "nadia", day: "Tue", start: "09:00", end: "09:50", capacity: 16, booked: 7 },
  { id: "tue-1200-restore", classSlug: "restore", trainerId: "theo", day: "Tue", start: "12:00", end: "12:40", capacity: 12, booked: 4 },
  { id: "tue-1800-ember", classSlug: "ember-hiit", trainerId: "nadia", day: "Tue", start: "18:00", end: "18:45", capacity: 16, booked: 14 },

  // ---- Wednesday ----
  { id: "wed-0600-forge", classSlug: "forge", trainerId: "marcus", day: "Wed", start: "06:00", end: "07:00", capacity: 12, booked: 10 },
  { id: "wed-0800-grit", classSlug: "grit", trainerId: "darius", day: "Wed", start: "08:00", end: "08:45", capacity: 14, booked: 9 },
  { id: "wed-1200-flow", classSlug: "oak-flow", trainerId: "theo", day: "Wed", start: "12:00", end: "12:45", capacity: 12, booked: 6 },
  { id: "wed-1700-iron", classSlug: "iron-foundations", trainerId: "marcus", day: "Wed", start: "17:00", end: "18:00", capacity: 14, booked: 13 },
  { id: "wed-1900-restore", classSlug: "restore", trainerId: "theo", day: "Wed", start: "19:00", end: "19:40", capacity: 12, booked: 3 },

  // ---- Thursday ----
  { id: "thu-0600-kettle", classSlug: "kettle-forge", trainerId: "saanvi", day: "Thu", start: "06:00", end: "06:45", capacity: 14, booked: 11 },
  { id: "thu-0900-summit", classSlug: "summit", trainerId: "nadia", day: "Thu", start: "09:00", end: "09:50", capacity: 16, booked: 8 },
  { id: "thu-1800-ember", classSlug: "ember-hiit", trainerId: "nadia", day: "Thu", start: "18:00", end: "18:45", capacity: 16, booked: 16 },
  { id: "thu-1900-flow", classSlug: "oak-flow", trainerId: "theo", day: "Thu", start: "19:00", end: "19:45", capacity: 12, booked: 5 },

  // ---- Friday ----
  { id: "fri-0600-forge", classSlug: "forge", trainerId: "marcus", day: "Fri", start: "06:00", end: "07:00", capacity: 12, booked: 9 },
  { id: "fri-1200-flow", classSlug: "oak-flow", trainerId: "theo", day: "Fri", start: "12:00", end: "12:45", capacity: 12, booked: 7 },
  { id: "fri-1600-grit", classSlug: "grit", trainerId: "darius", day: "Fri", start: "16:00", end: "16:45", capacity: 14, booked: 10 },
  { id: "fri-1700-iron", classSlug: "iron-foundations", trainerId: "marcus", day: "Fri", start: "17:00", end: "18:00", capacity: 14, booked: 12 },

  // ---- Saturday ----
  { id: "sat-0800-ember", classSlug: "ember-hiit", trainerId: "nadia", day: "Sat", start: "08:00", end: "08:45", capacity: 18, booked: 15 },
  { id: "sat-0900-kettle", classSlug: "kettle-forge", trainerId: "saanvi", day: "Sat", start: "09:00", end: "09:45", capacity: 14, booked: 13 },
  { id: "sat-1000-flow", classSlug: "oak-flow", trainerId: "theo", day: "Sat", start: "10:00", end: "10:45", capacity: 14, booked: 9 },

  // ---- Sunday ----
  { id: "sun-0900-restore", classSlug: "restore", trainerId: "theo", day: "Sun", start: "09:00", end: "09:40", capacity: 14, booked: 6 },
  { id: "sun-1000-flow", classSlug: "oak-flow", trainerId: "theo", day: "Sun", start: "10:00", end: "10:45", capacity: 14, booked: 8 },
];

export function getSlotsByDay(day: Weekday): ScheduleSlot[] {
  return schedule
    .filter((s) => s.day === day)
    .sort((a, b) => a.start.localeCompare(b.start));
}

export function getSlotsForClass(classSlug: string): ScheduleSlot[] {
  return schedule.filter((s) => s.classSlug === classSlug);
}

export function spotsLeft(slot: ScheduleSlot): number {
  return Math.max(0, slot.capacity - slot.booked);
}

export function isFull(slot: ScheduleSlot): boolean {
  return slot.booked >= slot.capacity;
}
