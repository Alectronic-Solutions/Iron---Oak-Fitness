import Image from "next/image";
import { cn } from "@/lib/utils";

interface PhotoFeatureCardProps {
  src: string;
  focus?: string;
  title: string;
  body: string;
  className?: string;
}

/** Full-bleed photo card with a bottom scrim and overlaid title/body. */
export function PhotoFeatureCard({
  src,
  focus,
  title,
  body,
  className,
}: PhotoFeatureCardProps) {
  return (
    <div
      className={cn(
        "group relative flex aspect-[3/4] w-full flex-col justify-end overflow-hidden rounded-2xl border border-line",
        className,
      )}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="(min-width: 768px) 25vw, 50vw"
        className="object-cover transition-transform duration-500 ease-out-soft group-hover:scale-105"
        style={focus ? { objectPosition: focus } : undefined}
      />
      <div className="absolute inset-0 bg-linear-to-t from-ink from-15% via-ink/80 via-55% to-ink/5" />
      <div className="relative z-10 p-6">
        <div className="mb-3 h-px w-8 bg-oak-soft/80" />
        <h3 className="text-xl uppercase leading-tight text-bone">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-bone-muted">{body}</p>
      </div>
    </div>
  );
}
