"use client";

import { useTranslations } from "next-intl";
import type { UseFormRegister } from "react-hook-form";
import { wardsByConstituency } from "@/data/stats";
import { Field, inputClass } from "./field";

/** All 25 Bomet wards, grouped by constituency. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function WardSelect({ id, register, error }: { id: string; register: UseFormRegister<any>; error?: string }) {
  const t = useTranslations("forms");
  return (
    <Field id={id} label={t("fields.ward")} error={error}>
      {(describedBy) => (
        <select id={id} className={inputClass} defaultValue="" aria-invalid={error ? true : undefined} aria-describedby={describedBy} {...register("ward")}>
          <option value="" disabled>
            {t("fields.wardPlaceholder")}
          </option>
          {Object.entries(wardsByConstituency).map(([cons, wards]) => (
            <optgroup key={cons} label={cons}>
              {wards.map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      )}
    </Field>
  );
}
