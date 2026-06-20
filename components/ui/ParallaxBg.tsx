"use client";

import { useRef } from "react";
import Image from "next/image";
import { useScroll, useTransform, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxBgProps {
  src: string;
  alt: string;
  overlayClass?: string;
  /** 0–1: fraction of section height the image travels. Default 0.25 */
  speed?: number;
  className?: string;
  children?: React.ReactNode;
  priority?: boolean;
}

export function ParallaxBg({
  src,
  alt,
  overlayClass = "bg-ink/65",
  speed = 0.25,
  className,
  children,
  priority = false,
}: ParallaxBgProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const travel = speed * 120;
  const yFull = useTransform(scrollYProgress, [0, 1], [`${travel}px`, `-${travel}px`]);
  const yStill = useTransform(scrollYProgress, [0, 1], ["0px", "0px"]);
  const y = shouldReduce ? yStill : yFull;

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div style={{ y }} className="absolute inset-[-15%] w-full">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority={priority}
        />
      </motion.div>
      {/* Dark overlay */}
      <div className={cn("absolute inset-0 z-10", overlayClass)} />
      {/* Content slot */}
      {children && (
        <div className="relative z-20">{children}</div>
      )}
    </div>
  );
}
