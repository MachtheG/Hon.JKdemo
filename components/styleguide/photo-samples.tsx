import { Photo } from "@/components/shared/photo";

/** Real photographs as they render across the site (rounded, focal-point cropped, blur placeholder). */
export function PhotoSamples() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Photo id="RECORD-01" sizes="(min-width: 768px) 66vw, 100vw" className="md:col-span-2" />
      <Photo id="CARD-WHO" sizes="(min-width: 768px) 33vw, 100vw" />
    </div>
  );
}
