import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { locales } from "@/i18n/routing";
import { bometCentralWards } from "@/data/bomet-central";
import { CONSTITUENCIES } from "@/lib/projects";
import { SITE_URL } from "@/lib/site";

const paths = [
  "",
  "/record",
  "/projects",
  "/map",
  "/plan",
  "/story",
  "/bomet-central",
  ...bometCentralWards.map((w) => `/bomet-central/${w.slug}`),
  "/bomet",
  ...CONSTITUENCIES.map((c) => `/bomet/${c.slug}`),
  ...projects.map((p) => `/projects/${p.id}`),
  "/gallery",
  "/news",
  "/get-involved",
  "/donate",
  "/contact",
  "/privacy",
  "/sources",
  "/credits",
];

/** Every page in both languages, each with its hreflang alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      changeFrequency: path === "" || path === "/news" ? "weekly" : "monthly",
      priority: path === "" ? 1 : path.split("/").length > 2 ? 0.5 : 0.8,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l === "sw" ? "sw-KE" : "en-KE", `${SITE_URL}/${l}${path}`])),
      },
    })),
  );
}
