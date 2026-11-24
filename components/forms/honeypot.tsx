"use client";

import { useTranslations } from "next-intl";
import type { UseFormRegister } from "react-hook-form";

/** Hidden from people and assistive tech; bots tend to fill it. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Honeypot({ id, register }: { id: string; register: UseFormRegister<any> }) {
  const t = useTranslations("forms.fields");
  return (
    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor={id}>{t("website")}</label>
      <input id={id} type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
    </div>
  );
}
