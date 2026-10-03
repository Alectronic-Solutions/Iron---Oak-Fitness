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
  /** Use "h1" when this is the page's main heading. */
  as?: "h1" | "h2";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  animated,
  as: Heading = "h2",
}: SectionHeadingProps) {
  // Page titles render immediately (they're usually the LCP element).
  const shouldAnimate = animated ?? Heading !== "h1";
  const content = (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Heading className="mt-3 text-4xl uppercase tracking-tight text-bone sm:text-5xl md:text-6xl">
        {title}
      </Heading>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-bone-muted sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );

  if (!shouldAnimate) return content;

  return <Reveal>{content}</Reveal>;
}
