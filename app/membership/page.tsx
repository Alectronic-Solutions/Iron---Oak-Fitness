import { ArrowRight, Check, Minus } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { FaqList } from "@/components/ui/FaqList";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PricingGrid } from "@/components/membership/PricingGrid";
import { ClassPackCard } from "@/components/membership/ClassPackCard";
import { plans, classPacks } from "@/lib/data/plans";
import { getFaqGroup } from "@/lib/data/faqs";
import { pageMetadata } from "@/lib/site";
import { membershipOffersSchema, serializeJsonLd } from "@/lib/structuredData";

export const metadata = pageMetadata({
  title: "Membership & Pricing",
  description:
    "Memberships from $79/month, class packs from $17 a class, and drop-ins. No contracts, no joining fees, cancel anytime.",
  path: "/membership",
});

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


function Cell({ value }: { value: Cell }) {
  if (value === true)
    return <Check className="mx-auto h-5 w-5 text-oak" aria-label="Included" />;
  if (value === false)
    return (
      <Minus className="mx-auto h-5 w-5 text-bone-faint" aria-label="Not included" />
    );
  return <span className="text-xs text-bone sm:text-sm">{value}</span>;
}

export default function MembershipPage() {
  const faqs = getFaqGroup("membership")?.faqs ?? [];

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(membershipOffersSchema(plans)),
        }}
      />
      {/* Hero */}
      <section className="grain border-b border-line">
        <div className="shell py-14 text-center sm:py-20">
          <p className="eyebrow">Membership</p>
          <h1 className="mx-auto mt-4 max-w-3xl text-5xl uppercase leading-[0.95] text-bone sm:text-6xl md:text-7xl">
            Train your way
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-bone-muted">
            Go unlimited, keep it casual with a class pack, or drop in when it
            suits. No contracts. No joining fees. Cancel anytime.
          </p>
          <ul className="mx-auto mt-6 flex max-w-xl flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-bone-muted">
            {["First class free", "Freeze up to 2 months", "Switch plans anytime"].map((t) => (
              <li key={t} className="inline-flex items-center gap-2">
                <Check className="h-4 w-4 text-oak" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Plans */}
      <section className="shell py-16 sm:py-24">
        <PricingGrid plans={plans} />
      </section>

      {/* Comparison */}
      <section id="compare" className="border-y border-line bg-charcoal py-16 sm:py-24">
        <div className="shell">
          <SectionHeading
            eyebrow="Compare"
            title="Every plan, side by side"
            align="center"
            className="mb-10"
          />
          {/* Mobile stacked layout */}
          <div className="sm:hidden">
            <div className="sticky top-16 z-10 grid grid-cols-[1.3fr_1fr_1fr_1fr] gap-2 border-b border-line bg-charcoal py-3">
              <div />
              {plans.map((p) => (
                <p key={p.id} className="text-center font-display text-xs uppercase text-bone leading-tight">
                  {p.name}
                </p>
              ))}
            </div>
            {comparison.map((row) => (
              <div key={row.feature} className="grid grid-cols-[1.3fr_1fr_1fr_1fr] items-center gap-2 border-b border-line py-3 last:border-0">
                <p className="text-xs leading-snug text-bone-muted">{row.feature}</p>
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
      <section id="packs" className="shell py-16 sm:py-24">
        <SectionHeading
          eyebrow="No commitment"
          title="Class packs & drop-ins"
          description="Prefer to pay as you go? Buy a pack and use it whenever - the more you buy, the less you pay per class."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 md:grid-cols-4">
          {classPacks.map((pack, i) => (
            <Reveal key={pack.id} delay={Math.min(i * 0.06, 0.24)}>
              <ClassPackCard pack={pack} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-line bg-charcoal py-16 sm:py-24">
        <div className="shell max-w-3xl">
          <SectionHeading eyebrow="Good to know" title="Questions, answered" />
          <div className="mt-10">
            <FaqList faqs={faqs} />
          </div>
          <ButtonLink href="/faq" variant="ghost" className="-mx-6 mt-6">
            All FAQs <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
      </section>

      {/* CTA */}
      <section className="grain border-t border-line">
        <div className="shell py-16 text-center sm:py-20">
          <h2 className="mx-auto max-w-2xl text-3xl uppercase leading-tight text-bone sm:text-5xl">
            Still deciding?{" "}<br />Try a class free.
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/free-trial" size="lg">
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
