import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export function HomePlaceholder() {
  const t = useTranslations("home.placeholder");
  return (
    <section className="tea-rows flex min-h-[70dvh] items-end text-paper">
      <div className="mx-auto w-full max-w-[1312px] px-4 pb-12">
        <div className="flex max-w-2xl flex-col gap-4 bg-ink/90 p-6 sm:p-10">
          <span className="font-mono text-xs tracking-[0.14em] text-accent uppercase">{t("kicker")}</span>
          <h1 className="m-0 font-display text-5xl leading-none font-semibold sm:text-7xl">{t("title")}</h1>
          <p className="m-0 text-lg text-mist">{t("body")}</p>
          <Button asChild variant="accent" className="self-start">
            <Link href="/styleguide">{t("styleguide")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
