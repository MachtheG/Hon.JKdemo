/** Public site URL, used in share links and metadata. Set NEXT_PUBLIC_SITE_URL in Vercel. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://hon-jkdemo.vercel.app").replace(/\/$/, "");

/** wa.me share link with prefilled text. */
export function whatsappShare(text: string): string {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}
