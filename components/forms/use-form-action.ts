"use client";

import { useLocale } from "next-intl";
import { useRef, useState, useTransition } from "react";
import { submitForm, type FormResult } from "@/app/actions/forms";
import type { FormKind } from "@/lib/forms/schemas";

/** Calls the Server Action and keeps status; moves focus to the status message when it changes. */
export function useFormAction(kind: FormKind) {
  const locale = useLocale();
  const [pending, start] = useTransition();
  const [result, setResult] = useState<FormResult | null>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  function send(values: unknown, onServerFieldErrors?: (fields: Record<string, string>) => void) {
    start(async () => {
      const r = await submitForm(kind, locale, values);
      setResult(r);
      if (!r.ok && r.fields) onServerFieldErrors?.(r.fields);
      requestAnimationFrame(() => statusRef.current?.focus());
    });
  }

  return { send, pending, result, statusRef };
}
