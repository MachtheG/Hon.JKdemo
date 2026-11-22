import type { SourceId } from "./sources";

export interface TimelineEntry {
  year: string;
  title: string;
  detail?: string;
  source: SourceId;
  confirm?: string; // [[TO CONFIRM]] note
}

export const timeline: TimelineEntry[] = [
  { year: "1987–1995", title: "Tendwet Primary School — KCPE", source: "parl-na-profile-2017" },
  {
    year: "1996–1999",
    title: "Secondary school — KCSE",
    source: "parl-na-profile-2017",
    confirm: "School name: 'Mugango Secondary' (2017 profile) vs 'Mucamco Secondary' (2022 profile)",
  },
  { year: "2004–2005", title: "Kenya Institute of Legal Studies — Certificate of Legal Studies", source: "parl-na-profile-2017" },
  {
    year: "2007–2013",
    title: "Councillor, Singorwet Ward, Bomet Municipal Council",
    source: "parl-senate-profile",
    confirm: "Elected (2017 profile, Wikipedia) or nominated (Mzalendo)? Deputy Mayor from 2007?",
  },
  {
    year: "2011",
    title: "First woman Mayor of Bomet Municipality",
    source: "allafrica-first-woman-mayor-2011",
    confirm: "Source article not readable by our tools; confirm wording and dates (Wikipedia: Mayor 2011–2013)",
  },
  { year: "2013–2017", title: "MCA, Singorwet Ward & Deputy Speaker, Bomet County Assembly", source: "parl-na-profile-2017" },
  {
    year: "2014–2017",
    title: "JKUAT — Diploma",
    source: "parl-senate-profile",
    confirm: "Title: 'County Governance' (2014, 2017 profile) vs 'Governance & Leadership' 2015–2017 (2022 profile)",
  },
  { year: "2017", title: "Elected Woman Representative, Bomet County (Jubilee) — 205,964 votes", source: "iebc-data-report-2017" },
  { year: "2017–2022", title: "Member, Committee on National Cohesion & Equal Opportunity (National Assembly)", source: "parl-na-profile-2017" },
  {
    year: "2018–2022",
    title: "Moi University — Degree, Arts (Communication & Public Relations)",
    source: "parl-senate-profile",
    confirm: "Graduation confirmed?",
  },
  { year: "2022", title: "Nominated to the Senate (UDA), 13th Parliament", source: "parl-senate-profile" },
  { year: "2022", title: "Elected Vice-Chairperson, Parliamentary Service Commission", source: "parl-psc-vice-chair" },
  { year: "2024", title: "Sponsored the County Library Services Bill (Senate Bills No. 40 of 2024)", source: "mzalendo-bill-county-library" },
  { year: "2026", title: "County Library Services Bill passes Third Reading in the Senate (25 Feb)", source: "mzalendo-bill-county-library" },
  {
    year: "—",
    title: "Chief of the Order of the Burning Spear (CBS)",
    source: "psc-annual-report-2023-24",
    confirm: "Year conferred and Gazette notice",
  },
];

/** Senate statements on Bomet / priority audiences (Mzalendo tracker). */
export const senateHighlights = [
  { date: "2023-05-25", topic: "Non-compliance with standard weights and measures in tea marketing affecting smallholder farmers", source: "mzalendo-senate-13th" },
  { date: "2024-02-22", topic: "Status and welfare of ECDE teachers in Bomet County", source: "mzalendo-senate-13th" },
  { date: "2024-09-18", topic: "Upgrading of teachers holding Diploma in Primary Teacher Education by TSC", source: "mzalendo-senate-13th" },
  { date: "2024-11-14", topic: "Implementation of the National Tree Planting Initiative", source: "mzalendo-senate-13th" },
  { date: "2026-03-17", topic: "Seconded: inclusion of teacher-training college students in the higher-education funding model (adopted)", source: "mzalendo-senate-13th" },
  { date: "2026-10-08", topic: "Prevalence of gender-based violence, particularly domestic violence, in Bomet County", source: "mzalendo-senate-13th" },
] as const;
