"use client";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  animated?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  animated = true,
}: SectionHeadingProps) {
  const content = (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-3 text-4xl uppercase tracking-tight text-bone sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-bone-muted">
          {description}
        </p>
      )}
    </div>
  );

  if (!animated) return content;

  return <Reveal>{content}</Reveal>;
}
