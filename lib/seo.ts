import type { Metadata } from "next";
import { locale as rootLocale } from "next/root-params";
import { getTranslations } from "next-intl/server";
import { isLocale, locales, type AppLocale } from "@/i18n/routing";

/** hreflang alternates + canonical for a path (no locale prefix, "" for home). */
export function alternatesFor(path: string, locale: AppLocale): Metadata["alternates"] {
  return {
    canonical: `/${locale}${path}`,
    languages: {
      ...Object.fromEntries(locales.map((l) => [l === "sw" ? "sw-KE" : "en-KE", `/${l}${path}`])),
      "x-default": `/en${path}`,
    },
  };
}

/**
 * Standard page metadata: title from `<ns>.meta.title`, description from
 * `<ns>.intro` when the page has one, canonical, hreflang and Open Graph.
 */
export async function pageMetadata(
  ns: string,
  path: string,
  opts: { title?: string; absoluteTitle?: boolean; noindex?: boolean } = {},
): Promise<Metadata> {
  const seg = await rootLocale();
  const locale: AppLocale = isLocale(seg) ? seg : "en";
  const t = await getTranslations(ns);
  const common = await getTranslations("common.meta");
  const title = opts.title ?? t("meta.title");
  const description = t.has("intro") ? t("intro") : common("description");
  // A page-level openGraph replaces the inherited one, so point at the locale's share card explicitly.
  const image = { url: `/${locale}/opengraph-image`, width: 1200, height: 630, alt: common("siteName") };

  return {
    title: opts.absoluteTitle ? { absolute: title } : title,
    description,
    alternates: alternatesFor(path, locale),
    openGraph: {
      type: "website",
      siteName: common("siteName"),
      title,
      description,
      url: `/${locale}${path}`,
      locale: locale === "sw" ? "sw_KE" : "en_KE",
      alternateLocale: locale === "sw" ? ["en_KE"] : ["sw_KE"],
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
    ...(opts.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
