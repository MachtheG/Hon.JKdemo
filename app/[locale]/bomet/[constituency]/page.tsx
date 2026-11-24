import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ConstituencyDetail } from "@/components/county/constituency-detail";
import { CONSTITUENCIES } from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return CONSTITUENCIES.map((c) => ({ constituency: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/bomet/[constituency]">): Promise<Metadata> {
  const { constituency } = await params;
  const c = CONSTITUENCIES.find((x) => x.slug === constituency);
  const t = await getTranslations("county.meta");
  return pageMetadata("county", `/bomet/${constituency}`, { title: c ? `${c.name} · ${t("title")}` : t("title") });
}

export default async function ConstituencyPage({ params }: PageProps<"/[locale]/bomet/[constituency]">) {
  const { constituency } = await params;
  const c = CONSTITUENCIES.find((x) => x.slug === constituency);
  if (!c) notFound();
  return <ConstituencyDetail slug={c.slug} name={c.name} />;
}
