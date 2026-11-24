import type { PhotoId } from "./photos";
import type { SourceId } from "./sources";

/**
 * Bomet Central constituency (IEBC code 197) — the seat Joyce is contesting in 2027.
 * Every figure here is official and cited; nothing is estimated.
 */
export interface Ward {
  slug: string;
  name: string;
  /** IEBC county assembly ward code. */
  code: string;
  voters2022: number;
  voters2017: number;
  pollingStations2017: number;
  photo: PhotoId;
}

export const BOMET_CENTRAL = {
  code: "197",
  name: "Bomet Central",
  population2019: 175_215, // knbs-2019-census
  voters2022: 71_409, // iebc-rov-2022
  voters2017: 60_115, // iebc-rov-caw-2017 (sum of wards)
  pollingStations2017: 126, // iebc-rov-caw-2017 (sum of wards)
} as const;

export const bometCentralWards: Ward[] = [
  { slug: "silibwet-township", name: "Silibwet Township", code: "0981", voters2022: 17_882, voters2017: 14_758, pollingStations2017: 29, photo: "CONST-BOMET-CENTRAL" },
  { slug: "ndaraweta", name: "Ndaraweta", code: "0982", voters2022: 12_233, voters2017: 10_306, pollingStations2017: 21, photo: "COUNTY-01" },
  { slug: "singorwet", name: "Singorwet", code: "0983", voters2022: 12_483, voters2017: 10_430, pollingStations2017: 23, photo: "CARD-NEXT" },
  { slug: "chesoen", name: "Chesoen", code: "0984", voters2022: 17_516, voters2017: 15_208, pollingStations2017: 32, photo: "CONST-CHEPALUNGU" },
  { slug: "mutarakwa", name: "Mutarakwa", code: "0985", voters2022: 11_295, voters2017: 9_413, pollingStations2017: 21, photo: "CONST-KONOIN" },
];

export const wardSources: Record<"voters2022" | "voters2017" | "pollingStations2017", SourceId> = {
  voters2022: "iebc-rov-caw-2022",
  voters2017: "iebc-rov-caw-2017",
  pollingStations2017: "iebc-rov-caw-2017",
};

/** NG-CDF approved allocations to Bomet Central (KSh), as published by the NG-CDF Board. */
export const ngcdfAllocations: { fy: string; amount: number }[] = [
  { fy: "2013/14", amount: 76_170_798.0 },
  { fy: "2014/15", amount: 109_447_189.0 },
  { fy: "2015/16", amount: 115_998_113.0 },
  { fy: "2016/17", amount: 81_896_551.72 },
  { fy: "2017/18", amount: 98_189_655.17 },
  { fy: "2018/19", amount: 109_040_875.5 },
  { fy: "2019/20", amount: 137_367_724.14 },
  { fy: "2020/21", amount: 137_088_879.31 },
  { fy: "2021/22", amount: 137_088_879.0 },
  { fy: "2022/23", amount: 145_087_603.0 },
  { fy: "2023/24", amount: 175_361_810.0 },
  { fy: "2024/25", amount: 179_441_954.47 },
  { fy: "2025/26", amount: 192_613_248.0 },
  { fy: "2026/27", amount: 192_613_248.0 },
];
export const NGCDF_SOURCE: SourceId = "ngcdf-allocations-197";

/** Projects listed on the official NG-CDF Bomet Central site. Not Joyce's work — shown for transparency. */
export const ngcdfProjects: { name: string; status: "complete"; fy: string | null; url: string }[] = [
  { name: "Kimangora Primary School", status: "complete", fy: "2022/23", url: "https://bomet-central.ngcdf.go.ke/project/kimangora-primary-school/" },
  { name: "Ngocho Primary School", status: "complete", fy: null, url: "https://bomet-central.ngcdf.go.ke/project/ngocho-primary-school/" },
  { name: "Kapnariet Primary School", status: "complete", fy: null, url: "https://bomet-central.ngcdf.go.ke/project/kapnariet-primary-school/" },
  { name: "Chesoen Primary School", status: "complete", fy: null, url: "https://bomet-central.ngcdf.go.ke/project/chesoen-primary-school/" },
];
export const NGCDF_PROJECTS_SOURCE: SourceId = "ngcdf-bomet-central-projects";
