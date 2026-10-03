import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ChevronRight, Clock, Flame, Gift, Users } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ClassCard } from "@/components/schedule/ClassCard";
import { classes, getClass } from "@/lib/data/classes";
import { getTrainer } from "@/lib/data/trainers";
import { getSlotsForClass, spotsLeft } from "@/lib/data/schedule";
import { CATEGORY_STYLE } from "@/lib/categories";
import { formatTime12, pageMetadata } from "@/lib/site";
import { courseSchema, serializeJsonLd } from "@/lib/structuredData";
import { byWeekday, WEEKDAY_LABELS } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return classes.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const cls = getClass(slug);
  if (!cls) return { title: "Class" };
  return pageMetadata({
    title: `${cls.title} - ${cls.category} class`,
    description: `${cls.tagline} ${cls.description}`,
    path: `/classes/${cls.slug}`,
  });
}

export default async function ClassDetailPage({ params }: Params) {
  const { slug } = await params;
  const cls = getClass(slug);
  if (!cls) notFound();

  const coach = getTrainer(cls.coachId);
  const slots = getSlotsForClass(cls.slug).sort(
    (a, b) => byWeekday(a.day, b.day) || a.start.localeCompare(b.start),
  );
  const capacity = slots.length ? Math.max(...slots.map((s) => s.capacity)) : null;
  const related = classes
    .filter((c) => c.slug !== cls.slug)
    .sort((a, b) => Number(b.category === cls.category) - Number(a.category === cls.category))
    .slice(0, 3);
  const style = CATEGORY_STYLE[cls.category];

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(courseSchema(cls)) }}
      />

      <section className="grain border-b border-line">
        <div className="shell py-8 sm:py-14">
          <Breadcrumbs
            items={[
              { name: "Classes", path: "/classes" },
              { name: cls.title, path: `/classes/${cls.slug}` },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <Badge tone={style.tone}>{cls.category}</Badge>
            <h1 className="mt-4 text-5xl uppercase leading-none text-bone sm:text-6xl md:text-7xl">
              {cls.title}
            </h1>
            <p className="mt-3 text-lg text-oak-soft sm:text-xl">{cls.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-bone-muted">
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-oak" />
                {cls.durationMin} minutes
              </span>
              <span className="inline-flex items-center gap-2">
                <Flame className="h-4 w-4 text-oak" />
                {cls.intensity === "All levels" ? "All levels" : `${cls.intensity} intensity`}
              </span>
              {capacity && (
                <span className="inline-flex items-center gap-2">
                  <Users className="h-4 w-4 text-oak" />
                  Max {capacity} people
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="shell grid grid-cols-1 gap-10 py-10 sm:py-14 md:grid-cols-[minmax(0,1fr)_300px] lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
        {/* Main */}
        <div>
          <p className="max-w-2xl text-base leading-relaxed text-bone-muted sm:text-lg">
            {cls.description}
          </p>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <h2 className="eyebrow">What you&apos;ll work on</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {cls.focus.map((f) => (
                  <Badge key={f}>{f}</Badge>
                ))}
              </div>
            </div>
            <div>
              <h2 className="eyebrow">What to bring</h2>
              <ul className="mt-3 space-y-2">
                {cls.whatToBring.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-bone-muted">
                    <Check className="h-4 w-4 shrink-0 text-oak" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Card className="mt-10 flex items-start gap-4 border-oak/30 bg-oak/5 p-5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-oak/15 text-oak-soft">
              <Gift className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display uppercase text-bone">First time at Iron &amp; Oak?</p>
              <p className="mt-1 text-sm text-bone-muted">
                Your first class is free. Arrive 10 minutes early and we&apos;ll
                show you around.
              </p>
              <Link
                href="/free-trial"
                className="mt-2 inline-flex min-h-11 items-center gap-1 text-sm text-oak-soft hover:text-bone"
              >
                Claim your free class <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <aside>
          <Card className="p-6 md:sticky md:top-24">
            {coach && (
              <Link href={`/trainers/${coach.slug}`} className="group flex items-center gap-4">
                <Avatar initials={coach.initials} size="md" image={coach.image} colorKey={coach.id} />
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-bone-faint">Lead coach</p>
                  <p className="font-display text-lg uppercase text-bone transition-colors group-hover:text-oak-soft">
                    {coach.name}
                  </p>
                  <p className="text-xs text-oak-soft">{coach.role}</p>
                </div>
              </Link>
            )}

            <div className="my-6 h-px bg-line" />

            <h2 className="eyebrow">This week</h2>
            <ul className="mt-3 space-y-2">
              {slots.map((slot) => {
                const left = spotsLeft(slot);
                return (
                  <li key={slot.id}>
                    <Link
                      href={`/schedule?class=${cls.slug}&day=${slot.day}`}
                      className="group flex min-h-12 items-center justify-between gap-3 rounded-lg border border-line bg-ink/30 px-3 py-2 text-sm transition-colors hover:border-oak/50"
                    >
                      <span className="text-bone">
                        {WEEKDAY_LABELS[slot.day]}
                        <span className="ml-2 font-display text-bone-muted">
                          {formatTime12(slot.start)}
                        </span>
                      </span>
                      <span className="flex items-center gap-2">
                        <span className={left === 0 ? "text-xs text-red-300" : left <= 3 ? "text-xs text-bronze" : "text-xs text-bone-faint"}>
                          {left === 0 ? "Waitlist" : `${left} left`}
                        </span>
                        <ChevronRight className="h-4 w-4 text-bone-faint group-hover:text-oak-soft" />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <ButtonLink href={`/schedule?class=${cls.slug}`} size="lg" className="mt-6 w-full">
              Book this class
            </ButtonLink>
          </Card>
        </aside>
      </div>

      {/* Related */}
      <section className="border-t border-line bg-charcoal py-14 sm:py-20">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl uppercase text-bone sm:text-4xl">You might also like</h2>
            <ButtonLink href="/classes" variant="ghost" className="-mx-6 sm:mx-0">
              All classes <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((c) => (
              <ClassCard key={c.slug} fitnessClass={c} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
