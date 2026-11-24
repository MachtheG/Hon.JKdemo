import { useTranslations } from "next-intl";
import { useId } from "react";
import { sourceById, type SourceId } from "@/data/sources";

/**
 * The ▪ beside every figure. Opens a native popover (no JS) listing the
 * source(s) — title, publisher, date, notes and link from data/sources.ts.
 * Several sources render as ONE tick with a count, never "▪ ▪".
 *
 * Phrasing content only (<span>, <a>, <button>) so it is valid inside <p>,
 * <span>, <dd> and headings. The hit area is 34×44px; the mark stays 8px.
 */
export function SourceTick({ id, tone = "laterite" }: { id: SourceId | SourceId[]; tone?: "laterite" | "accent" }) {
  const t = useTranslations("common.source");
  const list = (Array.isArray(id) ? id : [id]).map((x) => sourceById[x]);
  const popId = `src-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  // The visible count must be part of the accessible name (WCAG 2.5.3).
  // Hit area grows left and vertically only (34×44px): extending right could push past the viewport edge.
  const label =
    list.length > 1
      ? t("many", { count: list.length, titles: list.map((s) => s.title).join("; ") })
      : t("tick", { title: list[0].title });

  return (
    <>
      <button
        type="button"
        popoverTarget={popId}
        aria-label={label}
        className="relative ml-1 inline-flex h-6 min-w-6 -translate-y-2 items-center justify-center gap-0.5 align-baseline before:absolute before:-inset-y-2.5 before:right-0 before:-left-2.5 before:content-['']"
      >
        <span aria-hidden className={tone === "accent" ? "size-[7px] rounded-full bg-accent" : "size-[7px] rounded-full bg-laterite"} />
        {list.length > 1 ? (
          <span aria-hidden className={"font-mono text-[10px] leading-none " + (tone === "accent" ? "text-accent" : "text-laterite-ink")}>
            {list.length}
          </span>
        ) : null}
      </button>
      <span
        id={popId}
        popover="auto"
        role="dialog"
        aria-label={list.map((s) => s.title).join("; ")}
        className="m-auto max-h-[80vh] max-w-sm overflow-y-auto border border-ink bg-surface-raised p-5 text-left font-sans text-base leading-normal font-normal tracking-normal text-text normal-case shadow-2xl backdrop:bg-ink/40 [&:popover-open]:block"
      >
        {list.map((s, i) => (
          <span key={s.id} className={"block " + (i > 0 ? "mt-4 border-t border-rule pt-4" : "")}>
            <span className="block font-display text-lg font-semibold">{s.title}</span>
            <span className="mt-1 block text-sm text-muted">
              {s.publisher}
              {s.date !== "undated" ? ` · ${t("published", { date: s.date })}` : ""}
            </span>
            {s.notes ? <span className="mt-2 block text-sm">{s.notes}</span> : null}
            <a href={s.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-11 items-center font-semibold text-tea">
              {t("open")} ↗
            </a>
          </span>
        ))}
        <button type="button" popoverTarget={popId} popoverTargetAction="hide" className="mt-2 min-h-11 px-0 text-sm underline">
          {t("close")}
        </button>
      </span>
    </>
  );
}
