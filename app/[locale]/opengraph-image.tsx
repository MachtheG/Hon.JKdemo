import { ImageResponse } from "next/og";
import { county2017 } from "@/lib/election-results";
import { formatNumber } from "@/lib/format";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Share card: brand colours, theme line, one sourced figure. No photo of the candidate until real ones are supplied. */
/** Route handlers can't use next/root-params yet, so the locale comes from params. */
export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const sw = (await params).locale === "sw";
  const stripes = Array.from({ length: 14 }, (_, i) => i);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#1F4D3A", position: "relative", fontFamily: "serif" }}>
        {stripes.map((i) => (
          <div
            key={i}
            style={{ position: "absolute", left: -200, top: i * 52, width: 1700, height: 3, background: "rgba(217,222,216,0.14)", transform: "rotate(-8deg)" }}
          />
        ))}
        <div style={{ position: "absolute", left: 64, right: 64, bottom: 64, top: 64, display: "flex", flexDirection: "column", justifyContent: "space-between", background: "rgba(20,32,26,0.92)", padding: 56 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#F5C400", fontSize: 26, letterSpacing: 3 }}>
            <span>{sw ? "MGOMBEA WA MWAKILISHI WA WANAWAKE · BOMET" : "WOMAN REP CANDIDATE · BOMET"}</span>
            <span style={{ background: "#F5C400", color: "#14201A", padding: "8px 20px", borderRadius: 999 }}>10.08.2027</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", color: "#F6F1E7" }}>
            <span style={{ fontSize: 104, fontWeight: 700, lineHeight: 1 }}>Mama Arudi Kazini.</span>
            <span style={{ fontSize: 36, color: "#D9DED8", marginTop: 18 }}>
              {sw ? "Joyce Korir — Arudi kazini kwa wanawake wa Bomet" : "Joyce Korir — Back to work for Bomet's women"}
            </span>
          </div>
          <span style={{ fontSize: 26, color: "#D9DED8" }}>
            {sw
              ? `Kura ${formatNumber(county2017.votes)} (${county2017.share}%) mwaka 2017 · IEBC`
              : `${formatNumber(county2017.votes)} votes (${county2017.share}%) in 2017 · IEBC`}
          </span>
        </div>
      </div>
    ),
    size,
  );
}
