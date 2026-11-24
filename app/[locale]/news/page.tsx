import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { NewsList } from "@/components/news/news-list";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("news.meta");
  return { title: t("title") };
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
