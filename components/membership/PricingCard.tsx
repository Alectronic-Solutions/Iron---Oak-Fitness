import { Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn, formatPrice } from "@/lib/utils";
import type { MembershipPlan } from "@/types";

export function PricingCard({ plan }: { plan: MembershipPlan }) {
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

      <div className="mt-5 flex items-baseline gap-1.5">
        <span className="font-display text-5xl text-bone">
          {formatPrice(plan.priceMonthly)}
        </span>
        <span className="text-sm text-bone-faint">/ month</span>
      </div>

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
