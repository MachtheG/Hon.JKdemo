import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { HubStats } from "@/components/bomet-central/hub-stats";
import { NgcdfAllocations } from "@/components/bomet-central/ngcdf-allocations";
import { NgcdfProjects } from "@/components/bomet-central/ngcdf-projects";
import { WardCards } from "@/components/bomet-central/ward-cards";
import { MiniMap } from "@/components/county/mini-map";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("constituency", "/bomet-central");
}

/** "My Constituency": the seat Joyce is contesting in 2027. */
export default function BometCentralPage() {
  const t = useTranslations("constituency");
  return (
    <>
      <PageHeader kicker={t("kicker")} title={t("title")} intro={t("intro")} photo="CONST-BOMET-CENTRAL" />
      <Container className="flex flex-col gap-20">
        <div className="grid items-start gap-10 lg:grid-cols-[3fr_2fr]">
          <HubStats />
          <div className="overflow-hidden rounded-xl ring-4 ring-accent/60">
            <MiniMap highlight="bomet-central" label={t("meta.title")} />
          </div>
        </div>
        <WardCards />
        <NgcdfAllocations />
        <NgcdfProjects />
      </Container>
    </>
  );
}
