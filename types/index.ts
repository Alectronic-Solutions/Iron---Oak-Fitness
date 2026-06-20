// Shared domain types for the Iron & Oak demo. All data is mock.

export type Weekday = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export type ClassCategory =
  | "Strength"
  | "Conditioning"
  | "Mobility"
  | "Endurance";

export type Intensity = "Low" | "Moderate" | "High" | "All levels";

export interface FitnessClass {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: ClassCategory;
  intensity: Intensity;
  durationMin: number;
  /** Lead trainer id. */
  coachId: string;
  focus: string[];
  whatToBring: string[];
}

export interface ScheduleSlot {
  id: string;
  classSlug: string;
  trainerId: string;
  day: Weekday;
  /** 24h "HH:MM" */
  start: string;
  end: string;
  capacity: number;
  booked: number;
}

export interface AvailabilityWindow {
  day: Weekday;
  /** 24h start times the trainer is free for 1-on-1 sessions. */
  slots: string[];
}

export interface Trainer {
  id: string;
  slug: string;
  name: string;
  role: string;
  initials: string;
  image?: string;
  yearsExperience: number;
  specialties: string[];
  certifications: string[];
  bio: string;
  availability: AvailabilityWindow[];
}

export interface MembershipPlan {
  id: string;
  name: string;
  priceMonthly: number;
  blurb: string;
  perks: string[];
  ctaText: string;
  highlighted?: boolean;
  badge?: string;
}

/** A display-ready, denormalized schedule entry joining slot + class + trainer data. */
export interface WeeklyScheduleEntry {
  id: string;
  classSlug: string;
  className: string;
  tagline: string;
  category: ClassCategory;
  intensity: Intensity;
  tags: string[];
  trainerId: string;
  trainerName: string;
  day: Weekday;
  start: string;
  end: string;
  durationMin: number;
  capacity: number;
  booked: number;
}

export interface ClassPack {
  id: string;
  name: string;
  /** Number of classes; 1 = single drop-in. */
  classes: number;
  price: number;
  validityDays: number;
}

export interface MemberBooking {
  id: string;
  type: "class" | "appointment";
  title: string;
  trainer: string;
  date: string; // e.g. "Mon 22 Jun"
  time: string; // "06:00"
  status: "confirmed" | "waitlist";
}

export interface Payment {
  id: string;
  date: string; // "01 Jun 2026"
  description: string;
  amount: number;
  status: "paid" | "upcoming";
}

export interface Member {
  name: string;
  email: string;
  initials: string;
  memberSince: string;
  planId: string;
  packBalance: number;
  bookings: MemberBooking[];
  payments: Payment[];
}
