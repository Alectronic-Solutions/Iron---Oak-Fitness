import type { ClassCategory } from "@/types";

/** Badge tone + accent border per class category. Single source so the
 *  schedule, class cards and detail pages always agree. */
export const CATEGORY_STYLE: Record<
  ClassCategory,
  { tone: "oak" | "conditioning" | "mobility" | "endurance"; border: string; blurb: string }
> = {
  Strength: {
    tone: "oak",
    border: "border-l-oak",
    blurb: "Barbell-led sessions that build real, lasting strength.",
  },
  Conditioning: {
    tone: "conditioning",
    border: "border-l-amber-500",
    blurb: "Intervals, kettlebells and power work to build your engine.",
  },
  Mobility: {
    tone: "mobility",
    border: "border-l-emerald-500",
    blurb: "Flow, breath and recovery so you can train for decades.",
  },
  Endurance: {
    tone: "endurance",
    border: "border-l-blue-500",
    blurb: "Aerobic base and pacing work for runners, riders and everyone else.",
  },
};

export const CATEGORIES = Object.keys(CATEGORY_STYLE) as ClassCategory[];
