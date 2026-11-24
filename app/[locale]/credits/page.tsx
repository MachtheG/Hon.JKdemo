import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { useTranslations } from "next-intl";
import { CreditList } from "@/components/credits/credit-list";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("credits", "/credits");
}

export default function CreditsPage() {
  const t = useTranslations("credits");
  return (
    <>
      <PageHeader kicker={t("kicker")} title={t("title")} intro={t("intro")} />
      <Container>
        <CreditList />
      </Container>
    </>
  );
}
