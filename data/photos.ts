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
] as const satisfies readonly Photo[];

export type PhotoId = (typeof photos)[number]["id"];
export const photoById = Object.fromEntries(photos.map((p) => [p.id, p])) as Record<PhotoId, Photo>;
