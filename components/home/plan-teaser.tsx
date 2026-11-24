import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Photo } from "@/components/shared/photo";
import { Link } from "@/i18n/navigation";

const promises = ["one", "two", "three"] as const;

/** Three promises. They carry a discreet "Draft" pill until the campaign signs them off. */
export function PlanTeaser() {
  const t = useTranslations("home.plan");

  return (
    <section aria-labelledby="plan-title" className="mx-auto grid max-w-[1312px] items-center gap-12 px-4 py-20 lg:grid-cols-[1fr_1.5fr]">
      <Photo id="HOME-PLAN" sizes="(min-width: 1024px) 38vw, 100vw" className="max-h-[560px]" />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <div className="tea-rule" aria-hidden />
          <span className="flex flex-wrap items-center gap-3 text-[13px] font-semibold tracking-[0.18em] text-tea uppercase">
            {t("kicker")}
            <span className="rounded-full bg-gold-soft px-2.5 py-0.5 text-[11px] tracking-[0.1em] text-ink normal-case">{t("draft")}</span>
          </span>
          <h2 id="plan-title" className="m-0 font-display text-[34px] leading-tight font-bold sm:text-[44px]">
            {t("title")}
          </h2>
        </div>
        <ol className="m-0 flex list-none flex-col gap-4 p-0">
          {promises.map((key, i) => (
            <li key={key} className="flex gap-5 rounded-xl border border-rule bg-white p-5 shadow-sm">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-tea font-display text-lg font-bold text-white">{i + 1}</span>
              <span className="flex flex-col gap-1">
                <span className="font-display text-xl font-bold">{t(`${key}.title`)}</span>
                <span className="text-muted">{t(`${key}.body`)}</span>
              </span>
            </li>
          ))}
        </ol>
        <Link href="/plan" className="inline-flex min-h-12 w-fit items-center gap-2 rounded-md bg-tea px-6 font-semibold text-white no-underline hover:bg-leaf">
          {t("cta")} <ArrowRight aria-hidden size={16} />
        </Link>
      </div>
    </section>
  );
}
