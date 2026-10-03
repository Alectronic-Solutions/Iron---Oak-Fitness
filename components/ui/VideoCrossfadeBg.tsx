"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface VideoSource {
  /** Tablet/desktop rendition (1080p is plenty under a dark overlay). */
  src: string;
  /** Lightweight phone rendition (~960×540, ~1–2 MB). */
  mobileSrc: string;
}

interface VideoCrossfadeBgProps {
  sources: VideoSource[];
  /** Still image shown immediately (it's the LCP element), and kept for
   *  reduced-motion and data-saver users, or if autoplay is blocked. */
  poster: string;
  posterAlt?: string;
  overlayClass?: string;
  className?: string;
  children?: React.ReactNode;
}

const FADE_MS = 1200;
const PRELOAD_LEAD_SECONDS = 3;
const MOBILE_QUERY = "(max-width: 767px)";
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

type NetworkInfo = { saveData?: boolean; effectiveType?: string };

/** "none" | "mobile" | "desktop": which rendition this device should get. */
type Mode = "none" | "mobile" | "desktop";

function subscribe(callback: () => void) {
  const queries = [MOBILE_QUERY, REDUCED_QUERY].map((q) => window.matchMedia(q));
  queries.forEach((mq) => mq.addEventListener("change", callback));
  return () => queries.forEach((mq) => mq.removeEventListener("change", callback));
}

function getMode(): Mode {
  const net = (navigator as Navigator & { connection?: NetworkInfo }).connection;
  if (window.matchMedia(REDUCED_QUERY).matches) return "none";
  if (net?.saveData || /(^|-)2g$/.test(net?.effectiveType ?? "")) return "none";
  return window.matchMedia(MOBILE_QUERY).matches ? "mobile" : "desktop";
}

/** Hero background that crossfades a playlist of muted clips over a poster.
 *
 *  Performance budget:
 *  - Poster paints first; video starts downloading only after the page has
 *    loaded and the browser is idle, so it never competes with LCP.
 *  - Phones get ~1–2 MB clips instead of the desktop renditions.
 *  - Only the active clip downloads; the next one preloads 3s before its turn.
 *  - Playback pauses whenever the hero is scrolled out of view.
 *  - Each clip fades in only once it's actually playing, so a slow network
 *    shows the poster rather than a black frame. */
export function VideoCrossfadeBg({
  sources,
  poster,
  posterAlt = "",
  overlayClass = "bg-ink/65",
  className,
  children,
}: VideoCrossfadeBgProps) {
  const mode = useSyncExternalStore(subscribe, getMode, () => "none" as Mode);
  const [started, setStarted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  // The clip currently on screen. Stays on the outgoing clip (frozen on its
  // last frame) until the next one is really playing - no poster flash.
  const [shownIndex, setShownIndex] = useState<number | null>(null);
  const [inView, setInView] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const preloadedIndexes = useRef(new Set<number>());

  const enabled = mode !== "none" && started;

  // Wait for the load event + an idle slot before fetching any video.
  useEffect(() => {
    if (mode === "none") return;
    let idleId: number | undefined;
    const kick = () => {
      const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
      idleId = ric(() => setStarted(true), { timeout: 2000 });
    };
    if (document.readyState === "complete") kick();
    else window.addEventListener("load", kick, { once: true });
    return () => {
      window.removeEventListener("load", kick);
      if (idleId !== undefined) (window.cancelIdleCallback ?? window.clearTimeout)(idleId);
    };
  }, [mode]);

  // Pause off-screen: saves battery and stops pointless decoding on phones.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || !enabled) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.05,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const active = videoRefs.current[activeIndex];
    if (active) {
      if (inView) {
        preloadedIndexes.current.add(activeIndex);
        active.muted = true; // iOS requires muted to be set before play()
        // Autoplay can be refused (e.g. iOS Low Power Mode); the poster covers it.
        active.play().catch(() => {});
      } else {
        active.pause();
      }
    }

    // Pause every other clip so they don't keep decoding off-screen.
    videoRefs.current.forEach((video, index) => {
      if (video && index !== activeIndex) video.pause();
    });
  }, [activeIndex, enabled, inView]);

  function preloadVideo(index: number) {
    const video = videoRefs.current[index];
    if (!video || preloadedIndexes.current.has(index)) return;
    preloadedIndexes.current.add(index);
    video.preload = "auto";
    video.load();
  }

  const handleEnded = (index: number) => {
    if (index !== activeIndex) return;
    const next = (index + 1) % sources.length;
    const nextVideo = videoRefs.current[next];
    if (nextVideo) nextVideo.currentTime = 0;
    setActiveIndex(next);
  };

  const handleTimeUpdate = (index: number, video: HTMLVideoElement) => {
    if (sources.length < 2 || index !== activeIndex || !Number.isFinite(video.duration)) return;
    if (video.duration - video.currentTime <= PRELOAD_LEAD_SECONDS) {
      preloadVideo((index + 1) % sources.length);
    }
  };

  return (
    <div ref={rootRef} className={cn("relative overflow-hidden", className)}>
      <div className="absolute inset-0" aria-hidden="true">
        <Image src={poster} alt={posterAlt} fill priority sizes="100vw" className="object-cover" />
        {enabled &&
          sources.map((source, index) => {
            const src = mode === "mobile" ? source.mobileSrc : source.src;
            const visible = index === shownIndex;
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
                loop={sources.length === 1}
                preload={index === 0 ? "auto" : "none"}
                disablePictureInPicture
                disableRemotePlayback
                tabIndex={-1}
                onPlaying={() => {
                  if (index === activeIndex) setShownIndex(index);
                }}
                onEnded={() => handleEnded(index)}
                onTimeUpdate={(event) => handleTimeUpdate(index, event.currentTarget)}
                className="absolute inset-0 h-full w-full object-cover transition-opacity ease-out-soft"
                style={{ opacity: visible ? 1 : 0, transitionDuration: `${FADE_MS}ms` }}
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
