import { getTranslations } from "next-intl/server";
import { LiveCountdown } from "@/components/shared/live-countdown";
import { Link } from "@/i18n/navigation";
import { Brand } from "./brand";
import { LanguageToggle } from "./language-toggle";
import { MobileMenu } from "./mobile-menu";
import { NavDropdown } from "./nav-dropdown";
import { donateHref, primaryNav } from "./nav-items";

const pill =
  "inline-flex min-h-10 items-center rounded-md border border-rule bg-white px-3.5 text-[12.5px] font-semibold tracking-[0.08em] text-ink uppercase no-underline transition-colors hover:border-tea hover:text-tea";

export async function Header() {
  const t = await getTranslations("common");

  return (
    <header className="relative z-30">
      {/* Utility bar: election date + live countdown + language */}
      <div className="bg-tea text-white">
        <div className="mx-auto flex max-w-[1312px] items-center justify-between gap-3 px-4 py-1.5 text-[13px]">
          <Link href="/#countdown" className="flex min-h-9 items-center gap-2 text-white no-underline">
            <span className="hidden font-semibold tracking-[0.12em] uppercase sm:inline">{t("countdown.bar")}</span>
            <span className="text-white/85 sm:hidden">10.08.2027</span>
            <span aria-hidden className="hidden text-accent sm:inline">·</span>
            <LiveCountdown variant="bar" />
          </Link>
          <LanguageToggle className="hidden sm:flex" tone="green" />
        </div>
      </div>

      {/* Main bar */}
      <div className="border-b border-rule bg-white">
        <div className="mx-auto flex max-w-[1312px] items-center justify-between gap-4 px-4 py-3">
          <Brand />
          <nav aria-label={t("nav.label")} className="hidden items-center gap-2 xl:flex">
            {primaryNav.map((e) =>
              "children" in e ? (
                <NavDropdown key={e.key} label={t(`nav.${e.key}`)} items={e.children.map((c) => ({ href: c.href, label: t(`nav.${c.key}`) }))} />
              ) : (
                <Link key={e.key} href={e.href} className={pill}>
                  {t(`nav.${e.key}`)}
                </Link>
              ),
            )}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href={donateHref}
              className="hidden min-h-11 items-center rounded-md bg-accent px-5 text-[13px] font-bold tracking-[0.1em] text-ink uppercase no-underline shadow-sm transition-colors hover:bg-[#e2b53a] sm:inline-flex"
            >
              {t("nav.donate")}
            </Link>
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
