import { useTranslations } from "next-intl";
import { Stat } from "@/components/shared/stat";
import { BOMET_CENTRAL, bometCentralWards } from "@/data/bomet-central";
import { formatNumber } from "@/lib/format";

/** Constituency-level official figures for Bomet Central. */
export function HubStats() {
  const t = useTranslations("constituency.stats");
  return (
    <section aria-labelledby="bc-stats" className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="tea-rule" aria-hidden />
        <h2 id="bc-stats" className="m-0 font-display text-[30px] font-bold sm:text-4xl">
          {t("title")}
        </h2>
      </div>
      <div className="@container">
        <div className="grid grid-cols-2 gap-6 @2xl:grid-cols-3">
          <Stat value={formatNumber(BOMET_CENTRAL.population2019)} label={t("population")} source="knbs-2019-census" />
          <Stat value={formatNumber(BOMET_CENTRAL.voters2022)} label={t("voters2022")} source="iebc-rov-2022" />
          <Stat value={formatNumber(BOMET_CENTRAL.voters2017)} label={t("voters2017")} source="iebc-rov-caw-2017" />
          <Stat value={String(BOMET_CENTRAL.pollingStations2017)} label={t("stations")} source="iebc-rov-caw-2017" />
          <Stat value={String(bometCentralWards.length)} label={t("wards")} source="bomet-county-about" />
        </div>
      </div>
    </section>
  );
}
