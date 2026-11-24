import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { HomePlaceholder } from "@/components/home/home-placeholder";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("home.meta");
  return { title: t("title") };
}

/** Phase 4 shell. The approved home (Hero A) is built in Phase 5. */
export default function HomePage() {
  return <HomePlaceholder />;
}
