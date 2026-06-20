import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TrainerCard } from "@/components/trainers/TrainerCard";
import { trainers } from "@/lib/data/trainers";

export const metadata: Metadata = {
  title: "Trainers",
  description:
    "Meet the Iron & Oak coaching team - strength, conditioning, mobility and performance specialists.",
};

export default function TrainersPage() {
  return (
    <div>
      <section className="grain border-b border-line">
        <div className="shell py-12 sm:py-16">
          <SectionHeading
            eyebrow="The team"
            title="Meet your coaches"
            description="Every coach here is certified, experienced, and genuinely invested in your progress. Find the one who fits your goals - then book a session."
          />
        </div>
      </section>
      <div className="shell py-12 sm:py-16">
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {trainers.map((t) => (
            <TrainerCard key={t.id} trainer={t} />
          ))}
        </div>
      </div>
    </div>
  );
}
