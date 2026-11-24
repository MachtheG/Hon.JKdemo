import type { SourceId } from "./sources";

export type Bilingual = { en: string; sw: string };

export interface TimelineEntry {
  year: string;
  kind: "education" | "office" | "honour" | "legislation";
  title: Bilingual;
  source: SourceId;
  /** Shown publicly as [[TO CONFIRM: …]] until the campaign supplies a document. */
  confirm?: string;
}

export const timeline: TimelineEntry[] = [
  { year: "1987–1995", kind: "education", title: { en: "Tendwet Primary School — KCPE", sw: "Shule ya Msingi Tendwet — KCPE" }, source: "parl-na-profile-2017" },
  {
    year: "1996–1999",
    kind: "education",
    title: { en: "Secondary school — KCSE", sw: "Shule ya sekondari — KCSE" },
    source: "parl-na-profile-2017",
    confirm: "school name: 'Mugango Secondary' (2017 profile) or 'Mucamco Secondary' (2022 profile)",
  },
  {
    year: "2004–2005",
    kind: "education",
    title: { en: "Kenya Institute of Legal Studies — Certificate of Legal Studies", sw: "Taasisi ya Mafunzo ya Sheria Kenya — Cheti cha Sheria" },
    source: "parl-na-profile-2017",
  },
  {
    year: "2007–2013",
    kind: "office",
    title: { en: "Councillor, Singorwet Ward, Bomet Municipal Council", sw: "Diwani, Wadi ya Singorwet, Baraza la Manispaa ya Bomet" },
    source: "parl-senate-profile",
    confirm: "elected or nominated councillor; Deputy Mayor dates",
  },
  {
    year: "2011",
    kind: "office",
    title: { en: "First woman Mayor of Bomet Municipality", sw: "Meya wa kwanza mwanamke wa Manispaa ya Bomet" },
    source: "allafrica-first-woman-mayor-2011",
    confirm: "dates as Mayor (reported as 2011–2013)",
  },
  {
    year: "2013–2017",
    kind: "office",
    title: { en: "MCA, Singorwet Ward & Deputy Speaker, Bomet County Assembly", sw: "MCA, Wadi ya Singorwet na Naibu Spika, Bunge la Kaunti ya Bomet" },
    source: "parl-na-profile-2017",
  },
  {
    year: "2014–2017",
    kind: "education",
    title: { en: "JKUAT — Diploma", sw: "JKUAT — Stashahada" },
    source: "parl-senate-profile",
    confirm: "diploma title and year ('County Governance' 2014, or 'Governance & Leadership' 2015–2017)",
  },
  {
    year: "2017",
    kind: "office",
    title: { en: "Elected Woman Representative, Bomet County (Jubilee) — 205,964 votes", sw: "Alichaguliwa Mwakilishi wa Wanawake, Kaunti ya Bomet (Jubilee) — kura 205,964" },
    source: "iebc-data-report-2017",
  },
  {
    year: "2017–2022",
    kind: "office",
    title: { en: "Member, Committee on National Cohesion & Equal Opportunity", sw: "Mjumbe, Kamati ya Utangamano wa Kitaifa na Fursa Sawa" },
    source: "parl-na-profile-2017",
  },
  {
    year: "2018–2022",
    kind: "education",
    title: { en: "Moi University — Degree, Arts (Communication & Public Relations)", sw: "Chuo Kikuu cha Moi — Shahada ya Sanaa (Mawasiliano na Uhusiano wa Umma)" },
    source: "parl-senate-profile",
    confirm: "degree completed",
  },
  { year: "2022", kind: "office", title: { en: "Nominated to the Senate (UDA), 13th Parliament", sw: "Aliteuliwa kuwa Seneta (UDA), Bunge la 13" }, source: "parl-senate-profile" },
  {
    year: "2022",
    kind: "office",
    title: { en: "Elected Vice-Chairperson, Parliamentary Service Commission", sw: "Alichaguliwa Makamu Mwenyekiti, Tume ya Huduma za Bunge" },
    source: "parl-psc-vice-chair",
  },
  {
    year: "2024",
    kind: "legislation",
    title: { en: "Sponsored the County Library Services Bill (Senate Bills No. 40 of 2024)", sw: "Alidhamini Mswada wa Huduma za Maktaba za Kaunti (Mswada wa Seneti Na. 40 wa 2024)" },
    source: "mzalendo-bill-county-library",
  },
  {
    year: "2026",
    kind: "legislation",
    title: { en: "County Library Services Bill passes Third Reading in the Senate", sw: "Mswada wa Huduma za Maktaba za Kaunti wapita Kusomwa kwa Tatu Seneti" },
    source: "mzalendo-bill-county-library",
  },
  {
    year: "—",
    kind: "honour",
    title: { en: "Chief of the Order of the Burning Spear (CBS)", sw: "Chief of the Order of the Burning Spear (CBS)" },
    source: "psc-annual-report-2023-24",
    confirm: "year conferred and Gazette notice",
  },
];

/** Senate floor activity on Bomet and priority audiences (Mzalendo tracker). */
export const senateHighlights: { date: string; topic: Bilingual; kind: "statement" | "bill" | "motion"; source: SourceId }[] = [
  { date: "2023-05-25", kind: "statement", topic: { en: "Tea weights and measures affecting smallholder farmers", sw: "Vipimo na mizani ya chai vinavyowaathiri wakulima wadogo" }, source: "mzalendo-senate-13th" },
  { date: "2024-02-22", kind: "statement", topic: { en: "Status and welfare of ECDE teachers in Bomet County", sw: "Hali na ustawi wa walimu wa ECDE katika Kaunti ya Bomet" }, source: "mzalendo-senate-13th" },
  { date: "2024-09-18", kind: "statement", topic: { en: "Upgrading teachers who hold the Diploma in Primary Teacher Education", sw: "Kupandishwa daraja kwa walimu wenye Stashahada ya Ualimu wa Msingi" }, source: "mzalendo-senate-13th" },
  { date: "2024-11-14", kind: "statement", topic: { en: "Implementation of the National Tree Planting Initiative", sw: "Utekelezaji wa Mpango wa Kitaifa wa Upandaji Miti" }, source: "mzalendo-senate-13th" },
  { date: "2025-03-12", kind: "bill", topic: { en: "Moved the County Library Services Bill, second reading", sw: "Aliwasilisha Mswada wa Huduma za Maktaba za Kaunti, kusomwa kwa pili" }, source: "bunge-hub-2025-03-12" },
  { date: "2026-02-25", kind: "bill", topic: { en: "County Library Services Bill passes Third Reading", sw: "Mswada wa Huduma za Maktaba za Kaunti wapita Kusomwa kwa Tatu" }, source: "mzalendo-bill-county-library" },
  { date: "2026-03-17", kind: "motion", topic: { en: "Seconded: teacher-training college students in the higher-education funding model (adopted)", sw: "Aliunga mkono: wanafunzi wa vyuo vya ualimu katika mfumo wa ufadhili wa elimu ya juu (ulipitishwa)" }, source: "mzalendo-senate-13th" },
  { date: "2026-10-08", kind: "statement", topic: { en: "Gender-based and domestic violence in Bomet County", sw: "Ukatili wa kijinsia na wa nyumbani katika Kaunti ya Bomet" }, source: "mzalendo-senate-13th" },
];
