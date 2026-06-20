import type { Metadata } from "next";
import { Check, ChevronDown, Minus } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PricingCard } from "@/components/membership/PricingCard";
import { ClassPackCard } from "@/components/membership/ClassPackCard";
import { plans, classPacks } from "@/lib/data/plans";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "Memberships, class packs and drop-ins at Iron & Oak Fitness. No contracts, no joining fees.",
};

type Cell = string | boolean;

const comparison: { feature: string; values: [Cell, Cell, Cell] }[] = [
  { feature: "Group classes", values: ["8 / month", "Unlimited", "Unlimited"] },
  { feature: "Gym floor access", values: [true, true, true] },
  { feature: "Member app", values: [true, true, true] },
  { feature: "PT sessions / month", values: ["-", "1", "4"] },
  { feature: "Priority booking", values: [false, true, true] },
  { feature: "Guest passes", values: ["-", "2 / month", "Unlimited"] },
  { feature: "Recovery programming", values: [false, false, true] },
  { feature: "Body-composition assessments", values: [false, false, true] },
];

const faqs = [
  {
    q: "Is there a joining fee?",
    a: "Never. You pay for your membership and nothing else - no sign-up fees, no hidden extras.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Memberships are month-to-month. Cancel whenever you like with no penalty.",
  },
  {
    q: "Do class packs expire?",
    a: "Class packs are valid for the window shown on each pack (30–120 days), giving you flexibility without locking you in.",
  },
  {
    q: "Can I freeze my membership?",
    a: "Absolutely - you can freeze your membership for up to two months each year if life gets in the way.",
  },
  {
    q: "What does the free first class include?",
    a: "Any group class on the timetable, on us. Just book it and show up - no card required.",
  },
];

function Cell({ value }: { value: Cell }) {
  if (value === true)
    return <Check className="mx-auto h-5 w-5 text-oak" aria-label="Included" />;
  if (value === false)
    return (
      <Minus className="mx-auto h-5 w-5 text-bone-faint" aria-label="Not included" />
    );
  return <span className="text-sm text-bone">{value}</span>;
}

export default function MembershipPage() {
  return (
    <div>
      {/* Hero */}
      <section className="grain border-b border-line">
        <div className="shell py-14 text-center sm:py-20">
          <p className="eyebrow">Membership</p>
          <h1 className="mx-auto mt-4 max-w-3xl text-4xl uppercase leading-[0.95] text-bone sm:text-6xl">
            Train your way
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-bone-muted">
            Go unlimited, keep it casual with a class pack, or drop in when it
            suits. No contracts. No joining fees. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="shell py-16 sm:py-24">
        <div className="grid gap-5 pt-3 md:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section className="border-y border-line bg-charcoal py-16 sm:py-24">
        <div className="shell">
          <SectionHeading
            eyebrow="Compare"
            title="Every plan, side by side"
            align="center"
            className="mb-10"
          />
          {/* Mobile stacked layout */}
          <div className="sm:hidden space-y-3">
            <div className="grid grid-cols-4 gap-2 border-b border-line pb-3">
              <div />
              {plans.map((p) => (
                <p key={p.id} className="text-center font-display text-xs uppercase text-bone leading-tight">
                  {p.name}
                </p>
              ))}
            </div>
            {comparison.map((row) => (
              <div key={row.feature} className="grid grid-cols-4 gap-2 border-b border-line py-2.5 last:border-0">
                <p className="text-xs text-bone-muted leading-snug">{row.feature}</p>
                {row.values.map((v, i) => (
                  <div key={i} className="flex justify-center">
                    <Cell value={v} />
                  </div>
                ))}
              </div>
            ))}
          </div>
          {/* Desktop table */}
          <div className="hidden sm:block">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-line">
                  <th className="py-4 text-left text-sm font-normal text-bone-faint">
                    Feature
                  </th>
                  {plans.map((p) => (
                    <th
                      key={p.id}
                      className="px-3 py-4 text-center font-display text-base uppercase text-bone"
                    >
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.feature} className="border-b border-line">
                    <td className="py-3.5 pr-3 text-sm text-bone-muted">
                      {row.feature}
                    </td>
                    {row.values.map((v, i) => (
                      <td key={i} className="px-3 py-3.5 text-center">
                        <Cell value={v} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Class packs */}
      <section className="shell py-16 sm:py-24">
        <SectionHeading
          eyebrow="No commitment"
          title="Class packs & drop-ins"
          description="Prefer to pay as you go? Buy a pack and use it whenever - the more you buy, the less you pay per class."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 md:grid-cols-4">
          {classPacks.map((pack) => (
            <ClassPackCard key={pack.id} pack={pack} />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-line bg-charcoal py-16 sm:py-24">
        <div className="shell max-w-3xl">
          <SectionHeading eyebrow="Good to know" title="Questions, answered" />
          <div className="mt-10">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group border-b border-line py-4"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base uppercase text-bone">
                  {faq.q}
                  <ChevronDown className="h-5 w-5 shrink-0 text-oak transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-bone-muted">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="grain border-t border-line">
        <div className="shell py-16 text-center sm:py-20">
          <h2 className="mx-auto max-w-2xl text-3xl uppercase leading-tight text-bone sm:text-5xl">
            Still deciding?{" "}<br />Try a class free.
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/schedule" size="lg">
              Book a free class
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary" size="lg">
              Talk to the team
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
