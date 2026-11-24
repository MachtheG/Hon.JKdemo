import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { ContactDetails } from "@/components/contact/contact-details";
import { ContactForm } from "@/components/forms/contact-form";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("contact", "/contact");
}

export default function ContactPage() {
  const t = useTranslations("contact");
  return (
    <>
      <PageHeader kicker={t("kicker")} title={t("title")} intro={t("intro")} photo="CONTACT-01" />
      <Container className="grid gap-12 lg:grid-cols-[1fr_2fr]">
        <ContactDetails />
        <ContactForm />
      </Container>
    </>
  );
}
