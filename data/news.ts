import type { Bilingual } from "./bio";
import type { SourceId } from "./sources";

/** Headlines are the publishers' own; summaries are ours. Never copy article text. */
export interface NewsItem {
  date: string; // ISO or "undated"
  headline: string;
  summary: Bilingual;
  source: SourceId;
  showOnSite: boolean;
}

export const news: NewsItem[] = [
  {
    date: "2026-06-24",
    headline: "IEBC sets August 10, 2027 as General Election date",
    summary: { en: "IEBC confirms polling day and the campaign and nomination windows.", sw: "IEBC yathibitisha siku ya kupiga kura na vipindi vya kampeni na uteuzi." },
    source: "iebc-2027-date",
    showOnSite: true,
  },
  {
    date: "2026-02-25",
    headline: "The County Library Services Bill (Senate Bills No. 40 of 2024)",
    summary: { en: "The Senate passes Joyce's library bill and sends it to the National Assembly.", sw: "Seneti yapitisha mswada wa maktaba wa Joyce na kuupeleka Bunge la Kitaifa." },
    source: "mzalendo-bill-county-library",
    showOnSite: true,
  },
  {
    date: "2025-03-12",
    headline: "Senate · Afternoon Sitting, 12 March 2025",
    summary: { en: "Joyce moves her bill to set standards for county public libraries.", sw: "Joyce awasilisha mswada wake wa kuweka viwango vya maktaba za umma za kaunti." },
    source: "bunge-hub-2025-03-12",
    showOnSite: true,
  },
  {
    date: "2022-11-16",
    headline: "Hon Senator Joyce Korir elected Vice-Chairperson of PSC",
    summary: { en: "The Parliamentary Service Commission elects Joyce as its Vice-Chairperson at its first sitting.", sw: "Tume ya Huduma za Bunge yamchagua Joyce kuwa Makamu Mwenyekiti katika kikao chake cha kwanza." },
    source: "parl-psc-vice-chair",
    showOnSite: true,
  },
  {
    date: "2022-11-10",
    headline: "[PHOTOS] Seven Parliamentary Service Commissioners sworn in",
    summary: { en: "Joyce is sworn in as one of seven Parliamentary Service Commissioners.", sw: "Joyce aapishwa kuwa mmoja wa Makamishna saba wa Huduma za Bunge." },
    source: "star-psc-sworn-2022",
    showOnSite: true,
  },
  {
    date: "2020-05-05",
    headline: "Bomet Woman Rep Stars in Covid-19 Sensitisation Song",
    summary: { en: "As Woman Rep, Joyce featured in a Covid-19 awareness music video for Bomet residents.", sw: "Akiwa Mwakilishi wa Wanawake, Joyce alishiriki katika video ya muziki ya kuhamasisha kuhusu Covid-19." },
    source: "kenyans-covid-song-2020",
    showOnSite: true,
  },
  {
    date: "undated",
    headline: "Government agencies to blame for early pregnancies",
    summary: { en: "As Woman Rep, Joyce pressed agencies to act firmly on defilement, teen pregnancy and early marriage.", sw: "Akiwa Mwakilishi wa Wanawake, Joyce alizitaka taasisi kuchukua hatua dhidi ya unajisi, mimba za utotoni na ndoa za mapema." },
    source: "kna-early-pregnancies",
    showOnSite: false, // link returns 404 (24 Nov 2026) — hidden until an archived copy is found
  },
  {
    date: "undated",
    headline: "Three fight for open Bomet woman rep slot",
    summary: { en: "Preview of the 2017 Bomet Woman Rep race, which Joyce entered as Deputy Speaker.", sw: "Taarifa ya awali ya kinyang'anyiro cha Mwakilishi wa Wanawake Bomet 2017, alichoingia akiwa Naibu Spika." },
    source: "nation-three-fight-2017",
    showOnSite: true,
  },
  {
    date: "2011-07-04",
    headline: "Bomet Picks First Woman Mayor",
    summary: { en: "Bomet Municipality elects Joyce as its first woman mayor.", sw: "Manispaa ya Bomet yamchagua Joyce kuwa meya wake wa kwanza mwanamke." },
    source: "allafrica-first-woman-mayor-2011",
    showOnSite: false, // article unread (403) — hidden until verified
  },
];
