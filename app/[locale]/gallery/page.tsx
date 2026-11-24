import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("gallery.meta");
  return { title: t("title") };
}

export default function GalleryPage() {
  const t = useTranslations("gallery");
  return (
    <>
      <PageHeader kicker={t("kicker")} title={t("title")} intro={t("intro")} />
      <Container>
        <GalleryGrid />
      </Container>
    </>
  );
}
