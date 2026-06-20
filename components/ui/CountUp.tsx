"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface Props {
  value: string; // e.g. "1,200+" or "4.9"
  duration?: number; // ms
}

function parseTarget(raw: string): { num: number; prefix: string; suffix: string; decimals: number } {
  const suffix = raw.match(/[^0-9.,]+$/)?.[0] ?? "";
  const prefix = raw.match(/^[^0-9]*/)?.[0] ?? "";
  const numStr = raw.replace(prefix, "").replace(suffix, "").replace(/,/g, "");
  const num = parseFloat(numStr);
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  return { num, prefix, suffix, decimals };
}

function formatNum(n: number, decimals: number): string {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function CountUp({ value, duration = 1400 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState("0");
  const started = useRef(false);

  const { num, prefix, suffix, decimals } = parseTarget(value);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(formatNum(num * eased, decimals));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, num, decimals, duration]);

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  );
}
