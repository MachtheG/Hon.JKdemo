"use client";

import { useTranslations } from "next-intl";
import type { RefObject } from "react";
import type { FormResult } from "@/app/actions/forms";
import type { FormKind } from "@/lib/forms/schemas";

export function FormStatus({ kind, result, statusRef }: { kind: FormKind; result: FormResult | null; statusRef: RefObject<HTMLDivElement | null> }) {
  const t = useTranslations("forms");
  return (
    <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite" className="outline-none">
      {result?.ok ? (
        <p className="m-0 border-l-4 border-tea bg-mist p-4 font-semibold text-ink">{t(`success.${kind}`)}</p>
      ) : result ? (
        <p className="m-0 border-l-4 border-laterite-ink p-4 font-semibold text-laterite-ink">
          {t(`errors.${result.code === "invalid" ? "summary" : result.code}`)}
        </p>
      ) : null}
    </div>
  );
}
