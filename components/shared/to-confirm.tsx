import { Fragment } from "react";

/**
 * Unverified items (ground rule 1).
 * - Internal review build (NEXT_PUBLIC_SHOW_TO_CONFIRM=true): shown as visible
 *   "[[TO CONFIRM: …]]" chips so the campaign can see what is outstanding.
 * - Public build (default): the marker AND anything that depends on it are
 *   omitted — the site never states an unverified fact, and never looks unfinished.
 * Every marker is tracked in PROGRESS.md.
 */
export const SHOW_TO_CONFIRM = process.env.NEXT_PUBLIC_SHOW_TO_CONFIRM === "true";

const MARKER = /\s*\[\[TO CONFIRM:\s*([^\]]+)\]\]\.?/g;

export function ToConfirm({ note, tone = "paper" }: { note: string; tone?: "paper" | "ink" }) {
  if (!SHOW_TO_CONFIRM) return null;
  return (
    <span
      className={
        "mx-0.5 inline-flex max-w-full flex-wrap items-baseline gap-x-1.5 rounded border border-dashed px-1.5 py-0.5 align-baseline text-[13px] leading-snug " +
        (tone === "ink" ? "border-accent/60 text-white/80" : "border-tea/50 bg-mist text-muted")
      }
    >
      <span className={"text-[11px] font-semibold tracking-wider uppercase " + (tone === "ink" ? "text-accent" : "text-tea")}>[[TO CONFIRM:</span>
      <span>{note}]]</span>
    </span>
  );
}

/** Text without its markers (public), e.g. for meta tags or "is anything left?" checks. */
export function stripConfirm(text: string): string {
  return text.replace(MARKER, "").trim();
}

/** Renders a translated string; "[[TO CONFIRM: …]]" segments become chips (review) or vanish (public). */
export function ConfirmText({ text, tone }: { text: string; tone?: "paper" | "ink" }) {
  if (!SHOW_TO_CONFIRM) return <>{stripConfirm(text)}</>;
  const parts = text.split(/\[\[TO CONFIRM:\s*([^\]]+)\]\]/);
  return (
    <>
      {parts.map((p, i) => (
        <Fragment key={i}>{i % 2 === 1 ? <ToConfirm note={p.trim()} tone={tone} /> : p}</Fragment>
      ))}
    </>
  );
}
