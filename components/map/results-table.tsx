import { useTranslations } from "next-intl";
import { populationByConstituency2019 } from "@/data/stats";
import { county2017 } from "@/lib/election-results";
import { formatNumber } from "@/lib/format";

/** The same data as the map, as an accessible table. */
export function ResultsTable() {
  const t = useTranslations("map.table");
  const tp = useTranslations("map.panel");
  const cell = "px-2 py-2.5";
  return (
    <section aria-labelledby="results-title" className="flex flex-col gap-3">
      <h2 id="results-title" className="m-0 font-display text-[28px] font-semibold">
        {t("title")}
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse text-[15px]">
          <caption className="pb-2 text-left text-muted">{t("caption")}</caption>
          <thead>
            <tr className="border-b-2 border-text text-left">
              <th scope="col" className={cell}>{t("area")}</th>
              <th scope="col" className={cell}>{t("votes")}</th>
              <th scope="col" className={cell}>{t("share")}</th>
              <th scope="col" className={cell}>{t("valid")}</th>
              <th scope="col" className={cell}>{t("registered")}</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-rule">
              <th scope="row" className={`${cell} text-left`}>{tp("countyName")}</th>
              <td className={`${cell} font-mono`}>{formatNumber(county2017.votes)}</td>
              <td className={`${cell} font-mono`}>{county2017.share}%</td>
              <td className={`${cell} font-mono`}>{formatNumber(county2017.valid)}</td>
              <td className={`${cell} font-mono`}>{formatNumber(county2017.registered)}</td>
            </tr>
            {populationByConstituency2019.map((c) => (
              <tr key={c.code} className="border-b border-rule">
                <th scope="row" className={`${cell} text-left font-medium`}>{c.name}</th>
                <td colSpan={4} className={`${cell} text-laterite-ink`}>{t("pending")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
