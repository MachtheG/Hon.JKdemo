/** Visible marker for anything not yet verified (ground rule 1). */
export function ToConfirm({ note }: { note: string }) {
  return (
    <span className="ml-1 inline-block bg-ink px-1.5 py-0.5 align-middle font-mono text-[11px] leading-snug text-accent">
      [[TO CONFIRM: {note}]]
    </span>
  );
}
