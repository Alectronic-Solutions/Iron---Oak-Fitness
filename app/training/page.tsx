import type { Metadata } from "next";
import { ClipboardCheck, Gauge, Target, Trophy } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TrainingBooker } from "@/components/trainers/TrainingBooker";
import { ParallaxBg } from "@/components/ui/ParallaxBg";
import { PhotoBand } from "@/components/ui/PhotoBand";

export const metadata: Metadata = {
  title: "Personal Training",
  description:
    "1-on-1 personal training at Iron & Oak - tailored programming and coaching built around your goals.",
};

const benefits = [
  {
    icon: Target,
    title: "Built for your goals",
    body: "A program written for your body, your schedule and what you actually want to achieve.",
  },
  {
    icon: Gauge,
    title: "Faster progress",
    body: "Undivided attention means better technique, smarter loading and quicker results.",
  },
  {
    icon: ClipboardCheck,
    title: "Real accountability",
    body: "A coach in your corner who tracks every session and keeps you showing up.",
  },
  {
    icon: Trophy,
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
            <ButtonLink href="#book" size="lg" className="mt-8">
              Book a session
            </ButtonLink>
          </div>
        </div>
      </ParallaxBg>

      {/* Benefits */}
      <section className="shell py-16 sm:py-24">
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4">
          {benefits.map((b) => (
            <Card key={b.title} className="p-6">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-oak/15 text-oak-soft">
                <b.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xl uppercase text-bone">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-bone-muted">
                {b.body}
              </p>
            </Card>
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

      {/* Booker */}
      <section id="book" className="shell scroll-mt-20 py-16 sm:py-24">
        <SectionHeading
          eyebrow="Book now"
          title="Reserve your 1-on-1"
          description="Pick a coach and a time that works. Personal-training sessions are included with Performance memberships, or available as add-ons."
          className="mb-12"
        />
        <TrainingBooker />
      </section>
    </div>
  );
}
