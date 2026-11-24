import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { CountdownBand } from "@/components/home/countdown-band";
import { EntryCards } from "@/components/home/entry-cards";
import { Hero } from "@/components/home/hero";
import { JoinCta } from "@/components/home/join-cta";
import { MapPreview } from "@/components/home/map-preview";
import { PlanTeaser } from "@/components/home/plan-teaser";
import { ProjectsHighlight } from "@/components/home/projects-highlight";
import { StatsBand } from "@/components/home/stats-band";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("home", "", { absoluteTitle: true });
}

/** Home — as approved on the design canvas (Hero A). */
export default function HomePage() {
  return (
    <>
      <Hero />
      <CountdownBand />
      <EntryCards />
      <StatsBand />
      <ProjectsHighlight />
      <MapPreview />
      <PlanTeaser />
      <JoinCta />
    </>
  );
}
