import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TrainerCard } from "@/components/trainers/TrainerCard";
import { trainers } from "@/lib/data/trainers";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Coaches",
  description:
    "Meet the Iron & Oak coaching team - certified strength, conditioning, mobility and performance specialists.",
  path: "/trainers",
});

const totalYears = trainers.reduce((n, t) => n + t.yearsExperience, 0);

export default function TrainersPage() {
  return (
    <div>
      <section className="grain border-b border-line">
        <div className="shell py-10 sm:py-16">
          <SectionHeading
            as="h1"
            eyebrow="The team"
            title="Meet your coaches"
            description="Every coach here is certified, experienced, and genuinely invested in your progress. Find the one who fits your goals - then book a session."
          />
          <p className="mt-6 text-sm text-bone-muted">
            <span className="font-display text-2xl text-bone">{totalYears}+</span>{" "}
            years of combined coaching experience
          </p>
        </div>
      </section>
      <div className="shell py-10 sm:py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {trainers.map((t, i) => (
            <Reveal key={t.id} delay={Math.min(i * 0.06, 0.3)} className="h-full">
              <TrainerCard trainer={t} />
            </Reveal>
          ))}
        </div>
      </div>
      <section className="grain border-t border-line">
        <div className="shell flex flex-col items-start gap-6 py-14 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl uppercase text-bone sm:text-4xl">Not sure who to pick?</h2>
            <p className="mt-2 text-bone-muted">
              Book a free 20-minute consult and we&apos;ll match you with the right coach.
            </p>
          </div>
          <ButtonLink href="/free-trial?goal=pt" size="lg" className="w-full sm:w-auto">
            Free consult <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
