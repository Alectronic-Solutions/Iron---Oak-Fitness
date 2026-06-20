import type { ClassPack, MembershipPlan } from "@/types";

export const plans: MembershipPlan[] = [
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

export const classPacks: ClassPack[] = [
  { id: "drop-in", name: "Drop-in", classes: 1, price: 22, validityDays: 30 },
  { id: "pack-5", name: "5-Class Pack", classes: 5, price: 95, validityDays: 60 },
  { id: "pack-10", name: "10-Class Pack", classes: 10, price: 170, validityDays: 90 },
  { id: "pack-20", name: "20-Class Pack", classes: 20, price: 300, validityDays: 120 },
];

export function getPlan(id: string): MembershipPlan | undefined {
  return plans.find((p) => p.id === id);
}

/** Price per class for a pack. */
export function perClass(pack: ClassPack): number {
  return Math.round((pack.price / pack.classes) * 100) / 100;
}
