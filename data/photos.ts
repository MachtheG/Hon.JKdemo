/**
 * Photo manifest. Every slot on the site points at a real file in public/images.
 * Rules: never AI-generate images of the candidate or any real person; scenery
 * (no identifiable people) may come from openly licensed sources. Press photos
 * are credited to their publisher; the campaign must confirm permission (PROGRESS #17).
 * Process new files with `npm run images`. Slot list: docs/SHOT-LIST.md.
 */
export type PhotoCategory = "portrait" | "community" | "parliament" | "projects" | "events" | "landscape";
export type Ratio = "16/9" | "4/5" | "3/2" | "1/1";
type Bi = { en: string; sw: string };

export interface Photo {
  id: string;
  file: string | null;
  ratio: Ratio;
  mobileRatio?: Ratio;
  minSize: string;
  /** The ideal shot for this slot (brief for the campaign photographer). */
  shot: Bi;
  alt?: Bi;
  caption?: Bi;
  /** CSS object-position for cropping, e.g. "30% 20%". */
  focus?: string;
  date?: string;
  location?: string;
  category: PhotoCategory;
  linkedProject?: string;
  credit?: string;
  licence?: string;
  approvedForPress: boolean;
  featured: boolean;
}

/* ── The real images available today ─────────────────────────────────────── */
const IMG = {
  portrait: {
    file: "/images/portrait/joyce-korir-portrait.jpg",
    alt: { en: "Portrait of Hon. Joyce Chepkoech Korir", sw: "Picha ya Mhe. Joyce Chepkoech Korir" },
    credit: "Parliament of Kenya (official portrait, via Mzalendo)",
    licence: "Official portrait — campaign to confirm permission",
    focus: "50% 25%",
  },
  addressing: {
    file: "/images/events/joyce-korir-addressing-residents.jpg",
    alt: { en: "Joyce Korir addressing residents at a public gathering", sw: "Joyce Korir akihutubia wakazi katika mkutano wa hadhara" },
    credit: "Kenyans.co.ke",
    licence: "Press photo — campaign to confirm permission",
    focus: "38% 30%",
  },
  speaking: {
    file: "/images/events/joyce-korir-speaking-gathering.jpg",
    alt: { en: "Joyce Korir speaking at a community gathering", sw: "Joyce Korir akizungumza katika mkutano wa jamii" },
    credit: "Kenyans.co.ke",
    licence: "Press photo — campaign to confirm permission",
    focus: "55% 25%",
  },
  oath: {
    file: "/images/parliament/joyce-korir-psc-oath-2022.jpg",
    alt: {
      en: "Senator Joyce Korir taking the oath as a Parliamentary Service Commissioner, November 2022",
      sw: "Seneta Joyce Korir akila kiapo kama Kamishna wa Tume ya Huduma za Bunge, Novemba 2022",
    },
    credit: "Parliament of Kenya",
    licence: "Official Parliament photo — campaign to confirm permission",
    focus: "48% 30%",
    date: "2022-11-10",
  },
  tea: {
    file: "/images/landscape/bomet-tea-fields.jpg",
    alt: { en: "Tea fields in Bomet County", sw: "Mashamba ya chai katika Kaunti ya Bomet" },
    credit: "Kipkorir Cheruiyot / Wikimedia Commons",
    licence: "CC BY-SA 4.0",
    focus: "50% 60%",
  },
  dairy: {
    file: "/images/landscape/bomet-dairy-farm.jpg",
    alt: { en: "A dairy farm in Bomet County", sw: "Shamba la ng'ombe wa maziwa katika Kaunti ya Bomet" },
    credit: "Korirhilla / Wikimedia Commons",
    licence: "CC BY-SA 4.0",
    focus: "50% 50%",
  },
  forest: {
    file: "/images/landscape/mau-forest.jpg",
    alt: { en: "The Mau Forest, which borders Bomet County", sw: "Msitu wa Mau, unaopakana na Kaunti ya Bomet" },
    credit: "Kaa.rie / Wikimedia Commons",
    licence: "CC BY-SA 4.0",
    focus: "50% 40%",
  },
} as const;

type Img = (typeof IMG)[keyof typeof IMG];
const slot = (
  id: string,
  ratio: Ratio,
  minSize: string,
  category: PhotoCategory,
  shot: Bi,
  img: Img,
  extra: Partial<Photo> = {},
) => ({ id, ratio, minSize, category, shot, approvedForPress: false, featured: false, ...img, ...extra });

export const photos = [
  slot("HERO-01", "16/9", "2880×1620", "portrait", { en: "Joyce with women traders at a Bomet market", sw: "Joyce na wafanyabiashara wanawake sokoni Bomet" }, IMG.addressing, { mobileRatio: "4/5", featured: true }),
  slot("CARD-WHO", "3/2", "1800×1200", "portrait", { en: "Joyce in Singorwet ward", sw: "Joyce katika wadi ya Singorwet" }, IMG.portrait),
  slot("CARD-RECORD", "3/2", "1800×1200", "parliament", { en: "Joyce in the Senate", sw: "Joyce katika Seneti" }, IMG.oath),
  slot("CARD-NEXT", "3/2", "1800×1200", "community", { en: "Joyce at a women's group meeting", sw: "Joyce katika mkutano wa kikundi cha wanawake" }, IMG.speaking),
  slot("HOME-PROJECTS", "3/2", "1800×1200", "landscape", { en: "An NGAAF women's group project", sw: "Mradi wa kikundi cha wanawake wa NGAAF" }, IMG.dairy),
  slot("HOME-PLAN", "4/5", "1200×1500", "landscape", { en: "Joyce with teachers at an ECDE centre", sw: "Joyce na walimu katika kituo cha ECDE" }, IMG.tea),
  slot("HOME-JOIN", "4/5", "1200×1500", "events", { en: "Joyce with campaign volunteers", sw: "Joyce na wanaojitolea" }, IMG.speaking),
  slot("RECORD-01", "16/9", "2400×1350", "parliament", { en: "Joyce in the Senate chamber", sw: "Joyce katika ukumbi wa Seneti" }, IMG.oath),
  slot("PROJECTS-01", "16/9", "2400×1350", "landscape", { en: "An NGAAF-funded project", sw: "Mradi uliofadhiliwa na NGAAF" }, IMG.dairy),
  slot("MAP-01", "3/2", "1800×1200", "landscape", { en: "Bomet County landscape", sw: "Mandhari ya Kaunti ya Bomet" }, IMG.tea),
  slot("PLAN-01", "3/2", "1800×1200", "events", { en: "Joyce listening at a women's group", sw: "Joyce akisikiliza kikundi cha wanawake" }, IMG.addressing),
  slot("STORY-01", "4/5", "1600×2000", "portrait", { en: "Portrait of Joyce", sw: "Picha ya Joyce" }, IMG.portrait),
  slot("STORY-02", "3/2", "1800×1200", "parliament", { en: "Joyce in public office", sw: "Joyce katika uongozi wa umma" }, IMG.oath),
  slot("COUNTY-01", "16/9", "2400×1350", "landscape", { en: "Bomet's tea hills", sw: "Milima ya chai ya Bomet" }, IMG.tea),
  slot("CONST-SOTIK", "3/2", "1800×1200", "landscape", { en: "Sotik constituency", sw: "Eneo bunge la Sotik" }, IMG.tea),
  slot("CONST-CHEPALUNGU", "3/2", "1800×1200", "landscape", { en: "Chepalungu constituency", sw: "Eneo bunge la Chepalungu" }, IMG.dairy),
  slot("CONST-BOMET-EAST", "3/2", "1800×1200", "landscape", { en: "Bomet East constituency", sw: "Eneo bunge la Bomet Mashariki" }, IMG.forest),
  slot("CONST-BOMET-CENTRAL", "3/2", "1800×1200", "events", { en: "Bomet Central constituency", sw: "Bomet ya Kati" }, IMG.addressing),
  slot("CONST-KONOIN", "3/2", "1800×1200", "landscape", { en: "Konoin constituency", sw: "Eneo bunge la Konoin" }, IMG.forest),
  slot("INVOLVED-01", "3/2", "1800×1200", "events", { en: "Joyce with volunteers", sw: "Joyce na wanaojitolea" }, IMG.speaking),
  slot("CONTACT-01", "3/2", "1800×1200", "portrait", { en: "Joyce at a public baraza", sw: "Joyce katika baraza la umma" }, IMG.portrait),
] as const satisfies readonly Photo[];

export type PhotoId = (typeof photos)[number]["id"];
export const photoById = Object.fromEntries(photos.map((p) => [p.id, p])) as Record<PhotoId, Photo>;
/** The manifest widened to the Photo interface (optional fields visible). */
export const photoList: readonly (Photo & { id: PhotoId })[] = photos;
/** Each distinct image once — for the gallery and credits. */
export const uniqueImages = Object.values(IMG);
