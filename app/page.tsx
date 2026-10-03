import { ArrowRight, Check } from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { HeroHeading } from "@/components/ui/HeroHeading";
import { PhotoFeatureCard } from "@/components/ui/PhotoFeatureCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCarousel } from "@/components/ui/TestimonialCarousel";
import { TiltCard } from "@/components/ui/TiltCard";
import { VideoCrossfadeBg, type VideoSource } from "@/components/ui/VideoCrossfadeBg";
import { PhotoBand } from "@/components/ui/PhotoBand";
import { ClassCard } from "@/components/schedule/ClassCard";
import { TodayAtStudio } from "@/components/schedule/TodayAtStudio";
import { TrainerCard } from "@/components/trainers/TrainerCard";
import { classes } from "@/lib/data/classes";
import { trainers } from "@/lib/data/trainers";
import { schedule } from "@/lib/data/schedule";
import { classPacks, perClass, plans } from "@/lib/data/plans";
import { pageMetadata, SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/site";
import { cn, formatPrice } from "@/lib/utils";

export const metadata = {
  ...pageMetadata({ title: SITE_NAME, description: SITE_DESCRIPTION, path: "/" }),
  // The root title template would otherwise append the site name twice.
  title: { absolute: `${SITE_NAME} — ${SITE_TAGLINE}` },
};

const stats = [
  { value: "1,200+", label: "Members" },
  { value: String(schedule.length), label: "Classes / week" },
  { value: String(Math.max(...schedule.map((s) => s.capacity))), label: "Max class size" },
  { value: "4.9", label: "Member rating" },
];

const cheapestPlan = plans.reduce((a, b) => (a.priceMonthly <= b.priceMonthly ? a : b));
const popularPlan = plans.find((p) => p.highlighted) ?? plans[0];
const dropIn = classPacks.find((p) => p.classes === 1);
const bestPack = classPacks.reduce((a, b) => (perClass(a) <= perClass(b) ? a : b));

const priceTiles = [
  { k: "From", v: formatPrice(cheapestPlan.priceMonthly), s: `/mo · ${cheapestPlan.name}` },
  { k: "Most popular", v: formatPrice(popularPlan.priceMonthly), s: `/mo · ${popularPlan.name}` },
  ...(dropIn ? [{ k: "Drop-in", v: formatPrice(dropIn.price), s: "per class" }] : []),
  { k: bestPack.name, v: formatPrice(bestPack.price), s: `${formatPrice(perClass(bestPack))} / class` },
];

const startSteps = [
  { n: "01", title: "Book a free class", body: "Pick any session on the timetable. No card needed." },
  { n: "02", title: "Meet your coach", body: "Arrive 10 minutes early for a tour and a quick movement check." },
  { n: "03", title: "Choose your plan", body: "Membership, class pack or PT - switch anytime as life changes." },
];

const valueProps = [
  {
    photo: {
      src: "https://images.pexels.com/photos/703016/pexels-photo-703016.jpeg?auto=compress&cs=tinysrgb&w=600",
      focus: "center 30%",
    },
    title: "Coaching that sticks",
    body: "Certified coaches on every floor and in every class. Real technique, real progress.",
  },
  {
    photo: {
      src: "https://images.pexels.com/photos/3289711/pexels-photo-3289711.jpeg?auto=compress&cs=tinysrgb&w=600",
      focus: "center 20%",
    },
    title: "Small by design",
    body: "Classes capped so you're seen, corrected and pushed. Never lost in the crowd.",
  },
  {
    photo: {
      src: "https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    title: "Train on your terms",
    body: "Book in seconds, switch anytime. Memberships and class packs that flex with life.",
  },
  {
    photo: {
      src: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
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

const heroPoster =
  "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1280";

// Desktop: 1080p (3.7–6 MB). Phones: 960×540 (1.1–1.7 MB). Under a 72% dark
// overlay the difference is invisible, and 4K renditions were 12–15 MB each.
const heroVideos: VideoSource[] = [
  {
    src: "https://videos.pexels.com/video-files/33514741/14253794_1920_1080_25fps.mp4",
    mobileSrc: "https://videos.pexels.com/video-files/33514741/14253786_960_540_25fps.mp4",
  },
  {
    src: "https://videos.pexels.com/video-files/5319998/5319998-hd_1920_1080_25fps.mp4",
    mobileSrc: "https://videos.pexels.com/video-files/5319998/5319998-sd_960_540_25fps.mp4",
  },
  {
    src: "https://videos.pexels.com/video-files/4108624/4108624-hd_1920_1080_25fps.mp4",
    mobileSrc: "https://videos.pexels.com/video-files/4108624/4108624-sd_960_540_25fps.mp4",
  },
];

export default function Home() {
  const featured = classes.filter((c) => featuredSlugs.includes(c.slug));

  return (
    <>
      {/* ─────────────────── Hero ─────────────────── */}
      <VideoCrossfadeBg
        sources={heroVideos}
        poster={heroPoster}
        overlayClass="bg-ink/72"
        className="min-h-[calc(100svh-4rem)]"
      >
        {/* warm oak glow accent */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(176,122,60,0.25)_0%,transparent_70%)]" />
        {/* bottom fade to site bg */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-b from-transparent via-transparent to-ink/80" />

        <div className="shell relative z-20 grid min-h-[calc(100svh-4rem)] gap-10 pt-10 pb-16 sm:pt-16 sm:pb-24 md:grid-cols-2 md:items-center md:pt-20 md:pb-28 lg:gap-16 lg:pt-24 lg:pb-32">
          <div className="animate-rise">
            <span className="eyebrow-ruled inline-flex">
              Boutique strength &amp; conditioning
            </span>
            <HeroHeading />
            <p className="mt-6 max-w-md text-base leading-relaxed text-bone-muted sm:text-lg">
              Coaching, classes and community built to make you stronger for
              life, not just for summer. Train on iron, grounded in oak.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
              <ButtonLink href="/free-trial" size="lg">
                Try a free class
              </ButtonLink>
              <ButtonLink href="/membership" variant="secondary" size="lg">
                See membership
              </ButtonLink>
            </div>
            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-bone-muted">
              {["First class free", "No joining fee", "Cancel anytime"].map((t) => (
                <li key={t} className="inline-flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-oak" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Hero product card: the next sessions, live */}
          <div className="animate-panel md:pl-6 lg:pl-8">
            <TodayAtStudio />
          </div>
        </div>
      </VideoCrossfadeBg>

      {/* ─────────────────── Stats ─────────────────── */}
      <section className="border-y border-oak/20 bg-ink">
        <div className="shell grid grid-cols-2 sm:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.1}
              className={cn(
                "border-line py-10 text-center sm:py-20",
                i % 2 === 1 && "border-l",
                i >= 2 && "border-t sm:border-t-0",
                i === 2 && "sm:border-l",
              )}
            >
              <div className="mx-auto mb-3 w-8 border-t border-oak/30" />
              <p className="text-shine font-display text-5xl sm:text-7xl">
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
            <Reveal key={prop.title} delay={i * 0.08} className="h-full">
              <TiltCard className="h-full">
                <PhotoFeatureCard
                  src={prop.photo.src}
                  focus={prop.photo.focus}
                  title={prop.title}
                  body={prop.body}
                  className="h-full"
                />
              </TiltCard>
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
          <div className="overflow-hidden rounded-3xl border border-line bg-linear-to-br from-moss/30 via-charcoal to-charcoal-2 p-6 sm:p-14">
            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              <div>
                <SectionHeading
                  animated={false}
                  eyebrow="Membership"
                  title="One studio. Every way to train."
                  description="Go unlimited, keep it casual with a class pack, or add 1-on-1 coaching. No contracts, no joining fees. Just train."
                />
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href="/membership" size="lg">
                    See membership options
                  </ButtonLink>
                  <ButtonLink href="/membership#compare" variant="secondary" size="lg">
                    Compare plans
                  </ButtonLink>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {priceTiles.map((p) => (
                  <Card key={p.s} className="bg-ink/30 p-4 sm:p-5">
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

      {/* ─────────────────── Getting started ─────────────────── */}
      <section className="border-t border-line bg-charcoal py-20 sm:py-28">
        <div className="shell">
          <SectionHeading eyebrow="Getting started" title="Three steps to your first session" />
          <ol className="mt-12 grid gap-8 sm:grid-cols-3">
            {startSteps.map((step, i) => (
              <li key={step.n}>
                <Reveal delay={i * 0.08} className="border-t border-oak/40 pt-5">
                  <p className="font-display text-5xl text-oak/60">{step.n}</p>
                  <h3 className="mt-3 text-xl uppercase text-bone">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-bone-muted">{step.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
          <ButtonLink href="/free-trial" size="lg" className="mt-12 w-full sm:w-auto">
            Book your free class
          </ButtonLink>
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
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/free-trial" size="lg" className="w-full sm:w-auto">
              Claim your free class
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary" size="lg" className="w-full sm:w-auto">
              Get in touch
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
