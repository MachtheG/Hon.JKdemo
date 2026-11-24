"use client";

import { useTranslations } from "next-intl";
import { countdownParts, pad2 } from "@/lib/countdown";
import { useNow } from "@/lib/use-now";
import { cn } from "@/lib/utils";

const UNITS = ["days", "hours", "minutes", "seconds"] as const;

/**
 * Live countdown to election day: days, hours, minutes, seconds.
 * role="timer" (implicitly aria-live="off") so screen readers aren't
 * interrupted every second; the static date sits beside it for context.
 * The server renders dashes; the client fills the live values.
 */
export function LiveCountdown({ variant }: { variant: "bar" | "tiles" }) {
  const t = useTranslations("common.countdown");
  const now = useNow();
  const parts = now === null ? null : countdownParts(now);

  if (parts && parts.phase !== "before") {
    return <span className={variant === "tiles" ? "font-display text-3xl font-semibold" : "font-semibold"}>{t(parts.phase)}</span>;
  }

  const value = (u: (typeof UNITS)[number]) => (parts ? (u === "days" ? String(parts[u]) : pad2(parts[u])) : "—");

  if (variant === "bar") {
    return (
      <span role="timer" aria-label={t("label")} className="inline-flex items-baseline gap-2.5 font-display font-semibold tabular">
        {UNITS.map((u) => (
          <span key={u} className="inline-flex items-baseline gap-0.5">
            {value(u)}
            <span className="text-[11px] font-medium opacity-80">{t(`short.${u}`)}</span>
          </span>
        ))}
      </span>
    );
  }

  return (
    <div role="timer" aria-label={t("label")} className="grid grid-cols-4 gap-2 sm:gap-4">
      {UNITS.map((u) => (
        <div key={u} className={cn("flex flex-col items-center rounded-lg bg-[#0a3d24] px-2 py-3 shadow-inner ring-1 ring-white/10 sm:py-5")}>
          <span className="font-display text-[34px] leading-none font-bold text-accent tabular sm:text-6xl">{value(u)}</span>
          <span className="mt-2 text-[11px] font-medium tracking-[0.14em] text-white/80 uppercase sm:text-xs">{t(`units.${u}`)}</span>
        </div>
      ))}
    </div>
  );
}
