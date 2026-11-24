import type { ReactNode } from "react";

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-6">
      <div className="tea-rule" />
      <h2 className="m-0 font-display text-3xl font-semibold sm:text-4xl">{title}</h2>
      {children}
    </section>
  );
}
