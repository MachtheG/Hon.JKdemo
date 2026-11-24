"use client";

import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { formatNumber } from "@/lib/format";
import { allocationsByYear, allProjects, countBySector, filterProjects, SECTORS } from "@/lib/projects";
import { BarChart } from "./bar-chart";
import { ProjectCard } from "./project-card";
import { ProjectFilters } from "./project-filters";

/** Filters (URL state) → charts → cards. Charts reflect the current filter. */
export function ProjectsView({ emptyState }: { emptyState: React.ReactNode }) {
  const t = useTranslations("projects");
  const params = useSearchParams();
  const list = filterProjects(allProjects, {
    sector: params.get("sector") ?? undefined,
    constituency: params.get("constituency") ?? undefined,
    year: params.get("year") ?? undefined,
  });

  const byYear = allocationsByYear(list).map((y) => ({ key: y.year, label: y.year, value: y.amount, display: formatNumber(y.amount) }));
  const counted = countBySector(list);
  const bySector = (counted.length ? counted : SECTORS.slice(0, 5).map((sector) => ({ sector, count: 0 }))).map((s) => ({
    key: s.sector,
    label: t(`sectors.${s.sector}`),
    value: s.count,
    display: String(s.count),
  }));

  return (
    <div className="flex flex-col gap-12">
      <ProjectFilters count={list.length} />
      <div className="grid gap-10 lg:grid-cols-2">
        <BarChart
          title={t("charts.byYear")}
          bars={byYear}
          emptyLabel={t("charts.empty")}
          tableLabel={t("charts.table")}
          columns={[t("charts.year"), t("charts.amount")]}
        />
        <BarChart
          title={t("charts.bySector")}
          bars={bySector}
          emptyLabel={t("charts.empty")}
          tableLabel={t("charts.table")}
          columns={[t("charts.sector"), t("charts.count")]}
        />
      </div>
      {list.length === 0 ? (
        emptyState
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}
    </div>
  );
}
