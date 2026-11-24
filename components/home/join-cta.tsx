import { useTranslations } from "next-intl";
import { donateHref } from "@/components/layout/nav-items";
import { Photo } from "@/components/shared/photo";
import { Link } from "@/i18n/navigation";

/** Closing call to action: full-bleed photo of Joyce under a green overlay. */
export function JoinCta() {
  const t = useTranslations("home.join");
  const btn = "inline-flex min-h-12 items-center justify-center rounded-md px-6 font-semibold no-underline transition-colors";

  return (
    <section aria-labelledby="join-title" className="relative isolate overflow-hidden text-white">
      <Photo id="HOME-JOIN" fill sizes="100vw" rounded={false} className="-z-10" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[#0a3d24]/85" />
      <div className="mx-auto flex max-w-[1312px] flex-col items-center gap-6 px-4 py-24 text-center">
        <div className="tea-rule" aria-hidden />
        <h2 id="join-title" className="m-0 font-display text-[38px] leading-tight font-bold sm:text-[56px]">
          {t("title")}
        </h2>
        <p className="m-0 max-w-2xl text-lg text-white/85">{t("body")}</p>
        <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <Link href="/get-involved#pledge" className={`${btn} bg-accent text-ink hover:bg-[#e2b53a]`}>
            {t("pledge")}
          </Link>
          <Link href="/get-involved#volunteer" className={`${btn} border-2 border-white text-white hover:bg-white hover:text-ink`}>
            {t("volunteer")}
          </Link>
          <Link href={donateHref} className={`${btn} border-2 border-accent text-accent hover:bg-accent hover:text-ink`}>
            {t("donate")}
          </Link>
        </div>
      </div>
    </section>
  );
}
