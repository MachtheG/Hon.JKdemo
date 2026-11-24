/** Licences and attributions for third-party data and media used on the site. */
export interface Credit {
  id: string;
  what: string;
  author: string;
  licence: string;
  licenceUrl: string;
  sourceUrl: string;
  notes?: string;
}

export const credits: Credit[] = [
  {
    id: "geo-constituencies",
    what: "Constituency (sub-county) boundaries, Bomet County",
    author: "IEBC, OCHA ROSEA — via geoBoundaries gbOpen KEN ADM2 (build 9469f09, Dec 2023)",
    licence: "CC BY 3.0 IGO",
    licenceUrl: "https://creativecommons.org/licenses/by/3.0/igo/",
    sourceUrl: "https://www.geoboundaries.org/api/current/gbOpen/KEN/ADM2/",
    notes: "Simplified by geoBoundaries; filtered to Bomet's five constituencies.",
  },
  {
    id: "geo-wards",
    what: "County assembly ward boundaries, Bomet County",
    author: "Benedict Aboki Omare and George Omare — via geoBoundaries gbOpen KEN ADM3 (build 9469f09, Dec 2023)",
    licence: "CC BY 4.0",
    licenceUrl: "https://creativecommons.org/licenses/by/4.0/",
    sourceUrl: "https://www.geoboundaries.org/api/current/gbOpen/KEN/ADM3/",
    notes: "Filtered to the 25 Bomet wards by location; one Kericho ward (Chaik) that overlaps after simplification was excluded.",
  },
  {
    id: "fonts",
    what: "Fraunces, Inter, IBM Plex Mono",
    author: "Undercase Type; Rasmus Andersson; IBM",
    licence: "SIL Open Font License 1.1",
    licenceUrl: "https://openfontlicense.org/",
    sourceUrl: "https://fonts.google.com/",
  },
];
