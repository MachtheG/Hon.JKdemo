import { useTranslations } from "next-intl";
import { Photo } from "@/components/shared/photo";
import { SourceTick } from "@/components/shared/source-tick";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { county2017 } from "@/lib/election-results";
import { formatNumber } from "@/lib/format";

/**
 * Hero A (approved 2026-11-24): full-bleed portrait with the field-note overlay.
 * Mobile: a true 4:5 portrait with the field-note strip pulled up over its lower
 * edge. sm+: full-bleed 16:9 with the overlay inset bottom-left.
 */
export function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden text-paper sm:flex sm:min-h-[760px] sm:items-end">
      <div className="hero-push relative aspect-[4/5] sm:absolute sm:inset-0 sm:-z-10 sm:aspect-auto">
        <Photo id="HERO-01" fill priority sizes="100vw" labelPosition="top" />
      </div>
      <div className="relative -mt-28 px-4 sm:mx-auto sm:mt-0 sm:w-full sm:max-w-[1312px] sm:pb-14">
        <div className="flex flex-col gap-5 bg-ink/95 px-5 py-7 sm:max-w-[760px] sm:p-11">
          <span className="font-mono text-xs tracking-[0.14em] text-accent uppercase">{t("kicker")}</span>
          <h1 id="hero-title" className="m-0 font-display text-[44px] leading-[0.98] font-semibold tracking-[-0.02em] sm:text-[84px]">
            {t("title")}
          </h1>
          <p className="m-0 text-lg text-mist sm:text-2xl sm:leading-snug">{t("sub")}</p>

          <dl className="m-0 grid grid-cols-2 gap-4 border-t border-mist/30 pt-5 sm:grid-cols-3 sm:gap-6">
            <div className="flex flex-col-reverse justify-end gap-1">
              <dt className="text-sm text-mist">{t("votes")}</dt>
              <dd className="m-0 font-mono text-[28px] leading-none font-medium whitespace-nowrap tabular sm:text-[34px]">
                {formatNumber(county2017.votes)}
                <SourceTick id={county2017.source} tone="accent" />
              </dd>
            </div>
            <div className="flex flex-col-reverse justify-end gap-1">
              <dt className="text-sm text-mist">{t("share")}</dt>
              <dd className="m-0 font-mono text-[28px] leading-none font-medium whitespace-nowrap tabular sm:text-[34px]">
                {county2017.share}%
                <SourceTick id="iebc-data-report-2017" tone="accent" />
              </dd>
            </div>
            <div className="hidden flex-col-reverse justify-end gap-1 sm:flex">
              <dt className="text-sm text-mist">{t("levels")}</dt>
              <dd className="m-0 font-mono text-[34px] leading-none font-medium whitespace-nowrap">
                {t("levelsValue")}
                <SourceTick id={["parl-na-profile-2017", "parl-senate-profile"]} tone="accent" />
              </dd>
            </div>
          </dl>

          <div className="flex flex-wrap gap-3.5">
            <Button asChild variant="accent" size="lg">
              <Link href="/get-involved#pledge">{t("pledge")}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-paper">
              <Link href="/record">{t("record")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
