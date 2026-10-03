"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function BillingToggle({
  annual,
  onChange,
}: {
  annual: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <button
        type="button"
        onClick={() => onChange(false)}
        className={cn(
          "min-h-11 cursor-pointer font-display uppercase tracking-widest transition-colors",
          !annual ? "text-bone" : "text-bone-faint hover:text-bone-muted",
        )}
      >
        Monthly
      </button>

      <button
        type="button"
        role="switch"
        aria-checked={annual}
        aria-label="Bill annually"
        onClick={() => onChange(!annual)}
        className="relative h-6 w-11 cursor-pointer rounded-full border border-line bg-charcoal-2 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 700, damping: 36 }}
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full",
            annual ? "right-0.5 bg-bronze" : "left-0.5 bg-bone-faint",
          )}
        />
      </button>

      <button
        type="button"
        onClick={() => onChange(true)}
        className={cn(
          "min-h-11 cursor-pointer font-display uppercase tracking-widest transition-colors",
          annual ? "text-bone" : "text-bone-faint hover:text-bone-muted",
        )}
      >
        Annual
        <span className="ml-1.5 rounded-full bg-moss px-2 py-0.5 text-[0.6rem] text-oak-soft">
          Save 15%
        </span>
      </button>
    </div>
  );
}
