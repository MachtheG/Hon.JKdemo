import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LiteModeToggle } from "./lite-mode-toggle";

const CAMPAIGN_YEAR = 2027;

export async function Footer() {
  const t = await getTranslations("common.footer");

  return (
    <footer className="bg-ink text-mist">
      <div className="mx-auto grid max-w-[1312px] gap-8 px-4 py-12 text-sm sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-1.5">
          <span className="font-display text-2xl text-paper">Joyce Korir · 2027</span>
          <span>{t("tagline")}</span>
          <span>{t("party")}</span>
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-xs text-accent">{t("authorisedBy")}</span>
          <span>{t("honesty")}</span>
        </div>
        <ul className="flex flex-col">
          <li>
            <Link href="/credits" className="flex min-h-11 items-center text-paper">
              {t("credits")}
            </Link>
          </li>
          <li>
            <Link href="/sources" className="flex min-h-11 items-center text-paper">
              {t("sources")}
            </Link>
          </li>
          <li>
            <Link href="/privacy" className="flex min-h-11 items-center text-paper">
              {t("privacy")}
            </Link>
          </li>
        </ul>
        <div className="flex flex-col gap-3">
          <LiteModeToggle />
          <span>{t("copyright", { year: CAMPAIGN_YEAR })}</span>
        </div>
      </div>
    </footer>
  );
}
