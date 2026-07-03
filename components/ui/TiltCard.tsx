"use client";

import { useRef, useSyncExternalStore } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

const HOVER_QUERY = "(hover: hover) and (pointer: fine)";

function subscribeToHoverCapability(callback: () => void) {
  const mq = window.matchMedia(HOVER_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getHoverCapability() {
  return window.matchMedia(HOVER_QUERY).matches;
}

function getServerHoverCapability() {
  return false;
}

/** Wraps children in a restrained cursor-tracked tilt (±3deg) - a quiet
 *  sense of depth, not a spotlight effect. No-ops on touch/coarse-pointer
 *  devices and when reduced motion is set. */
export function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const canHover = useSyncExternalStore(
    subscribeToHoverCapability,
    getHoverCapability,
    getServerHoverCapability,
  );

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 260, damping: 28 });
  const sy = useSpring(my, { stiffness: 260, damping: 28 });
  const rotateX = useTransform(sy, [0, 1], [3, -3]);
  const rotateY = useTransform(sx, [0, 1], [-3, 3]);

  if (reduced || !canHover) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn("transform-3d", className)}
      style={{ rotateX, rotateY }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      onMouseLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
    >
      {children}
    </motion.div>
  );
}
