import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { ElectionMap } from "@/components/map/election-map";
import { ResultsTable } from "@/components/map/results-table";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { SourceTick } from "@/components/shared/source-tick";
import { Link } from "@/i18n/navigation";
import { county2017 } from "@/lib/election-results";
import { formatNumber } from "@/lib/format";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("map.meta");
  return { title: t("title") };
}

export default function MapPage() {
  const t = useTranslations("map");
  return (
    <>
      <PageHeader
        kicker={t("kicker")}
        title={t("title")}
        photo="MAP-01"
        intro={
          <p className="m-0">
            {t("summary", { votes: formatNumber(county2017.votes), share: county2017.share })}
            <SourceTick id="iebc-data-report-2017" />
          </p>
        }
      />
      <Container className="flex flex-col gap-14">
        <ElectionMap />
        <ResultsTable />
        <p className="m-0 text-sm text-muted">
          {t("boundaries")}{" "}
          <Link href="/credits" className="underline">
            {t("creditsLink")}
          </Link>
        </p>
      </Container>
    </>
  );
}
