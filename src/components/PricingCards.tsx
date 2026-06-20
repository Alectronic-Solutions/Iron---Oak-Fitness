"use client";

import { useState } from "react";
import { Check, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { plans } from "@/lib/data/plans";
import { cn } from "@/lib/utils";
import type { MembershipPlan } from "@/types";

const ANNUAL_DISCOUNT = 0.15; // 15 % off when billed annually

/* ── helpers ───────────────────────────────────────────── */
function displayPrice(monthly: number, annual: boolean) {
  const base = annual ? monthly * (1 - ANNUAL_DISCOUNT) : monthly;
  return Math.round(base);
}

/* ── sub-components ─────────────────────────────────────── */
function PerkRow({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3 text-sm text-bone-muted">
      <Check className="mt-0.5 h-4 w-4 shrink-0 text-oak" aria-hidden />
      <span>{text}</span>
    </li>
  );
}

function GlowBorder() {
  return (
    <>
      {/* animated glow ring */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          boxShadow:
            "0 0 0 1.5px #c9a22780, 0 0 24px 4px #c9a22728, 0 0 56px 12px #b07a3c18",
        }}
      />
      {/* subtle warm gradient fill at the top */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(201,162,39,0.10) 0%, transparent 70%)",
        }}
      />
    </>
  );
}

interface CardProps {
  plan: MembershipPlan;
  annual: boolean;
  index: number;
}

function PricingCard({ plan, annual, index }: CardProps) {
  const price = displayPrice(plan.priceMonthly, annual);
  const highlight = !!plan.highlighted;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative flex flex-col rounded-2xl border p-6 sm:p-8",
        highlight
          ? "border-bronze/40 bg-charcoal-2 lg:-translate-y-3 lg:scale-[1.025]"
          : "border-line bg-charcoal",
      )}
    >
      {highlight && <GlowBorder />}

      {/* badge */}
      {plan.badge && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-bronze px-4 py-1 font-display text-[0.65rem] uppercase tracking-[0.18em] text-ink shadow-lg">
          {plan.badge}
        </span>
      )}

      {/* header */}
      <div className="relative">
        <h3 className="font-display text-2xl uppercase tracking-wide text-bone">
          {plan.name}
        </h3>
        <p className="mt-1 text-sm text-bone-muted">{plan.blurb}</p>
      </div>

      {/* price */}
      <div className="relative mt-6 flex items-end gap-1.5">
        <AnimatePresence mode="wait">
          <motion.span
            key={`${plan.id}-${annual}`}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.22 }}
            className="font-display text-5xl leading-none text-bone"
          >
            ${price}
          </motion.span>
        </AnimatePresence>
        <div className="mb-1 flex flex-col leading-tight">
          <span className="text-xs text-bone-faint">/ mo</span>
          {annual && (
            <span className="text-[0.6rem] text-oak-soft">
              billed ${Math.round(price * 12)}/yr
            </span>
          )}
        </div>
      </div>

      {annual && (
        <p className="relative mt-1 text-xs text-oak-soft">
          Save ${Math.round((plan.priceMonthly - price) * 12)}/year
        </p>
      )}

      {/* divider */}
      <div className="relative my-6 h-px bg-line" />

      {/* perks */}
      <ul className="relative flex-1 space-y-3">
        {plan.perks.map((perk) => (
          <PerkRow key={perk} text={perk} />
        ))}
      </ul>

      {/* CTA */}
      <div className="relative mt-8">
        <Link
          href="/account"
          className={cn(
            // base - always full-width, tall enough for mobile thumbs (≥ 44px)
            "flex h-14 w-full items-center justify-center gap-2 rounded-full font-display text-sm uppercase tracking-[0.12em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal",
            highlight
              ? // primary: bronze fill with subtle glow
                "bg-bronze text-ink shadow-[0_0_20px_2px_rgba(201,162,39,0.30)] hover:bg-oak-soft hover:shadow-[0_0_28px_6px_rgba(201,162,39,0.40)] active:scale-[0.98]"
              : // secondary: bordered ghost
                "border border-line text-bone hover:border-oak hover:text-oak-soft active:scale-[0.98]",
          )}
        >
          {highlight && <Zap className="h-4 w-4" aria-hidden />}
          Choose {plan.name}
        </Link>
      </div>
    </motion.div>
  );
}

/* ── billing toggle ─────────────────────────────────────── */
function BillingToggle({
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
          "font-display uppercase tracking-widest transition-colors",
          !annual ? "text-bone" : "text-bone-faint hover:text-bone-muted",
        )}
      >
        Monthly
      </button>

      {/* pill switch */}
      <button
        type="button"
        role="switch"
        aria-checked={annual}
        onClick={() => onChange(!annual)}
        className="relative h-6 w-11 rounded-full border border-line bg-charcoal-2 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
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
          "font-display uppercase tracking-widest transition-colors",
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

/* ── root export ────────────────────────────────────────── */
export function PricingCards() {
  const [annual, setAnnual] = useState(false);

  return (
    <section className="py-16 sm:py-24">
      <div className="shell">
        {/* eyebrow + heading */}
        <div className="text-center">
          <p className="eyebrow">Membership</p>
          <h2 className="mt-3 font-display text-4xl uppercase text-bone sm:text-5xl">
            Choose your plan
          </h2>
          <p className="mt-4 text-bone-muted">
            Every tier includes full gym-floor access and the member app.
            <br className="hidden sm:block" />
            No joining fee. Cancel anytime.
          </p>
        </div>

        {/* billing toggle */}
        <div className="mt-8 flex justify-center">
          <BillingToggle annual={annual} onChange={setAnnual} />
        </div>

        {/* cards grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:items-end lg:gap-8">
          {plans.map((plan, i) => (
            <PricingCard key={plan.id} plan={plan} annual={annual} index={i} />
          ))}
        </div>

        {/* footnote */}
        <p className="mt-10 text-center text-xs text-bone-faint">
          All memberships are month-to-month unless billed annually. Prices shown
          in USD. Tax may apply.
        </p>
      </div>
    </section>
  );
}
