/** Site navigation, grouped as in the reference design. Keys are translation keys under common.nav. */
export type NavLink = { key: string; href: string };
export type NavEntry = NavLink | { key: string; children: NavLink[] };

export const primaryNav: NavEntry[] = [
  { key: "story", href: "/story" },
  { key: "record", href: "/record" },
  { key: "plan", href: "/plan" },
  {
    key: "county",
    children: [
      { key: "countyPage", href: "/bomet/bomet-central" },
      { key: "countyAll", href: "/bomet" },
      { key: "map", href: "/map" },
      { key: "projects", href: "/projects" },
    ],
  },
  {
    key: "getInvolved",
    children: [
      { key: "pledge", href: "/get-involved#pledge" },
      { key: "volunteer", href: "/get-involved#volunteer" },
      { key: "news", href: "/news" },
      { key: "gallery", href: "/gallery" },
      { key: "contact", href: "/contact" },
    ],
  },
];

export const donateHref = "/donate";

/** Flat list for the mobile menu. */
export const allLinks: NavLink[] = primaryNav.flatMap((e) => ("children" in e ? e.children : [e]));
