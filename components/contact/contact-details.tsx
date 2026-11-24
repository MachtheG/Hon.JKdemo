import { useTranslations } from "next-intl";
import { ConfirmText, SHOW_TO_CONFIRM, stripConfirm } from "@/components/shared/to-confirm";

export function ContactDetails() {
  const t = useTranslations("contact.details");
  return (
    <section aria-labelledby="office-title" className="flex flex-col gap-3">
      <h2 id="office-title" className="m-0 font-display text-[28px] font-semibold">
        {t("title")}
      </h2>
      {/* Lines that are still unconfirmed are omitted from the public site. */}
      <address className="flex flex-col gap-2 not-italic">
        {(["office", "phone", "email"] as const)
          .filter((k) => SHOW_TO_CONFIRM || stripConfirm(t(k)) !== "")
          .map((k) => (
            <span key={k}>
              <ConfirmText text={t(k)} />
            </span>
          ))}
      </address>
      <p className="m-0 text-muted">{t("press")}</p>
    </section>
  );
}
