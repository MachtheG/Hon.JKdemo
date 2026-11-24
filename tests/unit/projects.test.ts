import { describe, expect, it } from "vitest";
import type { Project } from "@/data/projects";
import { allocationsByYear, countBySector, filterProjects } from "@/lib/projects";

const p = (over: Partial<Project>): Project => ({
  id: "x",
  name: "Test",
  sector: "education",
  constituency: "Sotik",
  ward: null,
  year: "2018/19",
  amountKes: 100,
  amountKind: "allocation",
  fundingSource: "NGAAF",
  status: "approved",
  role: "allocated",
  source: "iebc-data-report-2017",
  ...over,
});

describe("project helpers (test fixtures only — not real data)", () => {
  const list = [
    p({ id: "a" }),
    p({ id: "b", sector: "health", constituency: "Bomet East", amountKes: 50 }),
    p({ id: "c", year: "2019/20", amountKind: "expenditure", amountKes: 999 }),
  ];
  it("filters by sector, constituency slug and year", () => {
    expect(filterProjects(list, { sector: "health" }).map((x) => x.id)).toEqual(["b"]);
    expect(filterProjects(list, { constituency: "bomet-east" }).map((x) => x.id)).toEqual(["b"]);
    expect(filterProjects(list, { year: "2019/20" }).map((x) => x.id)).toEqual(["c"]);
  });
  it("never mixes spending into allocation totals", () => {
    const byYear = allocationsByYear(list);
    expect(byYear.find((y) => y.year === "2018/19")!.amount).toBe(150);
    expect(byYear.find((y) => y.year === "2019/20")!.amount).toBe(0);
  });
  it("counts only sectors that have projects", () => {
    expect(countBySector(list)).toEqual([
      { sector: "education", count: 2 },
      { sector: "health", count: 1 },
    ]);
  });
});
