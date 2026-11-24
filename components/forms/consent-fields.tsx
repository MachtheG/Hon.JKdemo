"use client";

import { useTranslations } from "next-intl";
import type { UseFormRegister } from "react-hook-form";
import { Link } from "@/i18n/navigation";
import type { FormKind } from "@/lib/forms/schemas";

/** DPA 2019: specific purpose, explicit opt-in (unticked by default), link to the notice, optional updates opt-in. */
export function ConsentFields({
  kind,
  register,
  error,
  withUpdates = true,
}: {
  kind: FormKind;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  error?: string;
  withUpdates?: boolean;
}) {
  const t = useTranslations("forms");
  const id = `${kind}-consent`;
  return (
    <fieldset className="m-0 flex flex-col gap-3 border-0 border-t border-rule p-0 pt-4">
      <label htmlFor={id} className="flex gap-3">
        <input
          id={id}
          type="checkbox"
          className="mt-1 size-5 shrink-0 accent-tea"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          {...register("consent")}
        />
        <span className="text-[15px]">{t("consent.required", { purpose: t(`consent.purposes.${kind}`) })}</span>
      </label>
      {error ? (
        <span id={`${id}-error`} className="text-sm font-semibold text-laterite-ink">
          {error}
        </span>
      ) : null}
      {withUpdates ? (
        <label htmlFor={`${kind}-updates`} className="flex gap-3">
          <input id={`${kind}-updates`} type="checkbox" className="mt-1 size-5 shrink-0 accent-tea" {...register("updates")} />
          <span className="text-[15px]">{t("consent.updates")}</span>
        </label>
      ) : null}
      <Link href="/privacy" className="inline-flex min-h-11 items-center self-start text-sm underline">
        {t("consent.privacyLink")}
      </Link>
    </fieldset>
  );
}
