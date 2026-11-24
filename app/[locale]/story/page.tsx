import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { Photo } from "@/components/shared/photo";
import { Timeline } from "@/components/story/timeline";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("story.meta");
  return { title: t("title") };
}

export default function StoryPage() {
  const t = useTranslations("story");
  return (
    <>
      <PageHeader kicker={t("kicker")} title={t("title")} intro={t("intro")} photo="STORY-01" />
      <Container className="grid gap-12 lg:grid-cols-[2fr_1fr]">
        <Timeline />
        <figure className="m-0 flex flex-col gap-2 self-start">
          <Photo id="STORY-02" sizes="(min-width: 1024px) 33vw, 100vw" />
          <figcaption className="text-sm text-muted">{t("archive")}</figcaption>
        </figure>
      </Container>
    </>
  );
}
