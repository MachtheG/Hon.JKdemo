"use client";

import { useEffect, useRef } from "react";
import { formatNumber } from "@/lib/format";

/**
 * Counts up once as the figure approaches the viewport (~0.9 s, ease-out).
 * Dependency-free (IntersectionObserver + requestAnimationFrame) to keep the
 * shared bundle small. The final value is always what the server renders and is
 * only replaced while the animation actually runs — so screenshots, crawlers,
 * print, reduced motion and lite mode always see the real, sourced figure.
 */
export function AnimatedNumber({ value, decimals = 0, suffix = "" }: { value: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const final = `${formatNumber(value, decimals)}${suffix}`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || document.documentElement.dataset.lite === "true") return;
    // Already on screen at mount: keep the final value.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / 900);
          const eased = 1 - (1 - p) ** 3;
          el.textContent = `${formatNumber(value * eased, decimals)}${suffix}`;
          if (p < 1) raf = requestAnimationFrame(tick);
          else el.textContent = final;
        };
        raf = requestAnimationFrame(tick);
      },
      { rootMargin: "0px 0px 15% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = final;
    };
  }, [value, decimals, suffix, final]);

  return (
    <span ref={ref} className="tabular">
      {final}
    </span>
  );
}
