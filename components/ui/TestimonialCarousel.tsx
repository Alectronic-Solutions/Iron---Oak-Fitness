"use client";

import { useEffect, useState } from "react";
import { Quote, Star } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Card } from "@/components/ui/Card";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export function TestimonialCarousel({
  testimonials,
  interval = 4500,
}: {
  testimonials: Testimonial[];
  interval?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % testimonials.length),
      interval
    );
    return () => clearInterval(id);
  }, [testimonials.length, interval]);

  return (
    <div className="relative mx-auto max-w-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Card className="flex flex-col border-l-2 border-l-oak/50 p-8 rounded-[0_1rem_1rem_0]">
            <Quote className="h-10 w-10 text-oak/30" />
            <p className="mt-4 flex-1 text-lg leading-relaxed text-bone">
              &ldquo;{testimonials[index].quote}&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-1 text-bronze">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star key={idx} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="mt-3 font-display uppercase text-bone">
              {testimonials[index].name}
            </p>
            <p className="text-xs text-bone-faint">{testimonials[index].role}</p>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Dot indicators */}
      <div className="mt-6 flex justify-center gap-1.5">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Show testimonial ${i + 1}`}
            className={`h-5 w-5 cursor-pointer rounded-full transition-colors duration-300 ${
              i === index ? "bg-oak" : "bg-bone/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
