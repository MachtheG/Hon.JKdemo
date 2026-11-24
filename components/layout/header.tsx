import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CountdownPill } from "./countdown-pill";
import { LanguageToggle } from "./language-toggle";
import { MobileMenu } from "./mobile-menu";
import { navItems } from "./nav-items";

export async function Header() {
  const t = await getTranslations("common");

  return (
    <header className="relative z-30 bg-ink text-paper">
      <div className="mx-auto flex max-w-[1312px] items-center justify-between gap-3 px-4 py-2.5">
        <Link href="/" className="flex flex-col leading-tight text-paper no-underline sm:flex-row sm:items-baseline sm:gap-3">
          <span className="font-display text-xl font-bold sm:text-2xl">{t("brand.name")}</span>
          <span className="hidden font-mono text-xs tracking-[0.12em] text-mist uppercase sm:inline">
            {t("brand.office")}
          </span>
        </Link>

        <nav aria-label={t("nav.label")} className="hidden xl:block">
          <ul className="flex gap-6 text-[15px]">
            {navItems
              .filter((item) => item.primary)
              .map((item) => (
                <li key={item.key}>
                  <Link href={item.href} className="text-paper no-underline hover:text-accent">
                    {t(`nav.${item.key}`)}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <CountdownPill />
          <LanguageToggle className="hidden sm:flex" />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
