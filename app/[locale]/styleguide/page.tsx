import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { ButtonSamples } from "@/components/styleguide/button-samples";
import { ColourSwatches } from "@/components/styleguide/colour-swatches";
import { MotifSamples } from "@/components/styleguide/motif-samples";
import { PhotoSamples } from "@/components/styleguide/photo-samples";
import { Section } from "@/components/styleguide/section";
import { StatSamples } from "@/components/styleguide/stat-samples";
import { TypeSpecimen } from "@/components/styleguide/type-specimen";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("styleguide.meta");
  return { title: t("title"), robots: { index: false } };
}

export default function StyleguidePage() {
  const t = useTranslations("styleguide");
  return (
    <div className="mx-auto flex max-w-[1312px] flex-col gap-16 px-4 py-14">
      <header className="flex flex-col gap-3">
        <h1 className="m-0 font-display text-5xl font-semibold sm:text-7xl">{t("title")}</h1>
        <p className="m-0 max-w-2xl text-lg text-muted">{t("intro")}</p>
      </header>
      <Section title={t("sections.colour")}>
        <ColourSwatches />
      </Section>
      <Section title={t("sections.type")}>
        <TypeSpecimen />
      </Section>
      <Section title={t("sections.motifs")}>
        <MotifSamples />
      </Section>
      <Section title={t("sections.buttons")}>
        <ButtonSamples />
      </Section>
      <Section title={t("sections.stats")}>
        <StatSamples />
      </Section>
      <Section title={t("sections.photos")}>
        <PhotoSamples />
      </Section>
    </div>
  );
}
