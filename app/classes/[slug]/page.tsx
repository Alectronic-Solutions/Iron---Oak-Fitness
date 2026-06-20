import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Clock, Flame } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { classes, getClass } from "@/lib/data/classes";
import { getTrainer } from "@/lib/data/trainers";
import { getSlotsForClass } from "@/lib/data/schedule";
import { byWeekday, WEEKDAY_LABELS } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return classes.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const cls = getClass(slug);
  return {
    title: cls?.title ?? "Class",
    description: cls?.tagline,
  };
}

export default async function ClassDetailPage({ params }: Params) {
  const { slug } = await params;
  const cls = getClass(slug);
  if (!cls) notFound();

  const coach = getTrainer(cls.coachId);
  const slots = getSlotsForClass(cls.slug).sort(
    (a, b) => byWeekday(a.day, b.day) || a.start.localeCompare(b.start),
  );

  return (
    <div className="shell py-10 sm:py-14">
      <Link
        href="/schedule"
        className="inline-flex items-center gap-2 text-sm text-bone-muted transition-colors hover:text-bone"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to schedule
      </Link>

      <div className="mt-6 grid gap-10 md:grid-cols-[1fr_280px] lg:grid-cols-3">
        {/* Main */}
        <div className="lg:col-span-2">
          <Badge tone="oak">{cls.category}</Badge>
          <h1 className="mt-4 text-4xl uppercase leading-none text-bone sm:text-5xl">
            {cls.title}
          </h1>
          <p className="mt-3 text-lg text-oak-soft">{cls.tagline}</p>

          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-bone-faint">
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4 text-oak" />
              {cls.durationMin} minutes
            </span>
            <span className="inline-flex items-center gap-2">
              <Flame className="h-4 w-4 text-oak" />
              {cls.intensity} intensity
            </span>
          </div>

          <p className="mt-8 max-w-2xl text-base leading-relaxed text-bone-muted">
            {cls.description}
          </p>

          <div className="mt-10">
            <p className="eyebrow">What you&apos;ll work on</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {cls.focus.map((f) => (
                <Badge key={f}>{f}</Badge>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <p className="eyebrow">What to bring</p>
            <ul className="mt-3 space-y-2">
              {cls.whatToBring.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm text-bone-muted"
                >
                  <Check className="h-4 w-4 shrink-0 text-oak" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <aside>
          <Card className="p-6 lg:sticky lg:top-24">
            {coach && (
              <Link
                href={`/trainers/${coach.slug}`}
                className="group flex items-center gap-4"
              >
                <Avatar initials={coach.initials} size="md" image={coach.image} colorKey={coach.id} />
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-bone-faint">
                    Your coach
                  </p>
                  <p className="font-display text-lg uppercase text-bone transition-colors group-hover:text-oak-soft">
                    {coach.name}
                  </p>
                  <p className="text-xs text-oak-soft">{coach.role}</p>
                </div>
              </Link>
            )}

            <div className="my-6 h-px bg-line" />

            <p className="eyebrow">Upcoming times</p>
            <ul className="mt-3 space-y-2">
              {slots.map((slot) => (
                <li
                  key={slot.id}
                  className="flex items-center justify-between rounded-lg border border-line bg-ink/30 px-3 py-2 text-sm"
                >
                  <span className="text-bone">{WEEKDAY_LABELS[slot.day]}</span>
                  <span className="font-display text-bone-muted">
                    {slot.start}
                  </span>
                </li>
              ))}
            </ul>

            <ButtonLink href="/schedule" size="lg" className="mt-6 w-full">
              Book this class
            </ButtonLink>
          </Card>
        </aside>
      </div>
    </div>
  );
}
