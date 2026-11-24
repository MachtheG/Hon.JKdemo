import { useTranslations } from "next-intl";
import { Photo } from "@/components/shared/photo";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export function JoinCta() {
  const t = useTranslations("home.join");

  return (
    <section aria-labelledby="join-title" className="bg-accent text-ink">
      <div className="mx-auto grid max-w-[1312px] items-center gap-8 px-4 py-14 sm:py-18 lg:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-5">
          <h2 id="join-title" className="m-0 font-display text-[32px] leading-none font-bold sm:text-[56px]">
            {t("title")}
          </h2>
          <p className="m-0 max-w-xl text-lg">{t("body")}</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild variant="ink" size="lg">
              <Link href="/get-involved#pledge">{t("pledge")}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2">
              <Link href="/get-involved#volunteer">{t("volunteer")}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2">
              <Link href="/get-involved#whatsapp">{t("whatsapp")}</Link>
            </Button>
          </div>
        </div>
        <Photo id="HOME-JOIN" sizes="(min-width: 1024px) 33vw, 320px" className="w-full max-w-xs lg:max-w-none" />
      </div>
    </section>
  );
}
