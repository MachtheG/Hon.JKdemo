import { defineRouting } from "next-intl/routing";

export const locales = ["en", "sw"] as const;
export type AppLocale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "always",
});

/**
 * One message file per tab: messages/<locale>/<namespace>.json.
 * Add a namespace here when a new tab is created.
 */
export const namespaces = [
  "common",
  "home",
  "styleguide",
  "record",
  "projects",
  "map",
  "plan",
  "story",
  "county",
  "gallery",
  "news",
  "getInvolved",
  "contact",
  "privacy",
  "sources",
  "credits",
] as const;
export type Namespace = (typeof namespaces)[number];

export function isLocale(value: string | undefined): value is AppLocale {
  return !!value && (locales as readonly string[]).includes(value);
}
