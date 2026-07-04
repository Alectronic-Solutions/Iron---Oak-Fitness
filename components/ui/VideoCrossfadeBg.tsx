"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface VideoCrossfadeBgProps {
  sources: string[];
  overlayClass?: string;
  className?: string;
  children?: React.ReactNode;
}

const FADE_MS = 1200;

export function VideoCrossfadeBg({
  sources,
  overlayClass = "bg-ink/65",
  className,
  children,
}: VideoCrossfadeBgProps) {
  const shouldReduce = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    if (shouldReduce) return;

    const active = videoRefs.current[activeIndex];
    if (active) {
      active.currentTime = 0;
      void active.play();
    }

    const next = (activeIndex + 1) % sources.length;
    const nextVideo = videoRefs.current[next];
    // Preload the upcoming clip once the current one starts playing.
    if (nextVideo && nextVideo.preload !== "auto") {
      nextVideo.preload = "auto";
      nextVideo.load();
    }

    // Pause every other clip so they don't keep decoding off-screen.
    videoRefs.current.forEach((video, index) => {
      if (video && index !== activeIndex) video.pause();
    });
  }, [activeIndex, sources.length, shouldReduce]);

  const handleEnded = (index: number) => {
    if (index !== activeIndex) return;
    setActiveIndex((index + 1) % sources.length);
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="absolute inset-0" aria-hidden="true">
        {sources.map((src, index) => {
          const isActive = shouldReduce ? index === 0 : index === activeIndex;
          return (
            <video
              key={src}
              ref={(el) => {
                videoRefs.current[index] = el;
              }}
              src={src}
              muted
              playsInline
              autoPlay={index === 0}
              loop={shouldReduce ? index === 0 : false}
              preload={index === 0 ? "auto" : "none"}
              onEnded={() => handleEnded(index)}
              className="absolute inset-0 h-full w-full object-cover transition-opacity ease-out-soft"
              style={{
                opacity: isActive ? 1 : 0,
                transitionDuration: `${FADE_MS}ms`,
              }}
            />
          );
        })}
      </div>
      {/* Dark overlay */}
      <div className={cn("absolute inset-0 z-10", overlayClass)} />
      {/* Content slot */}
      {children && <div className="relative z-20">{children}</div>}
    </div>
  );
}
