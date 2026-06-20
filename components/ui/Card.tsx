import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends ComponentProps<"div"> {
  /** Adds a subtle hover lift + border highlight. */
  interactive?: boolean;
  /** Glassmorphism variant: frosted dark surface. */
  glass?: boolean;
}

export function Card({ className, interactive, glass, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-charcoal",
        glass && "bg-white/5 backdrop-blur-sm border-white/8",
        interactive &&
          "cursor-default transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/40",
        interactive && !glass && "hover:border-oak/50 hover:bg-charcoal-2",
        interactive && glass && "hover:border-oak/30 hover:bg-white/8",
        className,
      )}
      {...props}
    />
  );
}
