import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ProjectDetail } from "@/components/projects/project-detail";
import { projects } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";

/** Cache Components needs ≥1 param; "__none" is a placeholder that 404s until real projects exist. */
const PLACEHOLDER = "__none";

export function generateStaticParams() {
  return projects.length ? projects.map((p) => ({ id: p.id })) : [{ id: PLACEHOLDER }];
}

export async function generateMetadata({ params }: PageProps<"/[locale]/projects/[id]">): Promise<Metadata> {
  const { id } = await params;
  const p = projects.find((x) => x.id === id);
  const t = await getTranslations("projects.meta");
  return pageMetadata("projects", `/projects/${id}`, { title: p ? `${p.name} · ${t("title")}` : t("title"), noindex: !p });
}

export default async function ProjectPage({ params }: PageProps<"/[locale]/projects/[id]">) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
