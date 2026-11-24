import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { ConfirmText, SHOW_TO_CONFIRM } from "@/components/shared/to-confirm";
import { Link } from "@/i18n/navigation";

/**
 * How to give. The M-Pesa paybill is shown only once the campaign confirms it
 * (TO CONFIRM); until then the panel says details are coming and links to Contact.
 */
export function DonatePanel() {
  const t = useTranslations("donate");
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <section aria-labelledby="how-title" className="flex flex-col gap-4 rounded-xl border-2 border-accent bg-gold-soft p-7">
        <h2 id="how-title" className="m-0 font-display text-2xl font-bold">
          {t("how.title")}
        </h2>
        <p className="m-0 text-[13px] font-semibold tracking-[0.18em] text-tea uppercase">{t("how.mpesa")}</p>
        {SHOW_TO_CONFIRM ? (
          <p className="m-0 font-display text-xl font-semibold">
            <ConfirmText text={t("how.paybill")} />
          </p>
        ) : null}
        <p className="m-0 text-ink/85">{t("how.soon")}</p>
        <Link href="/contact" className="inline-flex min-h-12 w-fit items-center rounded-md bg-tea px-6 font-semibold text-white no-underline hover:bg-leaf">
          {t("how.contact")}
        </Link>
      </section>
      <section aria-labelledby="uses-title" className="flex flex-col gap-4 p-2">
        <h2 id="uses-title" className="m-0 font-display text-2xl font-bold">
          {t("uses.title")}
        </h2>
        <ul className="m-0 flex list-none flex-col gap-3 p-0">
          {(["one", "two", "three"] as const).map((k) => (
            <li key={k} className="flex gap-3 text-lg">
              <Check aria-hidden size={22} className="mt-1 shrink-0 text-tea" />
              {t(`uses.${k}`)}
            </li>
          ))}
        </ul>
        {/* A statement of campaign policy: shown only once the campaign confirms it. */}
        {SHOW_TO_CONFIRM ? (
          <p className="m-0 mt-2 text-sm text-muted">
            <ConfirmText text={t("note")} />
          </p>
        ) : null}
      </section>
    </div>
  );
}
