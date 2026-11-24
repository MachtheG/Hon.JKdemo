import { useTranslations } from "next-intl";
import { ConfirmText } from "@/components/shared/to-confirm";

export function ContactDetails() {
  const t = useTranslations("contact.details");
  return (
    <section aria-labelledby="office-title" className="flex flex-col gap-3">
      <h2 id="office-title" className="m-0 font-display text-[28px] font-semibold">
        {t("title")}
      </h2>
      <address className="flex flex-col gap-2 font-mono text-sm not-italic">
        <span><ConfirmText text={t("office")} /></span>
        <span><ConfirmText text={t("phone")} /></span>
        <span><ConfirmText text={t("email")} /></span>
      </address>
      <p className="m-0 text-muted">{t("press")}</p>
    </section>
  );
}
