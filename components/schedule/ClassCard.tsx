import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { getTrainer } from "@/lib/data/trainers";
import type { FitnessClass } from "@/types";
import type { ComponentProps } from "react";

type Tone = ComponentProps<typeof Badge>["tone"];

const categoryTone: Record<string, Tone> = {
  Strength: "oak",
  Conditioning: "conditioning",
  Mobility: "mobility",
  Endurance: "endurance",
};

export function ClassCard({ fitnessClass }: { fitnessClass: FitnessClass }) {
  const coach = getTrainer(fitnessClass.coachId);
  const tone = categoryTone[fitnessClass.category] ?? "default";

  return (
    <Link
      href={`/classes/${fitnessClass.slug}`}
      className="group block h-full"
    >
      <Card interactive className="flex h-full flex-col p-6">
        <div className="flex items-center justify-between">
          <Badge tone={tone}>{fitnessClass.category}</Badge>
          <ArrowUpRight className="h-5 w-5 text-bone-faint transition-colors group-hover:text-oak-soft" />
        </div>
        <h3 className="mt-4 text-2xl uppercase leading-none text-bone">
          {fitnessClass.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-bone-muted">
          {fitnessClass.tagline}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-bone-faint">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {fitnessClass.durationMin} min
          </span>
          <span aria-hidden>•</span>
          <span>{fitnessClass.intensity}</span>
          {coach && (
            <>
              <span aria-hidden>•</span>
              <span className="inline-flex items-center gap-1">
                <Avatar initials={coach.initials} image={coach.image} colorKey={coach.id} size="sm" className="h-4 w-4 text-[8px]" />
                {coach.name}
              </span>
            </>
          )}
        </div>
      </Card>
    </Link>
  );
}
