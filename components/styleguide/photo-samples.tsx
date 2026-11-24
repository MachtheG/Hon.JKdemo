import { useTranslations } from "next-intl";
import { PhotoSlot } from "@/components/shared/photo-slot";

export function PhotoSamples() {
  const t = useTranslations("styleguide.photos");
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <PhotoSlot id="HERO-01" ratio="16/9" minSize="2880×1620" shot={t("hero")} className="md:col-span-2" />
      <PhotoSlot id="CARD-WHO" ratio="3/2" minSize="1800×1200" shot={t("card")} />
    </div>
  );
}
