import { projects, type Project, type Sector } from "@/data/projects";

export const SECTORS: Sector[] = [
  "women-empowerment",
  "bursaries",
  "education",
  "health",
  "water",
  "agriculture",
  "roads",
  "security",
  "sports",
  "environment",
];
export const FINANCIAL_YEARS = ["2017/18", "2018/19", "2019/20", "2020/21", "2021/22"] as const;
export const CONSTITUENCIES = [
  { slug: "sotik", name: "Sotik" },
  { slug: "chepalungu", name: "Chepalungu" },
  { slug: "bomet-east", name: "Bomet East" },
  { slug: "bomet-central", name: "Bomet Central" },
  { slug: "konoin", name: "Konoin" },
] as const;

export interface ProjectFilters {
  sector?: string;
  constituency?: string;
  year?: string;
}

export function filterProjects(list: Project[], f: ProjectFilters): Project[] {
  return list.filter(
    (p) =>
      (!f.sector || p.sector === f.sector) &&
      (!f.constituency || slugify(p.constituency) === f.constituency) &&
      (!f.year || p.year === f.year),
  );
}

/** Sum of allocations per financial year — other amount kinds are never mixed in. */
export function allocationsByYear(list: Project[]): { year: string; amount: number }[] {
  return FINANCIAL_YEARS.map((year) => ({
    year,
    amount: list.filter((p) => p.year === year && p.amountKind === "allocation").reduce((n, p) => n + (p.amountKes ?? 0), 0),
  }));
}

export function countBySector(list: Project[]): { sector: Sector; count: number }[] {
  return SECTORS.map((sector) => ({ sector, count: list.filter((p) => p.sector === sector).length })).filter((s) => s.count > 0);
}

export function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export const allProjects = projects;
