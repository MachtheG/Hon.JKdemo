import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { useTranslations } from "next-intl";
import { PrivacySections } from "@/components/privacy/privacy-sections";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("privacy", "/privacy");
}

export default function PrivacyPage() {
  const t = useTranslations("privacy");
  return (
    <>
      <PageHeader kicker={t("kicker")} title={t("title")} intro={t("intro")} />
      <Container>
        <PrivacySections />
      </Container>
    </>
  );
}
