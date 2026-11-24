import type { ReactNode } from "react";

/** One way to get involved. The form slot is filled in Phase 7. */
export function InvolveSection({ id, n, title, body, children }: { id: string; n: number; title: string; body: string; children?: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="grid scroll-mt-6 gap-6 border-t-[3px] border-text py-10 lg:grid-cols-[1fr_2fr]">
      <div className="flex flex-col gap-2">
        <span className="font-mono text-4xl text-laterite-ink">{String(n).padStart(2, "0")}</span>
        <h2 id={`${id}-title`} className="m-0 font-display text-[30px] leading-tight font-semibold">
          {title}
        </h2>
      </div>
      <div className="flex flex-col gap-4">
        <p className="m-0 max-w-2xl text-lg">{body}</p>
        {children}
      </div>
    </section>
  );
}
