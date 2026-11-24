"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { formatNumber } from "@/lib/format";

/**
 * Counts up once as the figure approaches the viewport. The final value is
 * always what the server renders, and it is never replaced unless the
 * animation actually runs — so screenshots, crawlers, print, reduced motion
 * and lite mode always see the real, sourced figure.
 */
export function AnimatedNumber({ value, decimals = 0, suffix = "" }: { value: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  // Fire slightly before the figure scrolls in, so the count starts off-screen.
  const nearView = useInView(ref, { once: true, margin: "0px 0px 15% 0px" });
  const reduced = useReducedMotion();
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !nearView || done.current) return;
    done.current = true;
    if (reduced || document.documentElement.dataset.lite === "true") return;
    // Already on screen when we mounted: keep the final value, no animation.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    const controls = animate(0, value, {
      duration: 0.9,
      ease: "easeOut",
      onUpdate: (v) => {
        el.textContent = `${formatNumber(v, decimals)}${suffix}`;
      },
      onComplete: () => {
        el.textContent = `${formatNumber(value, decimals)}${suffix}`;
      },
    });
    return () => {
      controls.stop();
      el.textContent = `${formatNumber(value, decimals)}${suffix}`;
    };
  }, [nearView, reduced, value, decimals, suffix]);

  return (
    <span ref={ref} className="tabular">
      {`${formatNumber(value, decimals)}${suffix}`}
    </span>
  );
}
