import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WardDetail } from "@/components/bomet-central/ward-detail";
import { bometCentralWards } from "@/data/bomet-central";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return bometCentralWards.map((w) => ({ ward: w.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/bomet-central/[ward]">): Promise<Metadata> {
  const { ward } = await params;
  const w = bometCentralWards.find((x) => x.slug === ward);
  return pageMetadata("constituency", `/bomet-central/${ward}`, { title: w ? `${w.name} · Bomet Central` : "Bomet Central" });
}

export default async function WardPage({ params }: PageProps<"/[locale]/bomet-central/[ward]">) {
  const { ward } = await params;
  const w = bometCentralWards.find((x) => x.slug === ward);
  if (!w) notFound();
  return <WardDetail ward={w} />;
}
