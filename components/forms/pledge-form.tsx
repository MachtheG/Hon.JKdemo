"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { pledgeSchema, type PledgeInput } from "@/lib/forms/schemas";
import { ConsentFields } from "./consent-fields";
import { Field, inputClass } from "./field";
import { FormStatus } from "./form-status";
import { Honeypot } from "./honeypot";
import { useFormAction } from "./use-form-action";
import { WardSelect } from "./ward-select";

export function PledgeForm() {
  const t = useTranslations("forms");
  const { send, pending, result, statusRef } = useFormAction("pledge");
  const { register, handleSubmit, setError, formState: { errors } } = useForm<PledgeInput>({
    resolver: zodResolver(pledgeSchema),
    defaultValues: { name: "", phone: "", ward: "", updates: false, website: "" },
  });
  const err = (k: keyof PledgeInput) => (errors[k]?.message ? t(`errors.${errors[k]!.message}`) : undefined);

  const onSubmit = handleSubmit((values) =>
    send(values, (fields) => Object.entries(fields).forEach(([k, m]) => setError(k as keyof PledgeInput, { message: m }))),
  );

  if (result?.ok) return <FormStatus kind="pledge" result={result} statusRef={statusRef} />;

  return (
    <form noValidate onSubmit={onSubmit} className="relative flex max-w-xl flex-col gap-5" aria-label={t("submit.pledge")}>
      <Field id="pledge-name" label={t("fields.name")} error={err("name")}>
        {(d) => <input id="pledge-name" autoComplete="name" className={inputClass} aria-invalid={!!errors.name || undefined} aria-describedby={d} {...register("name")} />}
      </Field>
      <Field id="pledge-phone" label={t("fields.phone")} hint={t("fields.phoneHint")} error={err("phone")}>
        {(d) => (
          <input id="pledge-phone" type="tel" inputMode="tel" autoComplete="tel" className={inputClass} aria-invalid={!!errors.phone || undefined} aria-describedby={d} {...register("phone")} />
        )}
      </Field>
      <WardSelect id="pledge-ward" register={register} error={err("ward")} />
      <ConsentFields kind="pledge" register={register} error={err("consent")} />
      <Honeypot id="pledge-website" register={register} />
      <FormStatus kind="pledge" result={result} statusRef={statusRef} />
      <Button type="submit" variant="accent" size="lg" disabled={pending} className="self-start">
        {pending ? t("submit.sending") : t("submit.pledge")}
      </Button>
    </form>
  );
}
