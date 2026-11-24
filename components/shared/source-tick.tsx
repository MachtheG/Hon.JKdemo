import { useTranslations } from "next-intl";
import { useId } from "react";
import { sourceById, type SourceId } from "@/data/sources";

/**
 * The ▪ beside every figure. Opens a native popover (no JS) with the source's
 * title, publisher, date and link from data/sources.ts.
 */
export function SourceTick({ id, tone = "laterite" }: { id: SourceId; tone?: "laterite" | "accent" }) {
  const t = useTranslations("common.source");
  const s = sourceById[id];
  const popId = `src-${useId().replace(/:/g, "")}`;

  return (
    <>
      <button
        type="button"
        popoverTarget={popId}
        aria-label={t("tick", { title: s.title })}
        className="relative ml-1 inline-flex size-6 -translate-y-2 items-center justify-center align-baseline"
      >
        <span aria-hidden className={tone === "accent" ? "size-2 bg-accent" : "size-2 bg-laterite"} />
      </button>
      <div
        id={popId}
        popover="auto"
        className="m-auto max-w-sm border border-ink bg-surface-raised p-5 font-sans text-base text-text shadow-2xl backdrop:bg-ink/40"
      >
        <p className="m-0 font-display text-lg font-semibold">{s.title}</p>
        <p className="m-0 mt-1 text-sm text-muted">
          {s.publisher}
          {s.date !== "undated" ? ` · ${t("published", { date: s.date })}` : ""}
        </p>
        {s.notes ? <p className="m-0 mt-2 text-sm">{s.notes}</p> : null}
        <div className="mt-4 flex gap-3">
          <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-semibold text-tea">
            {t("open")} ↗
          </a>
          <button type="button" popoverTarget={popId} popoverTargetAction="hide" className="min-h-11 px-3 text-sm underline">
            {t("close")}
          </button>
        </div>
      </div>
    </>
  );
}
