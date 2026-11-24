"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { VOLUNTEER_ROLES, volunteerSchema, type VolunteerInput } from "@/lib/forms/schemas";
import { ConsentFields } from "./consent-fields";
import { Field, inputClass } from "./field";
import { FormStatus } from "./form-status";
import { Honeypot } from "./honeypot";
import { useFormAction } from "./use-form-action";
import { WardSelect } from "./ward-select";

export function VolunteerForm() {
  const t = useTranslations("forms");
  const { send, pending, result, statusRef } = useFormAction("volunteer");
  const { register, handleSubmit, setError, formState: { errors } } = useForm<VolunteerInput>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: { name: "", phone: "", ward: "", email: "", roles: [], updates: false, website: "" },
  });
  const err = (k: keyof VolunteerInput) => (errors[k]?.message ? t(`errors.${errors[k]!.message}`) : undefined);

  const onSubmit = handleSubmit((values) =>
    send(values, (fields) => Object.entries(fields).forEach(([k, m]) => setError(k as keyof VolunteerInput, { message: m }))),
  );

  if (result?.ok) return <FormStatus kind="volunteer" result={result} statusRef={statusRef} />;

  return (
    <form noValidate onSubmit={onSubmit} className="relative flex max-w-xl flex-col gap-5" aria-label={t("submit.volunteer")}>
      <Field id="vol-name" label={t("fields.name")} error={err("name")}>
        {(d) => <input id="vol-name" autoComplete="name" className={inputClass} aria-invalid={!!errors.name || undefined} aria-describedby={d} {...register("name")} />}
      </Field>
      <Field id="vol-phone" label={t("fields.phone")} hint={t("fields.phoneHint")} error={err("phone")}>
        {(d) => <input id="vol-phone" type="tel" inputMode="tel" autoComplete="tel" className={inputClass} aria-invalid={!!errors.phone || undefined} aria-describedby={d} {...register("phone")} />}
      </Field>
      <Field id="vol-email" label={t("fields.email")} error={err("email")}>
        {(d) => <input id="vol-email" type="email" autoComplete="email" className={inputClass} aria-invalid={!!errors.email || undefined} aria-describedby={d} {...register("email")} />}
      </Field>
      <WardSelect id="vol-ward" register={register} error={err("ward")} />
      <fieldset className="m-0 flex flex-col gap-2 border-0 p-0" aria-describedby={errors.roles ? "vol-roles-error" : undefined}>
        <legend className="mb-1 font-semibold">{t("fields.roles")}</legend>
        {VOLUNTEER_ROLES.map((r) => (
          <label key={r} htmlFor={`vol-role-${r}`} className="flex min-h-11 items-center gap-3">
            <input id={`vol-role-${r}`} type="checkbox" value={r} className="size-5 accent-tea" {...register("roles")} />
            {t(`roles.${r}`)}
          </label>
        ))}
        {errors.roles ? (
          <span id="vol-roles-error" className="text-sm font-semibold text-laterite-ink">
            {err("roles")}
          </span>
        ) : null}
      </fieldset>
      <ConsentFields kind="volunteer" register={register} error={err("consent")} />
      <Honeypot id="vol-website" register={register} />
      <FormStatus kind="volunteer" result={result} statusRef={statusRef} />
      <Button type="submit" variant="ink" size="lg" disabled={pending} className="self-start">
        {pending ? t("submit.sending") : t("submit.volunteer")}
      </Button>
    </form>
  );
}
