"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { wardsByConstituency } from "@/data/stats";
import { Link } from "@/i18n/navigation";
import { pledgeSchema, type PledgeInput } from "@/lib/forms/schemas";
import { FormStatus } from "./form-status";
import { Honeypot } from "./honeypot";
import { useFormAction } from "./use-form-action";

const field =
  "min-h-12 w-full rounded-md border-0 bg-white px-3.5 text-[15px] text-ink placeholder:text-muted/80 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-accent";

/** Compact pledge form for the hero (reference layout). Same schema, consent and Server Action as /get-involved. */
export function HeroPledgeForm() {
  const t = useTranslations("forms");
  const { send, pending, result, statusRef } = useFormAction("pledge");
  const { register, handleSubmit, setError, formState: { errors } } = useForm<PledgeInput>({
    resolver: zodResolver(pledgeSchema),
    defaultValues: { name: "", phone: "", ward: "", updates: false, website: "" },
  });
  const first = Object.values(errors)[0]?.message;

  const onSubmit = handleSubmit((values) =>
    send(values, (fields) => Object.entries(fields).forEach(([k, m]) => setError(k as keyof PledgeInput, { message: m }))),
  );

  if (result?.ok) {
    return (
      <div className="rounded-lg bg-white/95 p-1">
        <FormStatus kind="pledge" result={result} statusRef={statusRef} />
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} aria-label={t("submit.pledge")} className="relative flex w-full max-w-[520px] flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="sr-only" htmlFor="hero-name">{t("fields.name")}</label>
        <input id="hero-name" autoComplete="name" placeholder={t("fields.name")} aria-invalid={!!errors.name || undefined} className={field} {...register("name")} />
        <label className="sr-only" htmlFor="hero-phone">{t("fields.phone")}</label>
        <input id="hero-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder={t("fields.phone")} aria-invalid={!!errors.phone || undefined} className={field} {...register("phone")} />
        <label className="sr-only" htmlFor="hero-ward">{t("fields.ward")}</label>
        <select id="hero-ward" defaultValue="" aria-invalid={!!errors.ward || undefined} className={field} {...register("ward")}>
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
        <button
          type="submit"
          disabled={pending}
          className="min-h-12 rounded-md bg-accent px-5 text-[14px] font-bold tracking-[0.12em] text-ink uppercase transition-colors hover:bg-[#e2b53a] disabled:opacity-60"
        >
          {pending ? t("submit.sending") : t("submit.hero")}
        </button>
      </div>
      <label htmlFor="hero-consent" className="flex gap-2.5 text-[12.5px] leading-snug text-white/85">
        <input id="hero-consent" type="checkbox" aria-invalid={!!errors.consent || undefined} className="mt-0.5 size-4 shrink-0 accent-accent" {...register("consent")} />
        <span>
          {t("consent.required", { purpose: t("consent.purposes.pledge") })}{" "}
          <Link href="/privacy" className="text-white underline">
            {t("consent.privacyLink")}
          </Link>
        </span>
      </label>
      <Honeypot id="hero-website" register={register} />
      {first ? (
        <p role="alert" className="m-0 text-[14px] font-semibold text-accent">
          {t(`errors.${first}`)}
        </p>
      ) : null}
      <FormStatus kind="pledge" result={result} statusRef={statusRef} />
    </form>
  );
}
