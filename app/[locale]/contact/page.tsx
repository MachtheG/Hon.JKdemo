import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { ContactDetails } from "@/components/contact/contact-details";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("contact.meta");
  return { title: t("title") };
}

export default function ContactPage() {
  const t = useTranslations("contact");
  return (
    <>
      <PageHeader kicker={t("kicker")} title={t("title")} intro={t("intro")} photo="CONTACT-01" />
      <Container className="grid gap-10 lg:grid-cols-2">
        <ContactDetails />
        <p className="m-0 self-start border border-dashed border-laterite-ink p-4 font-mono text-sm text-laterite-ink">{t("soon")}</p>
      </Container>
    </>
  );
}
