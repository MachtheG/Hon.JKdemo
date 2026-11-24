import { useTranslations } from "next-intl";
import { Photo } from "@/components/shared/photo";
import { Link } from "@/i18n/navigation";

const promises = ["one", "two", "three"] as const;

/** Three DRAFT promises until the campaign signs them off. */
export function PlanTeaser() {
  const t = useTranslations("home.plan");

  return (
    <section aria-labelledby="plan-title" className="bg-mist text-ink">
      <div className="mx-auto grid max-w-[1312px] gap-10 px-4 py-16 sm:py-20 lg:grid-cols-[1fr_2fr] lg:gap-12">
        <Photo id="HOME-PLAN" sizes="(min-width: 1024px) 33vw, 320px" className="w-full max-w-xs lg:max-w-none" />
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs tracking-[0.12em] text-[#7a3418] uppercase">
              {t("kicker")} · <span className="bg-ink px-1.5 py-0.5 text-accent">{t("draft")}</span>
            </span>
            <h2 id="plan-title" className="m-0 font-display text-[32px] leading-tight font-semibold sm:text-[44px]">
              {t("title")}
            </h2>
          </div>
          <ol className="m-0 grid list-none gap-6 p-0 md:grid-cols-3">
            {promises.map((key, i) => (
              <li key={key} className="flex flex-col gap-2 border-t-[3px] border-ink pt-4">
                <span className="font-mono text-[#7a3418]">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-[26px] leading-tight font-semibold">{t(`${key}.title`)}</span>
                <span>{t(`${key}.body`)}</span>
              </li>
            ))}
          </ol>
          <Link href="/plan" className="inline-flex min-h-11 items-center self-start font-semibold text-ink">
            {t("cta")} →
          </Link>
        </div>
      </div>
    </section>
  );
}
