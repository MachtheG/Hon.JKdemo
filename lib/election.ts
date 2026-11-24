import type { SourceId } from "@/data/sources";

/** Election day: Tuesday 10 August 2027 (EAT). The countdown runs to the start of the day. */
export const ELECTION = {
  isoStart: "2027-08-10T00:00:00+03:00",
  isoDate: "2027-08-10",
  campaignOpens: "2027-05-29",
  campaignCloses: "2027-08-07",
  source: "iebc-2027-date" satisfies SourceId,
} as const;

const DAY_MS = 86_400_000;

/**
 * Whole days until election day (EAT).
 *   > 0  days remaining
 *   0    election day itself (00:00–23:59 on 10 August 2027)
 *   -1   the election has passed (from 00:00 on 11 August 2027)
 */
export function daysUntil(target: string, now: Date = new Date()): number {
  const diff = new Date(target).getTime() - now.getTime();
  if (diff > 0) return Math.ceil(diff / DAY_MS);
  return diff > -DAY_MS ? 0 : -1;
}

/** RFC 5545 calendar file contents for add-to-calendar. */
export function electionIcs(summary: string, description: string): string {
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Hon.JKdemo//Election//EN",
    "BEGIN:VEVENT",
    "UID:election-2027-08-10@hon-jkdemo",
    "DTSTAMP:20261122T000000Z",
    "DTSTART;VALUE=DATE:20270810",
    "DTEND;VALUE=DATE:20270811",
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
