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

/** Whole days remaining until election day (0 from the start of 10 August 2027, EAT). */
export function daysUntil(target: string, now: Date = new Date()): number {
  const diff = new Date(target).getTime() - now.getTime();
  return diff <= 0 ? 0 : Math.ceil(diff / DAY_MS);
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
