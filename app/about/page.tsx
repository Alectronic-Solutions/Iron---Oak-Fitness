import type { Metadata } from "next";
import { Hammer, TreePine } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ParallaxBg } from "@/components/ui/ParallaxBg";
import { PhotoBand } from "@/components/ui/PhotoBand";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind Iron & Oak Fitness - strength built to last, grounded in good coaching.",
};

const stats = [
  { value: "2019", label: "Founded" },
  { value: "1,200+", label: "Members" },
  { value: "12", label: "Coaches" },
  { value: "40+", label: "Classes / week" },
];

const values = [
  {
    title: "Coaching first",
    body: "Every session is led, not just supervised. You'll always have eyes on your form and a plan for your next step.",
  },
  {
    title: "Strength for life",
    body: "We train for the next forty years, not the next four weeks. Progress you can keep is the only progress that counts.",
  },
  {
    title: "Everyone belongs",
    body: "First-timer or competitor, nervous or seasoned: the floor is yours. We meet you where you are.",
  },
  {
    title: "No gimmicks",
    body: "No fads, no shame, no contracts. Just honest programming and hard, rewarding work.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <ParallaxBg
        src="https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&cs=tinysrgb&w=1920"
        alt="Athlete in focused training session"
        overlayClass="bg-ink/70"
        speed={0.25}
        priority
        className="min-h-[70vh] border-b border-line"
      >
        <div className="shell relative z-20 flex min-h-[70vh] flex-col justify-center py-20">
          <div className="max-w-3xl">
            <p className="eyebrow-ruled inline-flex">Our story</p>
            <h1 className="mt-6 text-5xl uppercase leading-[0.9] text-bone md:text-6xl lg:text-7xl">
              Built on iron.
              <br />
              <span className="text-gradient-oak">Grounded in oak.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-bone-muted">
              Iron &amp; Oak started in a single garage with a handful of
              barbells and one stubborn belief: that great coaching changes
              everything. Years later, that belief still runs the room.
            </p>
          </div>
        </div>
      </ParallaxBg>

      {/* Two pillars */}
      <section className="shell py-16 sm:py-24">
        <div className="grid gap-5 md:grid-cols-2">
          <Card className="p-8">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-oak/15 text-oak-soft">
              <Hammer className="h-6 w-6" />
            </span>
            <h2 className="mt-5 text-2xl uppercase text-bone">Iron: the work</h2>
            <p className="mt-3 leading-relaxed text-bone-muted">
              Heavy barbells, honest effort and measurable progress. Strength is
              the foundation everything else is built on, and we never
              shortcut it.
            </p>
          </Card>
          <Card className="p-8">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-oak/15 text-oak-soft">
              <TreePine className="h-6 w-6" />
            </span>
            <h2 className="mt-5 text-2xl uppercase text-bone">
              Oak: the longevity
            </h2>
            <p className="mt-3 leading-relaxed text-bone-muted">
              Mobility, recovery and patience. We build bodies that last:
              grounded, durable and ready for whatever the decades ask of them.
            </p>
          </Card>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-line bg-charcoal">
        <div className="shell grid grid-cols-2 gap-6 py-12 sm:grid-cols-4 sm:py-20">
          {stats.map((s) => (
            <div key={s.label} className="text-center sm:text-left">
              <div className="mb-3 w-6 border-t border-oak/30 max-sm:mx-auto" />
              <p className="font-display text-4xl text-oak-soft sm:text-5xl">
                {s.value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-bone-faint">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Photo band */}
      <PhotoBand
        src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1920"
        alt="Barbell plates in a dark gym"
        overlayClass="bg-ink/58"
        eyebrow="What we believe"
        quote="Honest work. Real results."
      />

      {/* Values */}
      <section className="shell py-16 sm:py-24">
        <SectionHeading
          eyebrow="The principles we coach by"
          title="What makes us different"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {values.map((v) => (
            <Card key={v.title} className="p-6">
              <h3 className="text-xl uppercase text-bone">{v.title}</h3>
              <p className="mt-2 leading-relaxed text-bone-muted">{v.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="grain border-t border-line">
        <div className="shell py-20 text-center sm:py-24">
          <h2 className="mx-auto max-w-2xl text-4xl uppercase leading-tight text-bone sm:text-5xl md:text-6xl">
            Come find your strength.
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/membership" size="lg">
              Become a member
            </ButtonLink>
            <ButtonLink href="/trainers" variant="secondary" size="lg">
              Meet the coaches
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
