import { useTranslations } from "next-intl";

export function ContactDetails() {
  const t = useTranslations("contact.details");
  return (
    <section aria-labelledby="office-title" className="flex flex-col gap-3">
      <h2 id="office-title" className="m-0 font-display text-[28px] font-semibold">
        {t("title")}
      </h2>
      <address className="flex flex-col gap-2 font-mono text-sm not-italic">
        <span>{t("office")}</span>
        <span>{t("phone")}</span>
        <span>{t("email")}</span>
      </address>
      <p className="m-0 text-muted">{t("press")}</p>
    </section>
  );
}
