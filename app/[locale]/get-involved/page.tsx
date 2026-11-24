import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { InvolveSection } from "@/components/get-involved/involve-section";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { Link } from "@/i18n/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("getInvolved.meta");
  return { title: t("title") };
}

export default function GetInvolvedPage() {
  const t = useTranslations("getInvolved");
  const soon = <p className="m-0 border border-dashed border-laterite-ink p-4 font-mono text-sm text-laterite-ink">{t("soon")}</p>;
  return (
    <>
      <PageHeader kicker={t("kicker")} title={t("title")} intro={t("intro")} photo="INVOLVED-01" />
      <Container className="flex flex-col">
        <InvolveSection id="pledge" n={1} title={t("pledge.title")} body={t("pledge.body")}>
          {soon}
        </InvolveSection>
        <InvolveSection id="volunteer" n={2} title={t("volunteer.title")} body={t("volunteer.body")}>
          {soon}
        </InvolveSection>
        <InvolveSection id="whatsapp" n={3} title={t("whatsapp.title")} body={t("whatsapp.body")}>
          <p className="m-0 font-mono text-sm">{t("whatsapp.pending")}</p>
        </InvolveSection>
        <p className="m-0 border-t border-rule pt-6 text-sm text-muted">
          <Link href="/privacy" className="underline">
            {t("privacy")}
          </Link>
        </p>
      </Container>
    </>
  );
}
