/** Site tabs. `primary` items show in the desktop bar; all show in the menu. */
export const navItems = [
  { key: "record", href: "/record", primary: true },
  { key: "projects", href: "/projects", primary: true },
  { key: "map", href: "/map", primary: true },
  { key: "plan", href: "/plan", primary: true },
  { key: "story", href: "/story", primary: true },
  { key: "county", href: "/bomet", primary: true },
  { key: "gallery", href: "/gallery", primary: false },
  { key: "news", href: "/news", primary: false },
  { key: "getInvolved", href: "/get-involved", primary: false },
  { key: "contact", href: "/contact", primary: false },
] as const;

export type NavKey = (typeof navItems)[number]["key"];
