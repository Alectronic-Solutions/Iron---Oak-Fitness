"use client";

import { useRef } from "react";
import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";
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

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const travel = speed * 220;
  const y = useTransform(scrollYProgress, [0, 1], [`${travel}px`, `-${travel}px`]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      {/* Reduced motion: the !important class beats framer's inline transform,
          so markup stays identical between server and client. */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-[-15%] w-full will-change-transform motion-reduce:transform-none!"
      >
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
      {children && <div className="relative z-20">{children}</div>}
    </div>
  );
}
