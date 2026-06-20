import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Tone = "default" | "oak" | "success" | "danger" | "muted" | "conditioning" | "mobility" | "endurance";

const tones: Record<Tone, string> = {
  default: "bg-charcoal-2 text-bone-muted border border-line",
  oak: "bg-oak/15 text-oak-soft border border-oak/30",
  success: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/25",
  danger: "bg-red-500/15 text-red-300 border border-red-500/25",
  muted: "bg-charcoal text-bone-faint border border-line",
  conditioning: "badge-conditioning",
  mobility: "badge-mobility",
  endurance: "badge-endurance",
};

interface BadgeProps extends ComponentProps<"span"> {
  tone?: Tone;
}

export function Badge({ tone = "default", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
