import { sourceById } from "@/data/sources";
import { SITE_URL } from "@/lib/site";

/**
 * schema.org Person — sourced facts only (Parliament of Kenya profiles, PSC).
 * Unverified social accounts are deliberately not listed in sameAs.
 */
export function PersonJsonLd({ locale }: { locale: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Joyce Chepkoech Korir",
    alternateName: "Joyce Korir",
    honorificPrefix: "Hon.",
    jobTitle: locale === "sw" ? "Seneta (aliyeteuliwa), Bunge la Kenya" : "Senator (nominated), Parliament of Kenya",
    memberOf: [
      { "@type": "GovernmentOrganization", name: "Senate of Kenya" },
      { "@type": "GovernmentOrganization", name: "Parliamentary Service Commission", roleName: "Vice-Chairperson" },
    ],
    affiliation: { "@type": "Organization", name: "United Democratic Alliance (UDA)" },
    url: `${SITE_URL}/${locale}`,
    sameAs: [sourceById["parl-senate-profile"].url, sourceById["parl-na-profile-2017"].url],
  };
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output with "<" escaped — safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
