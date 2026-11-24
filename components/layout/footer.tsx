import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ConfirmText } from "@/components/shared/to-confirm";
import { Brand } from "./brand";
import { LiteModeToggle } from "./lite-mode-toggle";
import { allLinks, donateHref } from "./nav-items";

const CAMPAIGN_YEAR = 2027;

export async function Footer() {
  const t = await getTranslations("common");

  return (
    <footer className="bg-ink text-white/80">
      <div className="mx-auto grid max-w-[1312px] gap-10 px-4 py-14 text-[15px] md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <Brand tone="light" />
          <p className="m-0 max-w-sm">{t("footer.tagline")}</p>
          <p className="m-0 text-sm">
            <ConfirmText text={t("footer.party")} tone="ink" />
          </p>
          <Link href={donateHref} className="inline-flex min-h-11 w-fit items-center rounded-md bg-accent px-5 text-[13px] font-bold tracking-[0.1em] text-ink uppercase no-underline">
            {t("nav.donate")}
          </Link>
        </div>
        <nav aria-label={t("footer.explore")}>
          <ul className="m-0 grid list-none grid-cols-2 gap-x-6 p-0 md:grid-cols-1">
            {allLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="flex min-h-10 items-center text-white/90 no-underline hover:text-accent">
                  {t(`nav.${l.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col gap-3">
          <ul className="m-0 flex list-none flex-col p-0">
            <li>
              <Link href="/sources" className="flex min-h-10 items-center text-white/90 no-underline hover:text-accent">
                {t("footer.sources")}
              </Link>
            </li>
            <li>
              <Link href="/credits" className="flex min-h-10 items-center text-white/90 no-underline hover:text-accent">
                {t("footer.credits")}
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="flex min-h-10 items-center text-white/90 no-underline hover:text-accent">
                {t("footer.privacy")}
              </Link>
            </li>
          </ul>
          <LiteModeToggle />
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1312px] flex-col gap-2 px-4 py-5 text-[13px] text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <span>
            <ConfirmText text={t("footer.authorisedBy")} tone="ink" />
            {t("footer.copyright", { year: CAMPAIGN_YEAR })}
          </span>
          <span>{t("footer.honesty")}</span>
        </div>
      </div>
    </footer>
  );
}
