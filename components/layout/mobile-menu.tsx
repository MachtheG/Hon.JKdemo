"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useId, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { navItems } from "./nav-items";

/** Full menu: a disclosure on mobile, and the overflow menu on desktop. */
export function MobileMenu() {
  const t = useTranslations("common.nav");
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname; // closes itself on navigation
  const panelId = useId();

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? t("closeMenu") : t("openMenu")}
        onClick={() => setOpenPath(open ? null : pathname)}
        className="inline-flex size-11 items-center justify-center rounded-full border border-mist/60 text-paper hover:bg-paper/10"
      >
        {open ? <X aria-hidden size={20} /> : <Menu aria-hidden size={20} />}
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full z-40 border-t border-tea bg-ink px-4 pt-2 pb-6 shadow-xl"
      >
        <ul className="mx-auto grid max-w-[1312px] gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          <li>
            <Link href="/" className="flex min-h-12 items-center border-b border-tea text-lg text-paper no-underline">
              {t("home")}
            </Link>
          </li>
          {navItems.map((item) => (
            <li key={item.key}>
              <Link
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className="flex min-h-12 items-center border-b border-tea text-lg text-paper no-underline aria-[current=page]:text-accent"
              >
                {t(item.key)}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/privacy" className="flex min-h-12 items-center border-b border-tea text-lg text-paper no-underline">
              {t("privacy")}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
