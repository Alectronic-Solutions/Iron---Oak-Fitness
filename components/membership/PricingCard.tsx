"use client";

import { Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn, displayPrice, formatPrice } from "@/lib/utils";
import type { MembershipPlan } from "@/types";

export function PricingCard({
  plan,
  annual = false,
}: {
  plan: MembershipPlan;
  annual?: boolean;
}) {
  const price = displayPrice(plan.priceMonthly, annual);

  return (
    <Card
      className={cn(
        "relative flex h-full flex-col p-6 sm:p-8",
        plan.highlighted && "border-oak/60 bg-charcoal-2 shadow-xl",
      )}
    >
      {plan.badge && (
        <Badge
          tone="oak"
          className="absolute -top-3 left-6 bg-bronze text-ink"
        >
          {plan.badge}
        </Badge>
      )}
      <h3 className="text-2xl uppercase text-bone">{plan.name}</h3>
      <p className="mt-1 text-sm text-bone-muted">{plan.blurb}</p>

      <div className="relative mt-5 flex items-baseline gap-1.5">
        <AnimatePresence mode="wait">
          <motion.span
            key={annual ? "annual" : "monthly"}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.22 }}
            className="font-display text-5xl text-bone"
          >
            {formatPrice(price)}
          </motion.span>
        </AnimatePresence>
        <span className="text-sm text-bone-faint">/ month</span>
      </div>
      {annual && (
        <p className="mt-1 text-xs text-oak-soft">
          Save {formatPrice((plan.priceMonthly - price) * 12)}/year
        </p>
      )}

      <ul className="mt-6 flex-1 space-y-3">
        {plan.perks.map((perk) => (
          <li key={perk} className="flex gap-3 text-sm text-bone-muted">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-oak" />
            <span>{perk}</span>
          </li>
        ))}
      </ul>

      <ButtonLink
        href="/account"
        variant={plan.highlighted ? "primary" : "secondary"}
        size="lg"
        className="mt-8 w-full"
      >
        Choose {plan.name}
      </ButtonLink>
    </Card>
  );
}
