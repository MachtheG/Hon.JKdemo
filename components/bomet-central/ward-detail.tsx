import { useTranslations } from "next-intl";
import { MiniMap } from "@/components/county/mini-map";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { SourceTick } from "@/components/shared/source-tick";
import { Stat } from "@/components/shared/stat";
import { type Ward, wardSources } from "@/data/bomet-central";
import { Link } from "@/i18n/navigation";
import { county2017 } from "@/lib/election-results";
import { formatNumber } from "@/lib/format";
import { WardCards } from "./ward-cards";

/** One ward of Bomet Central: official figures, locator map, honest 2017 note, and a pledge call to action. */
export function WardDetail({ ward: w }: { ward: Ward }) {
  const t = useTranslations("constituency");
  const name = w.name;

  return (
    <>
      <PageHeader
        kicker={t("ward.kicker", { name })}
        title={t("ward.title", { name })}
        intro={w.slug === "singorwet" ? `${t("ward.intro")} ${t("ward.singorwet")}` : t("ward.intro")}
        photo={w.photo}
      >
        <Link href="/bomet-central" className="inline-flex min-h-11 w-fit items-center font-semibold text-tea">
          ← {t("ward.back")}
        </Link>
      </PageHeader>
      <Container className="flex flex-col gap-20">
        <div className="grid items-start gap-10 lg:grid-cols-[3fr_2fr]">
          <section aria-labelledby="ward-stats" className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <div className="tea-rule" aria-hidden />
              <h2 id="ward-stats" className="m-0 font-display text-[30px] font-bold sm:text-4xl">
                {t("ward.stats", { name })}
              </h2>
            </div>
            <div className="@container">
              <div className="grid grid-cols-2 gap-6 @2xl:grid-cols-3">
                <Stat value={formatNumber(w.voters2022)} label={t("stats.voters2022")} source={wardSources.voters2022} />
                <Stat value={formatNumber(w.voters2017)} label={t("stats.voters2017")} source={wardSources.voters2017} />
                <Stat value={String(w.pollingStations2017)} label={t("stats.stations")} source={wardSources.pollingStations2017} />
              </div>
            </div>
            {w.slug === "singorwet" ? (
              <p className="m-0 rounded-lg bg-gold-soft p-4">
                {t("ward.singorwet")}
                <SourceTick id="parl-na-profile-2017" />
              </p>
            ) : null}
          </section>
          <div className="overflow-hidden rounded-xl ring-4 ring-accent/60">
            <MiniMap highlight="bomet-central" ward={w.slug} label={t("ward.map", { name })} />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <section aria-labelledby="ward-result" className="flex flex-col gap-3 rounded-xl border border-rule bg-mist p-7">
            <h2 id="ward-result" className="m-0 font-display text-2xl font-bold">
              {t("ward.resultTitle", { name })}
            </h2>
            <p className="m-0">
              {t("ward.resultBody", { name, share: county2017.share })}
              <SourceTick id="iebc-data-report-2017" />
            </p>
          </section>
          <section aria-labelledby="ward-ngcdf" className="flex flex-col gap-3 rounded-xl border border-rule bg-mist p-7">
            <h2 id="ward-ngcdf" className="m-0 font-display text-2xl font-bold">
              {t("ward.ngcdfTitle", { name })}
            </h2>
            <p className="m-0">
              {t("ward.ngcdfBody")}
              <SourceTick id="ngcdf-bomet-central-projects" />
            </p>
            <Link href="/plan" className="inline-flex min-h-11 w-fit items-center font-semibold text-tea">
              {t("ngcdf.planLink")} →
            </Link>
          </section>
        </div>

        <section className="flex flex-col items-center gap-5 rounded-2xl bg-tea px-6 py-14 text-center text-white">
          <div className="tea-rule" aria-hidden />
          <h2 className="m-0 font-display text-[30px] font-bold sm:text-[40px]">{t("ward.pledge", { name })}</h2>
          <Link href="/get-involved#pledge" className="inline-flex min-h-12 items-center rounded-md bg-accent px-7 font-bold tracking-[0.08em] text-ink uppercase no-underline hover:bg-[#e2b53a]">
            {t("ward.pledgeCta")}
          </Link>
        </section>

        <WardCards exclude={w.slug} titleKey="ward.others" />
      </Container>
    </>
  );
}
