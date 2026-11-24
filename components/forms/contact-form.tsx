"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { contactSchema, type ContactInput } from "@/lib/forms/schemas";
import { ConsentFields } from "./consent-fields";
import { Field, inputClass } from "./field";
import { FormStatus } from "./form-status";
import { Honeypot } from "./honeypot";
import { useFormAction } from "./use-form-action";

const subjects = ["general", "event", "press"] as const;

export function ContactForm() {
  const t = useTranslations("forms");
  const { send, pending, result, statusRef } = useFormAction("contact");
  const { register, handleSubmit, setError, formState: { errors } } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", subject: "general", message: "", website: "" },
  });
  const err = (k: keyof ContactInput) => (errors[k]?.message ? t(`errors.${errors[k]!.message}`) : undefined);

  const onSubmit = handleSubmit((values) => {
    if (!values.email && !values.phone) {
      setError("email", { message: "email" });
      return;
    }
    send(values, (fields) => Object.entries(fields).forEach(([k, m]) => setError(k as keyof ContactInput, { message: m })));
  });

  if (result?.ok) return <FormStatus kind="contact" result={result} statusRef={statusRef} />;

  return (
    <form noValidate onSubmit={onSubmit} className="relative flex max-w-xl flex-col gap-5" aria-label={t("submit.contact")}>
      <Field id="c-name" label={t("fields.name")} error={err("name")}>
        {(d) => <input id="c-name" autoComplete="name" className={inputClass} aria-invalid={!!errors.name || undefined} aria-describedby={d} {...register("name")} />}
      </Field>
      <p className="m-0 text-sm text-muted">{t("fields.emailRequiredHint")}</p>
      <Field id="c-email" label={t("fields.email")} error={err("email")}>
        {(d) => <input id="c-email" type="email" autoComplete="email" className={inputClass} aria-invalid={!!errors.email || undefined} aria-describedby={d} {...register("email")} />}
      </Field>
      <Field id="c-phone" label={t("fields.phone")} hint={t("fields.phoneHint")} error={err("phone")}>
        {(d) => <input id="c-phone" type="tel" inputMode="tel" autoComplete="tel" className={inputClass} aria-invalid={!!errors.phone || undefined} aria-describedby={d} {...register("phone")} />}
      </Field>
      <Field id="c-subject" label={t("fields.subject")}>
        {(d) => (
          <select id="c-subject" className={inputClass} aria-describedby={d} {...register("subject")}>
            {subjects.map((s) => (
              <option key={s} value={s}>
                {t(`subjects.${s}`)}
              </option>
            ))}
          </select>
        )}
      </Field>
      <Field id="c-message" label={t("fields.message")} error={err("message")}>
        {(d) => <textarea id="c-message" rows={6} className={`${inputClass} py-2`} aria-invalid={!!errors.message || undefined} aria-describedby={d} {...register("message")} />}
      </Field>
      <ConsentFields kind="contact" register={register} error={err("consent")} withUpdates={false} />
      <Honeypot id="c-website" register={register} />
      <FormStatus kind="contact" result={result} statusRef={statusRef} />
      <Button type="submit" variant="ink" size="lg" disabled={pending} className="self-start">
        {pending ? t("submit.sending") : t("submit.contact")}
      </Button>
    </form>
  );
}
