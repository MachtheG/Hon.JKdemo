import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { useTranslations } from "next-intl";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { SourceList } from "@/components/sources/source-list";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("sources", "/sources");
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
