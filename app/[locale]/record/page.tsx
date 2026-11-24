import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { OfficeLadder } from "@/components/record/office-ladder";
import { SenateFloor } from "@/components/record/senate-floor";
import { SenateStats } from "@/components/record/senate-stats";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { Link } from "@/i18n/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("record.meta");
  return { title: t("title") };
}

export default function RecordPage() {
  const t = useTranslations("record");
  return (
    <>
      <PageHeader kicker={t("kicker")} title={t("title")} intro={t("intro")} photo="RECORD-01" />
      <Container className="flex flex-col gap-16">
        <OfficeLadder />
        <SenateStats />
        <SenateFloor />
        <Link href="/story" className="inline-flex min-h-11 items-center self-start font-semibold">
          {t("timeline.link")} →
        </Link>
      </Container>
    </>
  );
}
