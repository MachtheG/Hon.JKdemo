"use client";

import { useState } from "react";

export interface Bar {
  key: string;
  label: string;
  value: number;
  display: string;
}

/**
 * Single-series bar chart (dataviz rules: one hue, no legend box — the title
 * names the series; recessive grid; 4px rounded data-end; 2px gaps; hover and
 * keyboard-focus tooltip; table view). Empty state when every value is 0.
 */
export function BarChart({
  title,
  bars,
  emptyLabel,
  tableLabel,
  columns,
}: {
  title: string;
  bars: Bar[];
  emptyLabel: string;
  tableLabel: string;
  columns: [string, string];
}) {
  const [active, setActive] = useState<string | null>(null);
  const max = Math.max(0, ...bars.map((b) => b.value));
  const empty = max === 0;

  return (
    <figure className="m-0 flex flex-col gap-3">
      <figcaption className="font-display text-xl font-semibold sm:text-2xl">{title}</figcaption>
      <div className="relative flex h-60 items-end gap-0.5 border-b-2 border-text bg-[repeating-linear-gradient(180deg,var(--rule)_0_1px,transparent_1px_48px)] pt-6">
        {bars.map((b) => {
          const h = Math.max(2, (b.value / max) * 100);
          if (empty) {
            // No data: a non-interactive placeholder column, hidden from assistive tech (the empty label speaks).
            return (
              <span key={b.key} aria-hidden className="flex h-full flex-1 items-end justify-center">
                <span className="h-full w-full max-w-16 border border-dashed border-laterite-ink" />
              </span>
            );
          }
          return (
            <button
              key={b.key}
              type="button"
              aria-label={`${b.label}: ${b.display}`}
              onMouseEnter={() => setActive(b.key)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(b.key)}
              onBlur={() => setActive(null)}
              className="group relative flex h-full flex-1 items-end justify-center"
            >
              <span aria-hidden className="w-full max-w-16 rounded-t bg-tea group-hover:bg-leaf" style={{ height: `${h}%` }} />
              {active === b.key ? (
                <span role="tooltip" className="absolute -top-2 z-10 -translate-y-full border border-text bg-surface-raised px-2 py-1 font-mono text-xs whitespace-nowrap shadow">
                  {b.label} · {b.display}
                </span>
              ) : null}
            </button>
          );
        })}
        {empty ? (
          <span className="absolute top-1/2 left-1/2 w-max max-w-[90%] -translate-x-1/2 -translate-y-1/2 border border-laterite-ink/40 bg-surface px-3 py-1 text-center text-sm text-laterite-ink">{emptyLabel}</span>
        ) : null}
      </div>
      <div className="flex gap-0.5 font-mono text-[11px] sm:text-xs">
        {bars.map((b) => (
          <span key={b.key} className="flex-1 truncate text-center">
            {b.label}
          </span>
        ))}
      </div>
      <details className="text-sm">
        <summary className="min-h-11 cursor-pointer content-center underline">{tableLabel}</summary>
        <table className="mt-2 w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-text text-left">
              <th scope="col" className="py-2">{columns[0]}</th>
              <th scope="col" className="py-2 text-right">{columns[1]}</th>
            </tr>
          </thead>
          <tbody>
            {bars.map((b) => (
              <tr key={b.key} className="border-b border-rule">
                <th scope="row" className="py-2 text-left font-normal">{b.label}</th>
                <td className="py-2 text-right font-mono">{empty ? "—" : b.display}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}
