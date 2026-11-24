import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Suspense } from "react";
import { ProjectsEmptyState } from "@/components/projects/empty-state";
import { ProjectsView } from "@/components/projects/projects-view";
import { RoleKey } from "@/components/projects/role-key";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("projects.meta");
  return { title: t("title") };
}

export default function ProjectsPage() {
  const t = useTranslations("projects");
  return (
    <>
      <PageHeader kicker={t("kicker")} title={t("title")} intro={t("intro")} photo="PROJECTS-01" />
      <Container className="grid gap-12 lg:grid-cols-[3fr_1fr]">
        {/* Filters read the URL, so they render on the client; the static shell shows the empty state. */}
        <Suspense fallback={<ProjectsEmptyState />}>
          <ProjectsView emptyState={<ProjectsEmptyState />} />
        </Suspense>
        <RoleKey />
      </Container>
    </>
  );
}
