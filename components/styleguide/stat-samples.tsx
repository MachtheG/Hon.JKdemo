import { useTranslations } from "next-intl";
import { Stat } from "@/components/shared/stat";

export function StatSamples() {
  const t = useTranslations("styleguide.stats");
  return (
    <div className="grid gap-8 border-t-2 border-text pt-6 sm:grid-cols-3">
      <Stat value="205,964" label={t("votes")} source="iebc-data-report-2017" />
      <Stat value="78.5%" label={t("share")} source="iebc-data-report-2017" />
      <Stat value="875,689" label={t("population")} source="knbs-2019-census" />
    </div>
  );
}
