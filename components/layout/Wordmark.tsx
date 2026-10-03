import Link from "next/link";
import { Dumbbell } from "lucide-react";
import { cn } from "@/lib/utils";

export function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("group flex min-h-11 items-center gap-2.5", className)}
      aria-label="Iron & Oak Fitness - home"
    >
      <span className="grid h-9 w-9 place-items-center rounded-md bg-bronze text-ink transition-transform group-hover:-rotate-6">
        <Dumbbell className="h-5 w-5" />
      </span>
      <span className="font-display text-xl uppercase tracking-[-0.02em] text-bone">
        Iron <span className="text-oak-soft">&amp;</span> Oak
      </span>
    </Link>
  );
}
