import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { perClass } from "@/lib/data/plans";
import { formatPrice } from "@/lib/utils";
import type { ClassPack } from "@/types";

export function ClassPackCard({ pack }: { pack: ClassPack }) {
  const isSingle = pack.classes === 1;

  return (
    <Card className="flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display text-xl uppercase text-bone">{pack.name}</h3>
        {!isSingle && (
          <Badge tone="oak">{formatPrice(perClass(pack))}/class</Badge>
        )}
      </div>

      <p className="mt-4 font-display text-4xl text-bone">
        {formatPrice(pack.price)}
      </p>
      <p className="mt-1 flex-1 text-sm text-bone-muted">
        {isSingle ? "Single class" : `${pack.classes} classes`} · valid{" "}
        {pack.validityDays} days
      </p>

      <ButtonLink href="/account" variant="secondary" className="mt-6 w-full">
        Buy pack
      </ButtonLink>
    </Card>
  );
}
