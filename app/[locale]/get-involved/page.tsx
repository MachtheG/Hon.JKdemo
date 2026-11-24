import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { PledgeForm } from "@/components/forms/pledge-form";
import { VolunteerForm } from "@/components/forms/volunteer-form";
import { InvolveSection } from "@/components/get-involved/involve-section";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { ConfirmText } from "@/components/shared/to-confirm";
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
          <div className="flex flex-wrap items-center gap-4">
            <span aria-disabled="true" className="inline-flex min-h-12 items-center border-2 border-dashed border-text/50 px-5 font-semibold text-muted">
              {t("whatsapp.soon")}
            </span>
            <a href="#pledge" className="inline-flex min-h-11 items-center font-semibold">
              {t("whatsapp.instead")} →
            </a>
          </div>
          <p className="m-0 text-sm">
            <ConfirmText text={t("whatsapp.pending")} />
          </p>
        </InvolveSection>
      </Container>
    </>
  );
}
