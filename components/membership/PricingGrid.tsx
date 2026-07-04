"use client";

import { useState } from "react";
import { BillingToggle } from "@/components/membership/BillingToggle";
import { PricingCard } from "@/components/membership/PricingCard";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import type { MembershipPlan } from "@/types";

export function PricingGrid({ plans }: { plans: MembershipPlan[] }) {
  const [annual, setAnnual] = useState(false);

  return (
    <div>
      <div className="flex justify-center">
        <BillingToggle annual={annual} onChange={setAnnual} />
      </div>
      <div className="mt-8 grid gap-5 pt-5 md:grid-cols-3">
        {plans.map((plan, i) => (
          <Reveal key={plan.id} delay={Math.min(i * 0.08, 0.24)}>
            <TiltCard className="h-full">
              <PricingCard plan={plan} annual={annual} />
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
