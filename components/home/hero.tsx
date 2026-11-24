import { useTranslations } from "next-intl";
import { Photo } from "@/components/shared/photo";
import { SourceTick } from "@/components/shared/source-tick";
import { Button } from "@/components/ui/button";
import { results2017 } from "@/data/election/results-2017";
import { Link } from "@/i18n/navigation";
import { formatNumber, percent } from "@/lib/format";

const county = results2017.county;
const joyce = county.candidates.find((c) => c.isCandidate)!;

/** Hero A — full-bleed portrait with the field-note overlay (approved 2026-11-24). */
export function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[640px] items-end overflow-hidden text-paper sm:min-h-[760px]">
      <div className="hero-push absolute inset-0 -z-10">
        <Photo id="HERO-01" fill priority sizes="100vw" />
      </div>
      <div className="mx-auto w-full max-w-[1312px] sm:px-4 sm:pb-14">
        <div className="flex flex-col gap-5 bg-ink/92 px-4 py-7 sm:max-w-[760px] sm:p-11">
          <span className="font-mono text-xs tracking-[0.14em] text-accent uppercase">{t("kicker")}</span>
          <h1 id="hero-title" className="m-0 font-display text-[44px] leading-[0.98] font-semibold tracking-[-0.02em] sm:text-[84px]">
            {t("title")}
          </h1>
          <p className="m-0 text-lg text-mist sm:text-2xl sm:leading-snug">{t("sub")}</p>

          <dl className="m-0 hidden grid-cols-3 gap-6 border-t border-mist/30 pt-5 sm:grid">
            <div className="flex flex-col-reverse gap-1">
              <dt className="text-sm text-mist">{t("votes")}</dt>
              <dd className="m-0 font-mono text-[34px] leading-none font-medium tabular">
                {formatNumber(joyce.votes)}
                <SourceTick id={joyce.source} tone="accent" />
              </dd>
            </div>
            <div className="flex flex-col-reverse gap-1">
              <dt className="text-sm text-mist">{t("share")}</dt>
              <dd className="m-0 font-mono text-[34px] leading-none font-medium tabular">
                {percent(joyce.votes, county.totalValidVotes)}%
                <SourceTick id="iebc-data-report-2017" tone="accent" />
              </dd>
            </div>
            <div className="flex flex-col-reverse gap-1">
              <dt className="text-sm text-mist">{t("levels")}</dt>
              <dd className="m-0 font-mono text-[34px] leading-none font-medium">
                {t("levelsValue")}
                <SourceTick id="parl-senate-profile" tone="accent" />
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
