"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, Quote, Star } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

const navButton =
  "grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-line text-bone-muted transition-colors hover:border-oak hover:text-oak-soft";

/** Auto-advancing quotes that pause on hover/focus, can be paused outright
 *  (WCAG 2.2.2), and don't auto-play at all for reduced-motion users. */
export function TestimonialCarousel({
  testimonials,
  interval = 6000,
}: {
  testimonials: Testimonial[];
  interval?: number;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);

  const count = testimonials.length;
  const go = (delta: number) => setIndex((i) => (i + delta + count) % count);

  useEffect(() => {
    if (paused || hovering) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") setIndex((i) => (i + 1) % count);
    }, interval);
    return () => window.clearInterval(id);
  }, [paused, hovering, count, interval]);

  const t = testimonials[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Member testimonials"
      className="relative mx-auto max-w-2xl"
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovering(true)}
      onPointerLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHovering(false);
      }}
    >
      <div aria-live={paused || hovering ? "polite" : "off"}>
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${count}`}
          >
            <Card className="flex min-h-72 flex-col rounded-[0_1rem_1rem_0] border-l-2 border-l-oak/50 p-6 sm:p-8">
              <Quote className="h-10 w-10 text-oak/30" aria-hidden />
              <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-bone">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center gap-1 text-bronze" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" aria-hidden />
                ))}
              </div>
              <p className="mt-3 font-display uppercase text-bone">{t.name}</p>
              <p className="text-xs text-bone-faint">{t.role}</p>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-center gap-2">
        <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className={navButton}>
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show testimonial ${i + 1}`}
              aria-current={i === index}
              className="grid h-11 w-8 cursor-pointer place-items-center"
            >
              <span
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === index ? "w-6 bg-oak" : "w-2 bg-bone/25",
                )}
              />
            </button>
          ))}
        </div>
        <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className={navButton}>
          <ChevronRight className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Resume auto-play" : "Pause auto-play"}
          className={cn(navButton, "ml-2")}
        >
          {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
        </button>
      </div>
    </section>
  );
}
