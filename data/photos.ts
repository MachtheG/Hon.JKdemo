/**
 * Photo manifest. Each entry is a slot on the site. Until the campaign supplies
 * a real, rights-cleared photo (`file`), the slot renders a designed placeholder.
 * Never AI-generate images of the candidate or any real person.
 * Every slot is listed in docs/SHOT-LIST.md.
 */
export type PhotoCategory = "portrait" | "community" | "parliament" | "projects" | "events";
export type Ratio = "16/9" | "4/5" | "3/2" | "1/1";

export interface Photo {
  id: string;
  /** Path under /public/images/<category>/, or null until supplied. */
  file: string | null;
  ratio: Ratio;
  /** Ratio on small screens when different (e.g. hero 4:5 crop). */
  mobileRatio?: Ratio;
  minSize: string;
  /** The shot needed (shown on the placeholder, used as alt until a real photo lands). */
  shot: { en: string; sw: string };
  alt?: { en: string; sw: string };
  caption?: { en: string; sw: string };
  date?: string;
  location?: string;
  category: PhotoCategory;
  linkedProject?: string;
  credit?: string;
  licence?: string;
  approvedForPress: boolean;
  featured: boolean;
}

export const photos = [
  {
    id: "HERO-01",
    file: null,
    ratio: "16/9",
    mobileRatio: "4/5",
    minSize: "2880×1620",
    shot: {
      en: "Joyce with women traders at a Bomet market — natural light, eye level",
      sw: "Joyce na wafanyabiashara wanawake katika soko la Bomet — mwanga wa asili",
    },
    category: "portrait",
    approvedForPress: false,
    featured: true,
  },
  {
    id: "CARD-WHO",
    file: null,
    ratio: "3/2",
    minSize: "1800×1200",
    shot: { en: "Joyce in Singorwet ward, where she began as councillor", sw: "Joyce katika wadi ya Singorwet, alipoanzia kama diwani" },
    category: "community",
    approvedForPress: false,
    featured: false,
  },
  {
    id: "CARD-RECORD",
    file: null,
    ratio: "3/2",
    minSize: "1800×1200",
    shot: { en: "Joyce speaking in the Senate chamber (Parliament photo, with permission)", sw: "Joyce akizungumza Seneti (picha ya Bunge, kwa idhini)" },
    category: "parliament",
    approvedForPress: false,
    featured: false,
  },
  {
    id: "CARD-NEXT",
    file: null,
    ratio: "3/2",
    minSize: "1800×1200",
    shot: { en: "Joyce listening at a women's group meeting", sw: "Joyce akisikiliza katika mkutano wa kikundi cha wanawake" },
    category: "community",
    approvedForPress: false,
    featured: false,
  },
  {
    id: "HOME-PROJECTS",
    file: null,
    ratio: "3/2",
    minSize: "1800×1200",
    shot: { en: "Joyce handing over an NGAAF cheque to a women's group", sw: "Joyce akikabidhi hundi ya NGAAF kwa kikundi cha wanawake" },
    category: "projects",
    approvedForPress: false,
    featured: false,
  },
  {
    id: "HOME-PLAN",
    file: null,
    ratio: "4/5",
    minSize: "1200×1500",
    shot: { en: "Joyce with teachers at an ECDE centre", sw: "Joyce na walimu katika kituo cha ECDE" },
    category: "community",
    approvedForPress: false,
    featured: false,
  },
  {
    id: "HOME-JOIN",
    file: null,
    ratio: "4/5",
    minSize: "1200×1500",
    shot: { en: "Joyce with volunteers at a campaign meeting", sw: "Joyce na wanaojitolea katika mkutano wa kampeni" },
    category: "events",
    approvedForPress: false,
    featured: false,
  },
  ...(
    [
      ["RECORD-01", "16/9", "2400×1350", "parliament", "Joyce in the Senate chamber during debate (Parliament photo, with permission)", "Joyce katika ukumbi wa Seneti wakati wa mjadala (picha ya Bunge, kwa idhini)"],
      ["PROJECTS-01", "16/9", "2400×1350", "projects", "Joyce visiting an NGAAF-funded women's group project", "Joyce akitembelea mradi wa kikundi cha wanawake uliofadhiliwa na NGAAF"],
      ["MAP-01", "3/2", "1800×1200", "events", "Joyce greeting voters at a polling-day event (2017 or 2022 archive)", "Joyce akiwasalimu wapiga kura (picha za kumbukumbu 2017 au 2022)"],
      ["PLAN-01", "3/2", "1800×1200", "community", "Joyce listening at a women's group meeting", "Joyce akisikiliza katika mkutano wa kikundi cha wanawake"],
      ["STORY-01", "4/5", "1600×2000", "portrait", "Portrait of Joyce, outdoors at a tea farm, three-quarter view", "Picha ya Joyce, nje katika shamba la chai"],
      ["STORY-02", "3/2", "1800×1200", "events", "Archive: Joyce as Mayor of Bomet Municipality (2011–2013), if available", "Kumbukumbu: Joyce akiwa Meya wa Manispaa ya Bomet (2011–2013), ikipatikana"],
      ["COUNTY-01", "16/9", "2400×1350", "community", "Joyce with residents against Bomet's tea hills", "Joyce na wakazi mbele ya milima ya chai ya Bomet"],
      ["CONST-SOTIK", "3/2", "1800×1200", "community", "Joyce in Sotik constituency — market or school visit", "Joyce katika eneo bunge la Sotik — soko au shule"],
      ["CONST-CHEPALUNGU", "3/2", "1800×1200", "community", "Joyce in Chepalungu constituency — community meeting", "Joyce katika eneo bunge la Chepalungu — mkutano wa jamii"],
      ["CONST-BOMET-EAST", "3/2", "1800×1200", "community", "Joyce in Bomet East constituency — women's group", "Joyce katika eneo bunge la Bomet Mashariki — kikundi cha wanawake"],
      ["CONST-BOMET-CENTRAL", "3/2", "1800×1200", "community", "Joyce in Bomet Central — Singorwet or Silibwet", "Joyce katika Bomet ya Kati — Singorwet au Silibwet"],
      ["CONST-KONOIN", "3/2", "1800×1200", "community", "Joyce in Konoin constituency — tea farmers", "Joyce katika eneo bunge la Konoin — wakulima wa chai"],
      ["INVOLVED-01", "3/2", "1800×1200", "events", "Joyce with campaign volunteers", "Joyce na wanaojitolea katika kampeni"],
      ["CONTACT-01", "3/2", "1800×1200", "portrait", "Joyce at her constituency office or a public baraza", "Joyce katika ofisi yake au baraza la umma"],
    ] as const
  ).map(([id, ratio, minSize, category, en, sw]) => ({
    id,
    file: null,
    ratio,
    minSize,
    shot: { en, sw },
    category,
    approvedForPress: false,
    featured: false,
  })),
] as const satisfies readonly Photo[];

export type PhotoId = (typeof photos)[number]["id"];
/** The manifest widened to the Photo interface (optional fields visible). */
export const photoList: readonly (Photo & { id: PhotoId })[] = photos;
export const photoById = Object.fromEntries(photos.map((p) => [p.id, p])) as Record<PhotoId, Photo>;
