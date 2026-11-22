import type { SourceId } from "./sources";

/** Our own one-line summaries. Never copy article text. */
export interface NewsItem {
  date: string; // ISO or "undated"
  headline: string;
  summary: string;
  source: SourceId;
  showOnSite: boolean;
}

export const news: NewsItem[] = [
  {
    date: "2011-07-04",
    headline: "Bomet Picks First Woman Mayor",
    summary: "Bomet Municipality elects Joyce Korir as its first woman mayor.",
    source: "allafrica-first-woman-mayor-2011",
    showOnSite: true,
  },
  {
    date: "undated",
    headline: "Three fight for open Bomet woman rep slot",
    summary: "Preview of the 2017 Bomet Woman Rep contest, which Korir entered as Deputy Speaker.",
    source: "nation-three-fight-2017",
    showOnSite: true,
  },
  {
    date: "undated",
    headline: "Government agencies to blame for early pregnancies",
    summary: "As Woman Rep, Korir pressed agencies to act firmly on defilement, teen pregnancy and early marriage.",
    source: "kna-early-pregnancies",
    showOnSite: true,
  },
  {
    date: "2020-05-05",
    headline: "Bomet Woman Rep Stars in Covid-19 Sensitisation Song",
    summary: "Korir featured in a Covid-19 awareness music video shared with Bomet residents.",
    source: "kenyans-covid-song-2020",
    showOnSite: true,
  },
  {
    date: "2022-11-10",
    headline: "Seven Parliamentary Service Commissioners sworn in",
    summary: "Korir is sworn in as one of seven Parliamentary Service Commissioners.",
    source: "star-psc-sworn-2022",
    showOnSite: true,
  },
  {
    date: "2022-11-16",
    headline: "Senator Joyce Korir elected Vice-Chairperson of PSC",
    summary: "The Commission elects Korir as its Vice-Chairperson at its first sitting.",
    source: "parl-psc-vice-chair",
    showOnSite: true,
  },
  {
    date: "2025-03-12",
    headline: "Senate debates the County Library Services Bill",
    summary: "Korir moves her bill to set standards for county public libraries.",
    source: "bunge-hub-2025-03-12",
    showOnSite: true,
  },
  {
    date: "2026-02-25",
    headline: "County Library Services Bill passes Third Reading",
    summary: "The Senate passes Korir's library bill and sends it to the National Assembly.",
    source: "mzalendo-bill-county-library",
    showOnSite: true,
  },
  {
    date: "2026-06-24",
    headline: "IEBC sets 10 August 2027 as election date",
    summary: "IEBC confirms polling day and the campaign and nomination windows.",
    source: "iebc-2027-date",
    showOnSite: true,
  },
];
