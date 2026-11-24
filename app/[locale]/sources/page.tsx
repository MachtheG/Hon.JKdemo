import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { SourceList } from "@/components/sources/source-list";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("sources.meta");
  return { title: t("title") };
}

export default function SourcesPage() {
  const t = useTranslations("sources");
  return (
    <>
      <PageHeader kicker={t("kicker")} title={t("title")} intro={t("intro")} />
      <Container>
        <SourceList />
      </Container>
    </>
  );
}
