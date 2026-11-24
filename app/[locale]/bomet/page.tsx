import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { ConstituencyCards } from "@/components/county/constituency-cards";
import { CountyStats } from "@/components/county/county-stats";
import { MiniMap } from "@/components/county/mini-map";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { Link } from "@/i18n/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("county.meta");
  return { title: t("title") };
}

export default function CountyPage() {
  const t = useTranslations("county");
  return (
    <>
      <PageHeader kicker={t("kicker")} title={t("title")} intro={t("intro")} photo="COUNTY-01" />
      <Container className="flex flex-col gap-16">
        <div className="grid items-start gap-10 lg:grid-cols-[3fr_2fr]">
          <CountyStats />
          <MiniMap label={t("meta.title")} />
        </div>
        <ConstituencyCards />
        <aside className="flex flex-col gap-3 bg-ink p-6 text-paper sm:p-8">
          <h2 className="m-0 font-display text-2xl font-semibold">{t("ngaaf.title")}</h2>
          <p className="m-0 max-w-3xl text-mist">{t("ngaaf.body")}</p>
          <Link href="/projects" className="inline-flex min-h-11 items-center self-start font-semibold text-paper">
            {t("ngaaf.link")} →
          </Link>
        </aside>
      </Container>
    </>
  );
}
