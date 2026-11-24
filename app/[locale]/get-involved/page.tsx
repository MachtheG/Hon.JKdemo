import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { PledgeForm } from "@/components/forms/pledge-form";
import { VolunteerForm } from "@/components/forms/volunteer-form";
import { InvolveSection } from "@/components/get-involved/involve-section";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("getInvolved", "/get-involved");
}

export default function GetInvolvedPage() {
  const t = useTranslations("getInvolved");
  return (
    <>
      <PageHeader kicker={t("kicker")} title={t("title")} intro={t("intro")} photo="INVOLVED-01" />
      <Container className="flex flex-col">
        <InvolveSection id="pledge" n={1} title={t("pledge.title")} body={t("pledge.body")}>
          <PledgeForm />
        </InvolveSection>
        <InvolveSection id="volunteer" n={2} title={t("volunteer.title")} body={t("volunteer.body")}>
          <VolunteerForm />
        </InvolveSection>
        <InvolveSection id="whatsapp" n={3} title={t("whatsapp.title")} body={t("whatsapp.body")}>
          <p className="m-0 font-mono text-sm">{t("whatsapp.pending")}</p>
        </InvolveSection>
      </Container>
    </>
  );
}
