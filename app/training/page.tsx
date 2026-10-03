import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FaqList } from "@/components/ui/FaqList";
import { PhotoFeatureCard } from "@/components/ui/PhotoFeatureCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { TrainingBooker } from "@/components/trainers/TrainingBooker";
import { ParallaxBg } from "@/components/ui/ParallaxBg";
import { PhotoBand } from "@/components/ui/PhotoBand";
import { getFaqGroup } from "@/lib/data/faqs";
import { pageMetadata } from "@/lib/site";
import { cn, formatPrice } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Personal Training",
  description:
    "1-on-1 personal training at Iron & Oak - a program written for you, a specialist coach in your corner, and sessions from $76.",
  path: "/training",
});

const ptPricing = [
  { name: "Single session", sessions: 1, price: 95, note: "Try it out" },
  { name: "5 sessions", sessions: 5, price: 425, note: "Most booked", highlighted: true },
  { name: "10 sessions", sessions: 10, price: 760, note: "Best value" },
];

const benefits = [
  {
    photo: {
      src: "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=600",
      focus: "center 40%",
    },
    title: "Built for your goals",
    body: "A program written for your body, your schedule and what you actually want to achieve.",
  },
  {
    photo: {
      src: "https://images.pexels.com/photos/3289711/pexels-photo-3289711.jpeg?auto=compress&cs=tinysrgb&w=600",
      focus: "center 20%",
    },
    title: "Faster progress",
    body: "Undivided attention means better technique, smarter loading and quicker results.",
  },
  {
    photo: {
      src: "https://images.pexels.com/photos/703016/pexels-photo-703016.jpeg?auto=compress&cs=tinysrgb&w=600",
      focus: "center 30%",
    },
    title: "Real accountability",
    body: "A coach in your corner who tracks every session and keeps you showing up.",
  },
  {
    photo: {
      src: "https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    title: "Master the lifts",
    body: "Dial in the squat, hinge, press and pull with eyes on every rep.",
  },
];

const steps = [
  { n: "01", title: "Choose your coach", body: "Pick the specialist who fits your goals." },
  { n: "02", title: "Pick a time", body: "Book a 60-minute slot from their availability." },
  { n: "03", title: "Train", body: "Show up. Your coach handles the rest." },
];

export default function TrainingPage() {
  const faqs = getFaqGroup("training")?.faqs ?? [];

  return (
    <div>
      {/* Hero */}
      <ParallaxBg
        src="https://images.pexels.com/photos/703016/pexels-photo-703016.jpeg?auto=compress&cs=tinysrgb&w=1920"
        alt="Coach training an athlete in an industrial gym"
        overlayClass="bg-ink/68"
        speed={0.25}
        priority
        className="min-h-[65vh] border-b border-line"
      >
        <div className="shell relative z-20 flex min-h-[65vh] flex-col justify-center py-20">
          <div className="max-w-2xl">
            <p className="eyebrow-ruled inline-flex">Personal training</p>
            <h1 className="mt-6 text-5xl uppercase leading-[0.9] text-bone md:text-6xl lg:text-7xl">
              Coaching,
              <br />
              <span className="text-gradient-oak">one on one.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-bone-muted">
              Nothing moves the needle like dedicated coaching. Work directly
              with a specialist on a program built entirely around you.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#book" size="lg">
                Book a session
              </ButtonLink>
              <ButtonLink href="/free-trial?goal=pt" variant="secondary" size="lg">
                Free 20-min consult
              </ButtonLink>
            </div>
          </div>
        </div>
      </ParallaxBg>

      {/* Benefits */}
      <section className="shell py-16 sm:py-24">
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4">
          {benefits.map((b) => (
            <TiltCard key={b.title} className="h-full">
              <PhotoFeatureCard
                src={b.photo.src}
                focus={b.photo.focus}
                title={b.title}
                body={b.body}
                className="h-full"
              />
            </TiltCard>
          ))}
        </div>
      </section>

      {/* Photo band between benefits and how-it-works */}
      <PhotoBand
        src="https://images.pexels.com/photos/3289711/pexels-photo-3289711.jpeg?auto=compress&cs=tinysrgb&w=1920"
        alt="Athlete mid-lift under dramatic lighting"
        overlayClass="bg-ink/60"
        eyebrow="Undivided attention"
        quote="Your coach. Your program. Your results."
      />

      {/* How it works */}
      <section className="border-y border-line bg-charcoal py-16 sm:py-24">
        <div className="shell">
          <SectionHeading
            eyebrow="How it works"
            title="Booking takes a minute"
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n}>
                <p className="font-display text-5xl text-oak/60">{s.n}</p>
                <h3 className="mt-3 text-xl uppercase text-bone">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-bone-muted">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="shell py-16 sm:py-24">
        <SectionHeading
          eyebrow="Pricing"
          title="Invest in yourself"
          description="Unlimited members get one session a month included, Performance members get four. Anyone can add more."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {ptPricing.map((p) => (
            <Card
              key={p.name}
              className={cn("flex flex-col p-6", p.highlighted && "border-oak/60 bg-charcoal-2")}
            >
              <p className="eyebrow">{p.note}</p>
              <h3 className="mt-2 text-2xl uppercase text-bone">{p.name}</h3>
              <p className="mt-4 font-display text-5xl text-bone">{formatPrice(p.price)}</p>
              <p className="mt-1 text-sm text-bone-muted">
                {p.sessions > 1
                  ? `${formatPrice(p.price / p.sessions)} per session · valid 90 days`
                  : "60 minutes · any coach"}
              </p>
              <ButtonLink
                href="#book"
                variant={p.highlighted ? "primary" : "secondary"}
                className="mt-6 w-full"
              >
                Book now
              </ButtonLink>
            </Card>
          ))}
        </div>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-bone-muted">
          {["Written program included", "Progress check-ins every 4 weeks", "Reschedule free up to 24h before"].map((t) => (
            <li key={t} className="inline-flex items-center gap-2">
              <Check className="h-4 w-4 text-oak" />
              {t}
            </li>
          ))}
        </ul>
      </section>

      {/* Booker */}
      <section id="book" className="border-t border-line bg-charcoal py-16 sm:py-24">
        <div className="shell">
        <SectionHeading
          eyebrow="Book now"
          title="Reserve your 1-on-1"
          description="Pick a coach and a time that works. Your coach confirms within a few hours."
          className="mb-10"
        />
        <TrainingBooker />
        </div>
      </section>

      {/* FAQ */}
      <section className="shell max-w-3xl py-16 sm:py-24">
        <SectionHeading eyebrow="Good to know" title="PT questions" className="mb-8" />
        <FaqList faqs={faqs} />
      </section>
    </div>
  );
}
