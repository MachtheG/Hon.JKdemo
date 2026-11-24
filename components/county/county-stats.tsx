import { useTranslations } from "next-intl";
import { Stat } from "@/components/shared/stat";
import { contextStats } from "@/data/stats";
import { formatNumber } from "@/lib/format";

const items = [
  { id: "population-2019", key: "population" },
  { id: "female-2019", key: "women" },
  { id: "households-2019", key: "households" },
  { id: "voters-2022", key: "voters2022" },
  { id: "constituencies", key: "constituencies" },
  { id: "wards", key: "wards" },
] as const;

export function CountyStats() {
  const t = useTranslations("county.stats");
  return (
    <section aria-labelledby="county-stats-title" className="flex flex-col gap-6">
      <h2 id="county-stats-title" className="m-0 font-display text-[28px] font-semibold sm:text-4xl">
        {t("title")}
      </h2>
      <div className="grid grid-cols-2 gap-6 border-t-2 border-text pt-6 lg:grid-cols-3">
        {items.map((i) => {
          const s = contextStats.find((c) => c.id === i.id)!;
          return <Stat key={i.id} value={formatNumber(Number(s.value))} label={t(i.key)} source={s.source} />;
        })}
      </div>
    </section>
  );
}
