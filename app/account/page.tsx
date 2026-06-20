import type { Metadata } from "next";
import { ArrowRight, Check, Clock } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PortalBookings } from "@/components/portal/PortalBookings";
import { demoMember } from "@/lib/data/members";
import { getPlan } from "@/lib/data/plans";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Member Portal",
  description: "Your Iron & Oak membership, bookings and payments.",
};

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <Card className="p-4">
      <p className="text-xs uppercase tracking-wider text-bone-faint">
        {label}
      </p>
      <p className="mt-1 font-display text-2xl text-bone">{value}</p>
    </Card>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 font-display text-2xl uppercase text-bone">{children}</h2>
  );
}

export default function AccountPage() {
  const m = demoMember;
  const plan = getPlan(m.planId);
  const nextSession = m.bookings[0];

  return (
    <div className="shell py-12 sm:py-16">
      {/* Header */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar initials={m.initials} size="lg" />
          <div>
            <p className="eyebrow">Welcome back</p>
            <h1 className="text-3xl uppercase leading-none text-bone sm:text-4xl">
              {m.name}
            </h1>
            <p className="mt-1 text-sm text-bone-faint">
              Member since {m.memberSince}
            </p>
          </div>
        </div>
        {plan && (
          <Badge tone="oak" className="self-start sm:self-auto">
            {plan.name} member
          </Badge>
        )}
      </div>

      <p className="mt-5 rounded-lg border border-line bg-charcoal px-4 py-2.5 text-xs text-bone-faint">
        You&apos;re viewing a sample member account - all data here is fictional.
      </p>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat label="Current plan" value={plan?.name ?? "-"} />
        <Stat label="Class-pack credits" value={`${m.packBalance}`} />
        <Stat label="Upcoming" value={`${m.bookings.length}`} />
        <Stat label="Next session" value={nextSession?.date ?? "-"} />
      </div>

      {/* Main grid */}
      <div className="mt-12 grid gap-10 md:grid-cols-[1fr_280px] lg:grid-cols-3">
        <div className="space-y-12 lg:col-span-2">
          {/* Bookings */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <SectionTitle>Upcoming sessions</SectionTitle>
              <ButtonLink href="/schedule" variant="ghost" size="sm">
                Book more <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
            <PortalBookings initial={m.bookings} />
          </section>

          {/* Payments */}
          <section>
            <SectionTitle>Payment history</SectionTitle>
            <Card className="overflow-hidden">
              {/* Mobile card list */}
              <ul className="divide-y divide-line sm:hidden">
                {m.payments.map((p) => (
                  <li key={p.id} className="flex items-start justify-between gap-3 px-5 py-3.5">
                    <div className="min-w-0">
                      <p className="truncate text-sm text-bone">{p.description}</p>
                      <p className="mt-0.5 text-xs text-bone-muted">{p.date}</p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1.5">
                      <span className="text-sm font-medium text-bone">{formatPrice(p.amount)}</span>
                      {p.status === "paid" ? (
                        <Badge tone="success"><Check className="h-3 w-3" />Paid</Badge>
                      ) : (
                        <Badge tone="muted"><Clock className="h-3 w-3" />Upcoming</Badge>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              {/* Desktop table */}
              <div className="hidden sm:block -mx-px overflow-x-auto">
                <table className="w-full min-w-[30rem] border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-line text-left text-bone-faint">
                      <th className="px-5 py-3 font-normal">Date</th>
                      <th className="px-5 py-3 font-normal">Description</th>
                      <th className="px-5 py-3 text-right font-normal">Amount</th>
                      <th className="px-5 py-3 text-right font-normal">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {m.payments.map((p) => (
                      <tr
                        key={p.id}
                        className="border-b border-line last:border-0"
                      >
                        <td className="whitespace-nowrap px-5 py-3.5 text-bone-muted">
                          {p.date}
                        </td>
                        <td className="px-5 py-3.5 text-bone">
                          {p.description}
                        </td>
                        <td className="whitespace-nowrap px-5 py-3.5 text-right font-medium text-bone">
                          {formatPrice(p.amount)}
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          {p.status === "paid" ? (
                            <Badge tone="success">
                              <Check className="h-3 w-3" />
                              Paid
                            </Badge>
                          ) : (
                            <Badge tone="muted">
                              <Clock className="h-3 w-3" />
                              Upcoming
                            </Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {plan && (
            <Card className="p-6">
              <p className="eyebrow">Your membership</p>
              <p className="mt-2 font-display text-3xl uppercase text-bone">
                {plan.name}
              </p>
              <p className="mt-1 text-sm text-bone-muted">
                <span className="font-display text-xl text-oak-soft">
                  {formatPrice(plan.priceMonthly)}
                </span>{" "}
                / month
              </p>
              <ul className="mt-5 space-y-2.5">
                {plan.perks.slice(0, 3).map((perk) => (
                  <li
                    key={perk}
                    className="flex gap-3 text-sm text-bone-muted"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-oak" />
                    {perk}
                  </li>
                ))}
              </ul>
              <ButtonLink
                href="/membership"
                variant="secondary"
                className="mt-6 w-full"
              >
                Manage membership
              </ButtonLink>
            </Card>
          )}

          <Card className="p-6">
            <p className="eyebrow">Profile</p>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-bone-faint">Name</dt>
                <dd className="text-bone">{m.name}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-bone-faint">Email</dt>
                <dd className="truncate text-bone">{m.email}</dd>
              </div>
            </dl>
            <ButtonLink
              href="/contact"
              variant="ghost"
              size="sm"
              className="mt-4 w-full"
            >
              Update details
            </ButtonLink>
          </Card>

          <Card className="p-6">
            <p className="eyebrow">Quick actions</p>
            <div className="mt-4 space-y-2">
              <ButtonLink href="/training" variant="secondary" className="w-full">
                Book a 1-on-1
              </ButtonLink>
              <ButtonLink href="/membership" variant="secondary" className="w-full">
                Buy a class pack
              </ButtonLink>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
