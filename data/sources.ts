/**
 * Source registry. Every figure, project, quote, date and election result on the
 * site must reference an id from this file. Accessed dates are when the research
 * team last read the source.
 *
 * tier: "official" = IEBC, Parliament, KNBS, Gazette, government;
 *       "secondary" = reputable media / civic-tech; "tertiary" = wiki/aggregator
 *       (never the sole source for a published figure).
 */
export type SourceTier = "official" | "secondary" | "tertiary";

export interface Source {
  id: string;
  title: string;
  publisher: string;
  /** Publication date (ISO) or "undated". */
  date: string;
  url: string;
  accessed: string;
  tier: SourceTier;
  /** Page / table reference or caveats. */
  notes?: string;
}

export const sources = [
  // ── Parliament ──────────────────────────────────────────────────────────
  {
    id: "parl-na-profile-2017",
    title: "Hon. Chepkoech, Joyce Korir",
    publisher: "Parliament of Kenya (National Assembly, 12th Parliament)",
    date: "undated",
    url: "https://www.parliament.go.ke/node/3214",
    accessed: "2026-11-22",
    tier: "official",
    notes:
      "Education, employment history, committee: National Cohesion & Equal Opportunity (2017–). Photo: /sites/default/files/2017-10/88c9db60db08f693776a4a523f26de7b_M.jpg",
  },
  {
    id: "parl-senate-profile",
    title: "Sen. Joyce Chepkoech Korir",
    publisher: "Parliament of Kenya (Senate, 13th Parliament)",
    date: "undated",
    url: "https://parliament.go.ke/node/17491",
    accessed: "2026-11-22",
    tier: "official",
    notes:
      "Nominated, UDA. Education & employment table differs from 2017 profile. Photo: /sites/default/files/2022-09/joyce.jpg",
  },
  {
    id: "parl-psc-vice-chair",
    title: "Hon Senator Joyce Korir elected Vice-Chairperson of PSC",
    publisher: "Parliament of Kenya",
    date: "2022-11-16",
    url: "https://parliament.go.ke/node/18016",
    accessed: "2026-11-22",
    tier: "official",
    notes: "Elected at the Commission's first sitting, 16 Nov 2022; commissioners sworn in 10 Nov 2022.",
  },
  {
    id: "psc-annual-report-2023-24",
    title: "Parliamentary Service Commission Annual Report 2023–2024",
    publisher: "Parliamentary Service Commission",
    date: "2026-04",
    url: "https://parliament.go.ke/sites/default/files/2026-04/PSC%20ANNUAL%20REPORT%202023-2024-final.pdf",
    accessed: "2026-11-22",
    tier: "official",
    notes: "Lists 'Sen. Joyce Korir, CBS MP, Vice-Chairperson' (seen via search snippet — open and confirm page).",
  },
  // ── Civic-tech record ───────────────────────────────────────────────────
  {
    id: "mzalendo-senate-13th",
    title: "Joyce Chepkoech Korir — Senator (13th Parliament)",
    publisher: "Mzalendo Trust",
    date: "2026-10-08",
    url: "https://mzalendo.com/mps-performance/senate/13th-parliament/joyce-chepkoech-korir/",
    accessed: "2026-11-22",
    tier: "secondary",
    notes:
      "Counts: 1 bill, 174 contributions, 2 committees, 3 motions (seconded), 12 statements, 31 papers laid, 20 votes recorded. Trackers updated to 8 Oct 2026.",
  },
  {
    id: "mzalendo-na-12th",
    title: "Korir Joyce — National Assembly (12th Parliament)",
    publisher: "Mzalendo Trust",
    date: "undated",
    url: "https://www.mzalendo.com/mps-performance/national-assembly/12th-parliament/korir-joyce/",
    accessed: "2026-11-22",
    tier: "secondary",
    notes:
      "DATA ERROR on page: shows 242,775 votes / UDA / Gazette Notice 9951 — these are the 2022 winner's figures, not Korir's. Do NOT use. 12th-Parliament Hansard counts not published (shows 0). 1 paper laid 26 Nov 2019.",
  },
  {
    id: "mzalendo-bill-county-library",
    title: "The County Library Services Bill (Senate Bills No. 40 of 2024)",
    publisher: "Mzalendo Trust",
    date: "2026-02-25",
    url: "https://mzalendo.com/legislative-trends/bills/senate/321/",
    accessed: "2026-11-22",
    tier: "secondary",
    notes: "Sponsor: Sen. Joyce Korir. Third Reading 25 Feb 2026; National Assembly amendments later considered. Confirm assent status on parliament.go.ke.",
  },
  {
    id: "bunge-hub-2025-03-12",
    title: "Senate · Afternoon Sitting, 12 March 2025",
    publisher: "Bunge Hub (Mwananchi Tech) / Senate Hansard",
    date: "2025-03-12",
    url: "https://bunge-hub.mwananchi.tech/sittings/5a7e3207-8080-4f67-a7f5-a0a83e461836",
    accessed: "2026-11-22",
    tier: "secondary",
    notes: "Second reading of the County Library Services Bill moved by Sen. Korir — confirm against official Hansard PDF.",
  },
  // ── IEBC ────────────────────────────────────────────────────────────────
  {
    id: "iebc-data-report-2017",
    title: "Data Report of the 2017 General Election",
    publisher: "Independent Electoral and Boundaries Commission (IEBC)",
    date: "2018",
    url: "https://www.iebc.or.ke/uploads/resources/siEABKREDq.pdf",
    accessed: "2026-11-22",
    tier: "official",
    notes:
      "p.137 (s.5.4 County Woman Member results): Bomet — Chepkoech Joyce Korir JP 205,964; Chepkemoi Beatrice CCM 51,091; Sieley Lila Chepkemoi KANU 5,198; total 262,253. p.19 (8 Aug presidential table): Bomet registered voters 322,024. County level only — no constituency/ward breakdown for Woman Rep.",
  },
  {
    id: "iebc-rov-2022",
    title: "Registered Voters per Constituency for the 2022 General Election",
    publisher: "IEBC",
    date: "2022-06-23",
    url: "https://www.iebc.or.ke/docs/rov_per_constituency.pdf",
    accessed: "2026-11-22",
    tier: "official",
    notes: "Bomet (036): Sotik 194 = 86,681; Chepalungu 195 = 80,140; Bomet East 196 = 63,640; Bomet Central 197 = 71,409; Konoin 198 = 75,115. Total 376,985. Date from PDF metadata.",
  },
  {
    id: "iebc-2027-date",
    title: "IEBC sets August 10, 2027 as General Election date",
    publisher: "The Standard",
    date: "2026-06-24",
    url: "https://www.standardmedia.co.ke/national/article/2001551158/iebc-sets-august-10-2027-as-general-election-date",
    accessed: "2026-11-22",
    tier: "secondary",
    notes: "Campaign period 29 May – 7 Aug 2027; nominations 29 May – 11 Jun 2027. Replace with the Kenya Gazette notice (Aug 2026) once located.",
  },
  {
    id: "transtally-wr-2017-bomet",
    title: "2017 Woman Representative Result — Bomet County",
    publisher: "TransTally",
    date: "undated",
    url: "https://transtally.co.ke/elections/2017/woman-representative/bomet",
    accessed: "2026-11-22",
    tier: "tertiary",
    notes: "Candidate votes match IEBC data report. Its 376,985 'registered voters' and 69.57% turnout use the 2022 register — WRONG for 2017. Do not cite.",
  },
  // ── KNBS / county ───────────────────────────────────────────────────────
  {
    id: "knbs-2019-census",
    title: "2019 Kenya Population and Housing Census, Vol. I & II",
    publisher: "Kenya National Bureau of Statistics (KNBS)",
    date: "2019-11-04",
    url: "https://www.knbs.or.ke/?p=5621",
    accessed: "2026-11-22",
    tier: "official",
    notes:
      "Figures transcribed via statskenya.co.ke and citypopulation.de (both cite KNBS, figures agree). Confirm against Vol. I table 2.2 / Vol. II before launch.",
  },
  {
    id: "statskenya-bomet",
    title: "Bomet County information",
    publisher: "StatsKenya",
    date: "undated",
    url: "https://statskenya.co.ke/county-information/Bomet/36",
    accessed: "2026-11-22",
    tier: "tertiary",
    notes: "Census 2019 county + sub-county totals, households 187,641, avg 4.7.",
  },
  {
    id: "citypopulation-bomet",
    title: "Bomet (County, Kenya) — Population Statistics",
    publisher: "City Population (Thomas Brinkhoff), source KNBS",
    date: "undated",
    url: "https://www.citypopulation.de/en/kenya/sub/admin/36__bomet",
    accessed: "2026-11-22",
    tier: "tertiary",
  },
  {
    id: "bomet-county-about",
    title: "About Bomet County",
    publisher: "County Government of Bomet",
    date: "undated",
    url: "https://bomet.go.ke/about",
    accessed: "2026-11-22",
    tier: "official",
    notes: "5 sub-counties, 25 wards, 66 locations, 177 sub-locations, 1,977 villages; ward list.",
  },
  // ── Biography & news ────────────────────────────────────────────────────
  {
    id: "wikipedia-korir",
    title: "Joyce Chepkoech Korir",
    publisher: "Wikipedia",
    date: "2026-05-22",
    url: "https://en.wikipedia.org/wiki/Joyce_Chepkoech_Korir",
    accessed: "2026-11-22",
    tier: "tertiary",
    notes: "Mayor 2011–2013 (cites Daily Nation 4 Jul 2011). DOB in infobox is uncited — do not publish.",
  },
  {
    id: "allafrica-first-woman-mayor-2011",
    title: "Bomet Picks First Woman Mayor",
    publisher: "Daily Nation (via AllAfrica)",
    date: "2011-07-04",
    url: "https://allafrica.com/stories/201107050624.html",
    accessed: "2026-11-22",
    tier: "secondary",
    notes: "Not readable by our fetcher (403) — campaign/team to confirm content.",
  },
  {
    id: "star-psc-sworn-2022",
    title: "[PHOTOS] Seven Parliamentary Service Commissioners sworn in",
    publisher: "The Star",
    date: "2022-11-10",
    url: "https://www.the-star.co.ke/news/2022-11-10-photos-seven-parliamentary-service-commissioners-sworn-in",
    accessed: "2026-11-22",
    tier: "secondary",
  },
  {
    id: "kenyans-covid-song-2020",
    title: "Bomet Woman Rep Stars in Covid-19 Sensitisation Song",
    publisher: "Kenyans.co.ke",
    date: "2020-05-05",
    url: "https://www.kenyans.co.ke/news/52837-woman-rep-stars-covid-19-sensitisation-song",
    accessed: "2026-11-22",
    tier: "secondary",
  },
  {
    id: "kna-early-pregnancies",
    title: "Government agencies to blame for early pregnancies",
    publisher: "Kenya News Agency",
    date: "undated",
    url: "https://kenyanews.go.ke/?p=3012",
    accessed: "2026-11-22",
    tier: "official",
    notes: "Date reported as 2018 by search summary — [[TO CONFIRM]].",
  },
  {
    id: "nation-three-fight-2017",
    title: "Three fight for open Bomet woman rep slot",
    publisher: "Nation",
    date: "undated",
    url: "https://nation.africa/kenya/news/politics/three-fight-for-open-bomet-woman-rep-slot-429144",
    accessed: "2026-11-22",
    tier: "secondary",
    notes: "Paywalled/403 to fetcher. 2017 race context.",
  },
  {
    id: "capitalfm-bomet-central-2022",
    title: "Mandago clinches UDA senatorial nomination ticket in Uasin Gishu",
    publisher: "Capital FM",
    date: "2022-04",
    url: "https://capitalfm.africa/mandago-clinches-uda-senatorial-nomination-ticket-in-uasin-gishu/",
    accessed: "2026-11-22",
    tier: "secondary",
    notes: "States she sought Bomet Central seat and lost in nominations.",
  },
  {
    id: "star-toto-2022",
    title: "Toto floors eight to clinch Bomet woman rep seat",
    publisher: "The Star",
    date: "2022-08-12",
    url: "https://www.the-star.co.ke/news/2022-08-12-toto-floors-eight-to-clinch-bomet-woman-rep-seat",
    accessed: "2026-11-22",
    tier: "secondary",
    notes: "Context only (succession). Not for site copy beyond the timeline.",
  },
  {
    id: "star-senate-race-2026",
    title: "Intense rivalry builds in Bomet Senate race",
    publisher: "The Star",
    date: "2026-05-13",
    url: "https://www.the-star.co.ke/news/2026-05-13-intense-rivalry-builds-in-bomet-senate-race",
    accessed: "2026-11-22",
    tier: "secondary",
    notes: "Research context only (no mention of Korir).",
  },
] as const satisfies readonly Source[];

export type SourceId = (typeof sources)[number]["id"];

export const sourceById = Object.fromEntries(sources.map((s) => [s.id, s])) as Record<
  SourceId,
  Source
>;
