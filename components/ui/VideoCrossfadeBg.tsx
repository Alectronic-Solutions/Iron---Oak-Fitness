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
const PRELOAD_LEAD_SECONDS = 3;

export function VideoCrossfadeBg({
  sources,
  overlayClass = "bg-ink/65",
  className,
  children,
}: VideoCrossfadeBgProps) {
  const shouldReduce = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const preloadedIndexes = useRef(new Set<number>());

  function preloadVideo(index: number) {
    const video = videoRefs.current[index];
    if (!video || preloadedIndexes.current.has(index)) return;

    preloadedIndexes.current.add(index);
    video.preload = "auto";
    video.load();
  }

  useEffect(() => {
    if (shouldReduce) return;

    const active = videoRefs.current[activeIndex];
    if (active) {
      preloadedIndexes.current.add(activeIndex);
      active.currentTime = 0;
      void active.play();
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

  const handleTimeUpdate = (index: number, video: HTMLVideoElement) => {
    if (
      sources.length < 2 ||
      index !== activeIndex ||
      shouldReduce ||
      !Number.isFinite(video.duration)
    ) return;

    if (video.duration - video.currentTime <= PRELOAD_LEAD_SECONDS) {
      preloadVideo((index + 1) % sources.length);
    }
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
              onTimeUpdate={(event) => handleTimeUpdate(index, event.currentTarget)}
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
