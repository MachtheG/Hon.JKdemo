import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { DonatePanel } from "@/components/donate/donate-panel";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("donate", "/donate");
}

export default function DonatePage() {
  const t = useTranslations("donate");
  return (
    <>
      <PageHeader kicker={t("kicker")} title={t("title")} intro={t("intro")} photo="INVOLVED-01" />
      <Container>
        <DonatePanel />
      </Container>
    </>
  );
}
