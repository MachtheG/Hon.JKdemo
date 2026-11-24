import { Fragment } from "react";

/**
 * Visible marker for anything not yet verified (ground rule 1). Keeps the
 * literal "[[TO CONFIRM: …]]" text (searchable, unambiguous) in a designed chip.
 */
export function ToConfirm({ note, tone = "paper" }: { note: string; tone?: "paper" | "ink" }) {
  return (
    <span
      className={
        "mx-0.5 inline-flex max-w-full flex-wrap items-baseline gap-x-1.5 border border-dashed px-1.5 py-0.5 align-baseline text-[13px] leading-snug " +
        (tone === "ink" ? "border-accent/60 text-mist" : "border-laterite-ink/60 bg-laterite/5 text-muted")
      }
    >
      <span className={"font-mono text-[11px] tracking-wider uppercase " + (tone === "ink" ? "text-accent" : "text-laterite-ink")}>
        [[TO CONFIRM:
      </span>
      <span>{note}]]</span>
    </span>
  );
}

/** Renders a translated string, turning any "[[TO CONFIRM: …]]" segment into the chip. */
export function ConfirmText({ text, tone }: { text: string; tone?: "paper" | "ink" }) {
  const parts = text.split(/\[\[TO CONFIRM:\s*([^\]]+)\]\]/);
  return (
    <>
      {parts.map((p, i) => (
        <Fragment key={i}>{i % 2 === 1 ? <ToConfirm note={p.trim()} tone={tone} /> : p}</Fragment>
      ))}
    </>
  );
}
