import type { FitnessClass } from "@/types";

export const classes: FitnessClass[] = [
  {
    slug: "iron-foundations",
    title: "Iron Foundations",
    tagline: "Barbell fundamentals, done right.",
    description:
      "The on-ramp to everything we do. Learn the squat, hinge, press and pull with a coach watching every rep. Leave knowing how to train safely and load with confidence.",
    category: "Strength",
    intensity: "All levels",
    durationMin: 60,
    coachId: "marcus",
    focus: ["Technique", "Full body", "Confidence"],
    whatToBring: ["Flat shoes", "Water", "A notebook (optional)"],
  },
  {
    slug: "forge",
    title: "Forge",
    tagline: "Heavy, structured strength.",
    description:
      "Progressive barbell strength built across the week. Squat, bench, deadlift and accessories, programmed to add weight to the bar month over month.",
    category: "Strength",
    intensity: "High",
    durationMin: 60,
    coachId: "marcus",
    focus: ["Max strength", "Progressive overload", "Barbell"],
    whatToBring: ["Flat shoes", "Belt (optional)", "Water"],
  },
  {
    slug: "ember-hiit",
    title: "Ember HIIT",
    tagline: "Short, sharp, relentless.",
    description:
      "Forty-five minutes of intervals that climb and burn. Bikes, sleds and bodyweight stations stacked to spike your heart rate and keep it there.",
    category: "Conditioning",
    intensity: "High",
    durationMin: 45,
    coachId: "nadia",
    focus: ["Conditioning", "Fat loss", "Engine"],
    whatToBring: ["Towel", "Water", "Grit"],
  },
  {
    slug: "summit",
    title: "Summit",
    tagline: "Build the engine that lasts.",
    description:
      "Aerobic capacity work for runners, riders and anyone chasing endurance. Steady efforts and tempo intervals that grow your base without grinding you down.",
    category: "Endurance",
    intensity: "Moderate",
    durationMin: 50,
    coachId: "nadia",
    focus: ["Aerobic base", "Pacing", "Endurance"],
    whatToBring: ["Running shoes", "Water", "Heart-rate strap (optional)"],
  },
  {
    slug: "kettle-forge",
    title: "Kettle Forge",
    tagline: "Strength and grace, one bell at a time.",
    description:
      "Full-body kettlebell flows that build grip, posture and work capacity. Equal parts strength and skill, scalable to any level.",
    category: "Conditioning",
    intensity: "Moderate",
    durationMin: 45,
    coachId: "saanvi",
    focus: ["Kettlebell", "Core", "Conditioning"],
    whatToBring: ["Flat shoes", "Water", "Wrist guards (optional)"],
  },
  {
    slug: "grit",
    title: "Grit",
    tagline: "Performance for athletes.",
    description:
      "Explosive strength, sprint mechanics and power output for athletes who compete. Demanding, technical, and built to transfer to your sport.",
    category: "Conditioning",
    intensity: "High",
    durationMin: 45,
    coachId: "darius",
    focus: ["Power", "Speed", "Athleticism"],
    whatToBring: ["Trainers", "Water", "Game face"],
  },
  {
    slug: "oak-flow",
    title: "Oak Flow",
    tagline: "Move freely. Train longer.",
    description:
      "A grounded mobility and yoga-inspired flow to open the hips, shoulders and spine. The work that keeps you training pain-free for decades.",
    category: "Mobility",
    intensity: "Low",
    durationMin: 45,
    coachId: "theo",
    focus: ["Mobility", "Breath", "Recovery"],
    whatToBring: ["Comfortable kit", "Water", "Bare feet"],
  },
  {
    slug: "restore",
    title: "Restore",
    tagline: "Recover like it matters.",
    description:
      "Soft-tissue work, breathing and guided stretching to flush a hard week of training. The session that makes everything else possible.",
    category: "Mobility",
    intensity: "Low",
    durationMin: 40,
    coachId: "theo",
    focus: ["Recovery", "Soft tissue", "Breath"],
    whatToBring: ["Comfortable kit", "Water"],
  },
];

export function getClass(slug: string): FitnessClass | undefined {
  return classes.find((c) => c.slug === slug);
}

export function getClassesByCoach(coachId: string): FitnessClass[] {
  return classes.filter((c) => c.coachId === coachId);
}
