import {
  ArrowRight,
  CalendarCheck,
  Dumbbell,
  HeartPulse,
  Users,
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { CountUp } from "@/components/ui/CountUp";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCarousel } from "@/components/ui/TestimonialCarousel";
import { ParallaxBg } from "@/components/ui/ParallaxBg";
import { PhotoBand } from "@/components/ui/PhotoBand";
import { ClassCard } from "@/components/schedule/ClassCard";
import { TrainerCard } from "@/components/trainers/TrainerCard";
import { classes } from "@/lib/data/classes";
import { trainers } from "@/lib/data/trainers";
import { getClass } from "@/lib/data/classes";
import { getTrainer } from "@/lib/data/trainers";
import { getSlotsByDay, spotsLeft } from "@/lib/data/schedule";

const stats = [
  { value: "1,200+", label: "Members" },
  { value: "40+", label: "Classes / week" },
  { value: "12", label: "Expert coaches" },
  { value: "4.9", label: "Average rating" },
];

const valueProps = [
  {
    icon: Dumbbell,
    title: "Coaching that sticks",
    body: "Certified coaches on every floor and in every class. Real technique, real progress.",
  },
  {
    icon: Users,
    title: "Small by design",
    body: "Classes capped so you're seen, corrected and pushed. Never lost in the crowd.",
  },
  {
    icon: CalendarCheck,
    title: "Train on your terms",
    body: "Book in seconds, switch anytime. Memberships and class packs that flex with life.",
  },
  {
    icon: HeartPulse,
    title: "Built to last",
    body: "Mobility and recovery baked into the program so you train hard for decades, not weeks.",
  },
];

const testimonials = [
  {
    quote:
      "I've trained at big-box gyms for years. Six months at Iron & Oak and I'm stronger than I've ever been. I actually look forward to it.",
    name: "Priya N.",
    role: "Member since 2025",
  },
  {
    quote:
      "The coaching is the difference. Marcus rebuilt my deadlift from scratch and my back pain is gone.",
    name: "James O.",
    role: "Forge member",
  },
  {
    quote:
      "Booking a class takes ten seconds on my phone. The schedule actually fits around my shifts.",
    name: "Mara T.",
    role: "Unlimited member",
  },
];

const featuredSlugs = ["iron-foundations", "ember-hiit", "oak-flow"];

export default function Home() {
  const featured = classes.filter((c) => featuredSlugs.includes(c.slug));
  const todaySlots = getSlotsByDay("Mon").slice(0, 3);

  return (
    <>
      {/* ─────────────────── Hero ─────────────────── */}
      <ParallaxBg
        src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1920"
        alt="Heavy barbell plates in a dark gym"
        overlayClass="bg-ink/72"
        speed={0.3}
        priority
        className="min-h-[100svh]"
      >
        {/* warm oak glow accent */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(176,122,60,0.25)_0%,transparent_70%)]" />
        {/* bottom fade to site bg */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-b from-transparent via-transparent to-ink/80" />

        <div className="shell relative z-20 grid min-h-[100svh] gap-8 py-24 sm:py-32 md:grid-cols-2 md:items-center md:py-36 lg:py-44">
          <div className="animate-rise">
            <span className="eyebrow-ruled inline-flex">
              Boutique strength &amp; conditioning
            </span>
            <h1 className="mt-6 text-6xl uppercase leading-[0.9] text-bone sm:text-7xl md:text-6xl lg:text-8xl">
              Strength,
              <br />
              <span className="text-gradient-oak">grounded.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-bone-muted">
              Coaching, classes and community built to make you stronger for
              life, not just for summer. Train on iron, grounded in oak.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/membership" size="lg">
                Start your membership
              </ButtonLink>
              <ButtonLink href="/schedule" variant="secondary" size="lg">
                View the schedule
              </ButtonLink>
            </div>
            <p className="mt-5 text-xs text-bone-faint">
              First class free · No joining fee · Cancel anytime
            </p>
          </div>

          {/* Hero product card: today's classes */}
          <div className="animate-panel md:pl-6 lg:pl-8">
            <Card className="bg-white/5 p-6 shadow-2xl backdrop-blur-md border-white/10">
              <div className="flex items-center justify-between">
                <p className="eyebrow">Today at the studio</p>
                <Badge tone="success">Open now</Badge>
              </div>
              <div className="mt-5 space-y-3">
                {todaySlots.map((slot) => {
                  const cls = getClass(slot.classSlug);
                  const coach = getTrainer(slot.trainerId);
                  const left = spotsLeft(slot);
                  return (
                    <div
                      key={slot.id}
                      className="flex items-center gap-4 rounded-xl border border-white/8 bg-ink/50 p-3 backdrop-blur-sm"
                    >
                      <p className="w-14 shrink-0 font-display text-lg text-bone">
                        {slot.start}
                      </p>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-display uppercase text-bone">
                          {cls?.title}
                        </p>
                        <p className="truncate text-xs text-bone-faint flex items-center gap-1.5">
                          {coach && (
                            <Avatar initials={coach.initials} image={coach.image} colorKey={coach.id} size="sm" className="h-4 w-4 text-[8px] shrink-0" />
                          )}
                          {coach?.name}
                        </p>
                      </div>
                      <Badge
                        tone={left === 0 ? "danger" : left <= 3 ? "oak" : "success"}
                      >
                        {left === 0 ? "Waitlist" : `${left} left`}
                      </Badge>
                    </div>
                  );
                })}
              </div>
              <ButtonLink
                href="/schedule"
                variant="secondary"
                className="mt-5 w-full"
              >
                See full schedule
              </ButtonLink>
            </Card>
          </div>
        </div>
      </ParallaxBg>

      {/* ─────────────────── Stats ─────────────────── */}
      <section className="border-y border-oak/20 bg-ink">
        <div className="shell grid grid-cols-2 divide-x divide-line sm:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="py-10 text-center sm:py-20">
              <div className="mx-auto mb-3 w-8 border-t border-oak/30" />
              <p className="font-display text-4xl text-oak-soft sm:text-7xl">
                <CountUp value={s.value} />
              </p>
              <p className="mt-2 text-xs uppercase tracking-wider text-bone-faint">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─────────────────── Value props ─────────────────── */}
      <section className="shell py-20 sm:py-28">
        <SectionHeading
          eyebrow="Why Iron & Oak"
          title="A different kind of gym"
          description="Premium coaching, intelligent programming and a room that pushes you. Everything here is built around getting you stronger and keeping you that way."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 md:grid-cols-4">
          {valueProps.map((prop, i) => (
            <Reveal key={prop.title} delay={i * 0.08}>
              <Card interactive glass className="h-full p-7">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-oak/20 text-oak-soft">
                  <prop.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 text-xl uppercase text-bone">{prop.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-bone-muted">
                  {prop.body}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─────────────────── Photo band 1 ─────────────────── */}
      <PhotoBand
        src="https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=1920"
        alt="Dark weight plates on a barbell"
        overlayClass="bg-ink/55"
        eyebrow="The work never lies"
        quote="Every rep counts. Every session compounds."
      />

      {/* ─────────────────── Featured classes ─────────────────── */}
      <section className="border-t border-line bg-charcoal py-20 sm:py-28">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="The classes"
              title="Find your session"
              description="From barbell fundamentals to lung-busting conditioning and restorative flow."
            />
            <ButtonLink href="/schedule" variant="ghost" className="shrink-0">
              All classes <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            {featured.map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.08}>
                <div className="h-full">
                  <ClassCard fitnessClass={c} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── Trainers ─────────────────── */}
      <section className="shell py-20 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="The coaches"
            title="Trained by the best"
            description="Decades of combined experience across strength, conditioning, mobility and performance."
          />
          <ButtonLink href="/trainers" variant="ghost" className="shrink-0">
            Meet the team <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {trainers.slice(0, 3).map((t, i) => (
            <Reveal key={t.id} delay={i * 0.08}>
              <div className="h-full">
                <TrainerCard trainer={t} />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─────────────────── Photo band 2 ─────────────────── */}
      <PhotoBand
        src="https://images.pexels.com/photos/3289711/pexels-photo-3289711.jpeg?auto=compress&cs=tinysrgb&w=1920"
        alt="Athlete mid-lift under dramatic lighting"
        overlayClass="bg-ink/60"
        eyebrow="1-on-1 personal training"
        quote="Your coach. Your program. Your results."
      />

      {/* ─────────────────── Membership band ─────────────────── */}
      <section className="shell py-20 sm:py-28">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-line bg-linear-to-br from-moss/30 via-charcoal to-charcoal-2 p-8 sm:p-14">
            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              <div>
                <SectionHeading
                  animated={false}
                  eyebrow="Membership"
                  title="One studio. Every way to train."
                  description="Go unlimited, keep it casual with a class pack, or add 1-on-1 coaching. No contracts, no joining fees. Just train."
                />
                <ButtonLink href="/membership" size="lg" className="mt-10">
                  See membership options
                </ButtonLink>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { k: "From", v: "$79", s: "/mo · Essential" },
                  { k: "Most popular", v: "$129", s: "/mo · Unlimited" },
                  { k: "Drop-in", v: "$22", s: "per class" },
                  { k: "10-pack", v: "$170", s: "$17 / class" },
                ].map((p) => (
                  <Card key={p.s} className="bg-ink/30 p-5">
                    <p className="text-[11px] uppercase tracking-wider text-bone-faint">
                      {p.k}
                    </p>
                    <p className="mt-1 font-display text-3xl text-bone">{p.v}</p>
                    <p className="text-xs text-bone-muted">{p.s}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ─────────────────── Testimonials ─────────────────── */}
      <section className="border-t border-line bg-ink py-20 sm:py-28">
        <div className="shell">
          <SectionHeading
            align="center"
            eyebrow="Member stories"
            title="People who train here"
            className="mb-14"
          />
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* ─────────────────── Photo band 3 ─────────────────── */}
      <PhotoBand
        src="https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=1920"
        alt="Silhouette of an athlete on pull-up bars"
        overlayClass="bg-ink/62"
        eyebrow="Ready when you are"
        quote="Your first class is on us."
      />

      {/* ─────────────────── Final CTA ─────────────────── */}
      <section className="grain relative overflow-hidden border-t border-line">
        <div className="shell py-24 text-center sm:py-32">
          <p className="eyebrow">No pressure. No contracts.</p>
          <h2 className="mx-auto mt-5 max-w-3xl text-4xl uppercase leading-tight text-bone sm:text-5xl md:text-6xl lg:text-7xl">
            Walk in. Train hard.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-bone-muted">
            Come see if Iron &amp; Oak is your room.
            <br />
            No card required.
            <br />
            Just one session, on us.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/membership" size="lg">
              Claim your free class
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary" size="lg">
              Get in touch
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
