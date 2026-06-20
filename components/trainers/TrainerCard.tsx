import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { Trainer } from "@/types";

export function TrainerCard({ trainer }: { trainer: Trainer }) {
  return (
    <Link href={`/trainers/${trainer.slug}`} className="group block h-full">
      <Card interactive className="flex h-full flex-col overflow-hidden p-0">
        <div className="h-1 w-full bg-linear-to-r from-oak to-bronze" />
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between">
            <Avatar initials={trainer.initials} size="lg" colorKey={trainer.id} image={trainer.image} />
            <ArrowUpRight className="h-5 w-5 text-bone-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-oak-soft" />
          </div>
          <h3 className="mt-4 text-xl uppercase text-bone">{trainer.name}</h3>
          <p className="text-sm text-oak-soft">{trainer.role}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {trainer.specialties.slice(0, 3).map((s) => (
              <Badge key={s}>{s}</Badge>
            ))}
          </div>
        </div>
      </Card>
    </Link>
  );
}
