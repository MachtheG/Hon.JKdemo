import { useTranslations } from "next-intl";
import { BarChart } from "@/components/projects/bar-chart";
import { SourceTick } from "@/components/shared/source-tick";
import { NGCDF_SOURCE, ngcdfAllocations } from "@/data/bomet-central";
import { Link } from "@/i18n/navigation";
import { formatNumber } from "@/lib/format";

/** Official NG-CDF approved allocations to Bomet Central, by financial year. */
export function NgcdfAllocations() {
  const t = useTranslations("constituency.ngcdf");
  // Kenyan financial years run July–June; the feed's last entry is the current year.
  const latest = ngcdfAllocations.at(-1)!;
  const bars = ngcdfAllocations.map((a) => ({
    key: a.fy,
    label: a.fy.replace(/^20/, ""),
    value: a.amount,
    display: `KSh ${formatNumber(a.amount)}`,
  }));

  return (
    <section aria-labelledby="ngcdf-title" className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
      <div className="flex min-w-0 flex-col gap-4">
        <div className="tea-rule" aria-hidden />
        <h2 id="ngcdf-title" className="m-0 font-display text-[30px] font-bold sm:text-4xl">
          {t("title")}
        </h2>
        <p className="m-0 text-lg text-muted">{t("lead")}</p>
        <p className="m-0 flex flex-col">
          <span className="font-display text-[44px] leading-tight font-bold text-tea tabular">
            KSh {(latest.amount / 1_000_000).toFixed(1)}m
            <SourceTick id={NGCDF_SOURCE} />
          </span>
          <span className="text-muted">{t("latest", { fy: latest.fy })}</span>
        </p>
        <p className="m-0 rounded-lg bg-gold-soft p-4 font-medium">{t("promise")}</p>
        <Link href="/plan" className="inline-flex min-h-11 w-fit items-center font-semibold text-tea">
          {t("planLink")} →
        </Link>
      </div>
      <div className="flex min-w-0 flex-col gap-3">
        <BarChart title={t("chart")} bars={bars} emptyLabel={t("empty")} tableLabel={t("table")} columns={[t("year"), t("amount")]} />
        <p className="m-0 text-sm text-muted">{t("note")}</p>
      </div>
    </section>
  );
}
