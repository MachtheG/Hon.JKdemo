"use client";

import { useTranslations } from "next-intl";
import { bometMap } from "@/data/geo/bomet-paths";
import { populationByConstituency2019 } from "@/data/stats";
import { Link } from "@/i18n/navigation";
import { county2017 } from "@/lib/election-results";
import { formatNumber } from "@/lib/format";
import type { Level } from "./map-svg";

/** Detail for the selected area. Below county level every result reads "pending" — never estimated. */
export function MapPanel({ level, selected, onReset }: { level: Level; selected: string | null; onReset: () => void }) {
  const t = useTranslations("map.panel");
  const area = selected
    ? level === "constituencies"
      ? bometMap.constituencies.find((c) => c.slug === selected)
      : bometMap.wards.find((w) => w.slug === selected)
    : undefined;
  const consSlug = area ? ("constituency" in area ? area.constituency : area.slug) : null;
  const ctx = populationByConstituency2019.find((c) => c.name.toLowerCase().replace(/ /g, "-") === consSlug);
  const pending = t("pending", { form: level === "constituencies" ? "37B" : "37A" });

  const rows: [string, string][] = area
    ? [
        [t("votes"), pending],
        [t("share"), pending],
        [t("valid"), pending],
      ]
    : [
        [t("votes"), formatNumber(county2017.votes)],
        [t("share"), `${county2017.share}%`],
        [t("margin"), formatNumber(county2017.margin)],
        [t("valid"), formatNumber(county2017.valid)],
        [t("registered"), formatNumber(county2017.registered)],
        [t("turnout"), `${county2017.turnout}%`],
      ];

  return (
    <aside aria-live="polite" className="flex flex-col gap-4 bg-ink p-6 text-paper sm:p-7">
      <span className="font-mono text-xs tracking-[0.12em] text-accent uppercase">
        {area ? (level === "constituencies" ? t("constituency") : t("ward")) : t("county")}
      </span>
      <h2 className="m-0 font-display text-[32px] leading-tight font-semibold">{area ? area.name : t("countyName")}</h2>
      <dl className="m-0 grid grid-cols-[1fr_auto] gap-x-4 gap-y-2.5 text-[15px]">
        {rows.map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="text-mist">{k}</dt>
            <dd className="m-0 text-right font-mono">{v}</dd>
          </div>
        ))}
      </dl>
      {area ? <p className="m-0 text-sm text-mist">{t("pendingNote")}</p> : <p className="m-0 font-mono text-xs text-mist">IEBC 2017 Data Report · p.137, p.19</p>}
      {area && ctx ? (
        <dl className="m-0 grid grid-cols-[1fr_auto] gap-x-4 gap-y-2 border-t border-mist/30 pt-3 text-sm">
          <dt className="col-span-2 font-semibold">{t("context")} · {ctx.name}</dt>
          <dt className="text-mist">{t("population")}</dt>
          <dd className="m-0 text-right font-mono">{formatNumber(ctx.population)}</dd>
          <dt className="text-mist">{t("voters2022")}</dt>
          <dd className="m-0 text-right font-mono">{formatNumber(ctx.voters2022)}</dd>
        </dl>
      ) : null}
      <div className="flex flex-wrap gap-3">
        {area ? (
          <button type="button" onClick={onReset} className="min-h-11 border border-paper px-4 text-sm">
            {t("showCounty")}
          </button>
        ) : null}
        {ctx ? (
          <Link href={`/bomet/${consSlug}`} className="inline-flex min-h-11 items-center text-sm text-paper">
            {t("open", { name: ctx.name })} →
          </Link>
        ) : null}
      </div>
    </aside>
  );
}
