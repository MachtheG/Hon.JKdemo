"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useId, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageToggle } from "./language-toggle";
import { allLinks, donateHref } from "./nav-items";

/** Menu below xl: every link, Donate and the language switch. */
export function MobileMenu() {
  const t = useTranslations("common.nav");
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname; // closes itself on navigation
  const panelId = useId();

  return (
    <div className="xl:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? t("closeMenu") : t("openMenu")}
        onClick={() => setOpenPath(open ? null : pathname)}
        className="inline-flex size-11 items-center justify-center rounded-md border border-rule bg-white text-ink hover:border-tea hover:text-tea"
      >
        {open ? <X aria-hidden size={20} /> : <Menu aria-hidden size={20} />}
      </button>
      <div id={panelId} hidden={!open} className="absolute inset-x-0 top-full z-40 border-t border-rule bg-white px-4 pt-2 pb-6 shadow-2xl">
        <ul className="mx-auto grid max-w-[1312px] list-none gap-x-8 p-0 sm:grid-cols-2">
          <li>
            <Link href="/" className="flex min-h-12 items-center border-b border-rule font-display text-lg font-medium text-ink no-underline">
              {t("home")}
            </Link>
          </li>
          {allLinks.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className="flex min-h-12 items-center border-b border-rule font-display text-lg font-medium text-ink no-underline aria-[current=page]:text-tea"
              >
                {t(item.key)}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/privacy" className="flex min-h-12 items-center border-b border-rule font-display text-lg font-medium text-ink no-underline">
              {t("privacy")}
            </Link>
          </li>
        </ul>
        <div className="mx-auto mt-5 flex max-w-[1312px] items-center justify-between gap-4">
          <Link href={donateHref} className="inline-flex min-h-12 items-center rounded-md bg-accent px-6 font-bold tracking-[0.08em] text-ink uppercase no-underline">
            {t("donate")}
          </Link>
          <LanguageToggle />
        </div>
      </div>
    </div>
  );
}
