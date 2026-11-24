"use client";

import type { ReactNode } from "react";

export const inputClass =
  "min-h-12 w-full border border-text bg-surface-raised px-3 text-base text-text aria-[invalid=true]:border-2 aria-[invalid=true]:border-laterite-ink";

/** Label + control + hint + error, wired with aria-describedby. */
export function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: (describedBy: string | undefined) => ReactNode;
}) {
  const ids = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-semibold">
        {label}
      </label>
      {hint ? (
        <span id={`${id}-hint`} className="text-sm text-muted">
          {hint}
        </span>
      ) : null}
      {children(ids)}
      {error ? (
        <span id={`${id}-error`} className="text-sm font-semibold text-laterite-ink">
          {error}
        </span>
      ) : null}
    </div>
  );
}
