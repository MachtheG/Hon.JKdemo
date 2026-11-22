import type { SourceId } from "./sources";

export interface Stat {
  id: string;
  value: number | string;
  unit?: string;
  label: string;
  source: SourceId;
  /** "published" = as printed in the source; "derived" = computed by us from published figures. */
  kind: "published" | "derived";
  note?: string;
}

/** Bomet County context (KNBS 2019 Census, IEBC, County Government). */
export const contextStats: Stat[] = [
  { id: "population-2019", value: 875689, label: "Population (2019 Census)", source: "knbs-2019-census", kind: "published" },
  { id: "female-2019", value: 441379, label: "Women and girls (2019 Census)", source: "knbs-2019-census", kind: "published" },
  { id: "male-2019", value: 434287, label: "Men and boys (2019 Census)", source: "knbs-2019-census", kind: "published" },
  { id: "intersex-2019", value: 23, label: "Intersex (2019 Census)", source: "knbs-2019-census", kind: "published" },
  { id: "households-2019", value: 187641, label: "Households (2019 Census)", source: "knbs-2019-census", kind: "published" },
  { id: "hh-size-2019", value: 4.7, label: "Average household size", source: "knbs-2019-census", kind: "published" },
  { id: "constituencies", value: 5, label: "Constituencies", source: "bomet-county-about", kind: "published" },
  { id: "wards", value: 25, label: "County assembly wards", source: "bomet-county-about", kind: "published" },
  { id: "villages", value: 1977, label: "Villages", source: "bomet-county-about", kind: "published" },
  { id: "voters-2017", value: 322024, label: "Registered voters, 2017", source: "iebc-data-report-2017", kind: "published" },
  { id: "voters-2022", value: 376985, label: "Registered voters, 2022", source: "iebc-rov-2022", kind: "published" },
];

/** Population by constituency/sub-county, 2019 Census. */
export const populationByConstituency2019 = [
  { code: "194", name: "Sotik", population: 227855, voters2022: 86681 },
  { code: "195", name: "Chepalungu", population: 164837, voters2022: 80140 },
  { code: "196", name: "Bomet East", population: 144275, voters2022: 63640 },
  { code: "197", name: "Bomet Central", population: 175215, voters2022: 71409 },
  { code: "198", name: "Konoin", population: 163507, voters2022: 75115 },
] as const; // population: knbs-2019-census; voters2022: iebc-rov-2022

export const wardsByConstituency = {
  "Bomet Central": ["Mutarakwa", "Silibwet Township", "Singorwet", "Chesoen", "Ndaraweta"],
  "Bomet East": ["Kipreres", "Longisa", "Chemaner", "Kembu", "Merigi"],
  Chepalungu: ["Nyangores", "Kongasis", "Chebunyo", "Sigor", "Siongiroi"],
  Konoin: ["Chepchabas", "Mogogosiek", "Embomos", "Boito", "Kimulot"],
  Sotik: ["Kipsonoi", "Kapletundo", "Chemagel", "Ndanai/Abosi", "Rongena/Manaret"],
} as const; // bomet-county-about

/** Record stats. */
export const recordStats: Stat[] = [
  { id: "wr-votes-2017", value: 205964, label: "Votes won, Woman Rep 2017", source: "iebc-data-report-2017", kind: "published" },
  { id: "wr-share-2017", value: 78.5, unit: "%", label: "Vote share, Woman Rep 2017", source: "iebc-data-report-2017", kind: "derived", note: "205,964 / 262,253 total valid votes = 78.54%" },
  { id: "wr-margin-2017", value: 154873, label: "Winning margin, 2017", source: "iebc-data-report-2017", kind: "derived", note: "205,964 − 51,091" },
  { id: "years-elected-office", value: "2007–2022", label: "Ward → Assembly → National Assembly", source: "parl-senate-profile", kind: "published" },
  { id: "senate-bills", value: 1, label: "Senate bill sponsored (County Library Services Bill, 2024)", source: "mzalendo-senate-13th", kind: "published" },
  { id: "senate-contributions", value: 174, label: "Senate floor contributions (to Oct 2026)", source: "mzalendo-senate-13th", kind: "published" },
  { id: "senate-statements", value: 12, label: "Statements sought / made in the Senate", source: "mzalendo-senate-13th", kind: "published" },
  { id: "senate-motions-seconded", value: 3, label: "Motions seconded", source: "mzalendo-senate-13th", kind: "published" },
  { id: "senate-papers-laid", value: 31, label: "Papers laid", source: "mzalendo-senate-13th", kind: "published" },
  { id: "senate-committees", value: 2, label: "Senate committees (Delegated Legislation; National Cohesion, Equal Opportunity & Regional Integration)", source: "mzalendo-senate-13th", kind: "published" },
  { id: "psc-vice-chair", value: "Since 16 Nov 2022", label: "Vice-Chairperson, Parliamentary Service Commission", source: "parl-psc-vice-chair", kind: "published" },
];
