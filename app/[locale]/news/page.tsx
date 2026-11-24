import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { useTranslations } from "next-intl";
import { NewsList } from "@/components/news/news-list";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("news", "/news");
}

export default function NewsPage() {
  const t = useTranslations("news");
  return (
    <>
      <PageHeader kicker={t("kicker")} title={t("title")} intro={t("intro")} />
      <Container>
        <NewsList />
      </Container>
    </>
  );
}
