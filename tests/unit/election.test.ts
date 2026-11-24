import { describe, expect, it } from "vitest";
import { daysUntil, ELECTION, electionIcs } from "@/lib/election";

describe("daysUntil", () => {
  it("counts whole days remaining, rounding up", () => {
    expect(daysUntil(ELECTION.isoStart, new Date("2026-11-22T00:00:00+03:00"))).toBe(261);
    expect(daysUntil(ELECTION.isoStart, new Date("2027-08-09T07:00:00+03:00"))).toBe(1);
    expect(daysUntil(ELECTION.isoStart, new Date("2026-11-22T06:00:00+03:00"))).toBe(261);
  });
  it("is 0 once polling has started", () => {
    expect(daysUntil(ELECTION.isoStart, new Date("2027-08-10T00:00:00+03:00"))).toBe(0);
    expect(daysUntil(ELECTION.isoStart, new Date("2027-09-01T00:00:00+03:00"))).toBe(0);
  });
});

describe("electionIcs", () => {
  it("is a valid all-day event on 10 August 2027", () => {
    const ics = electionIcs("Election day", "Vote");
    expect(ics).toContain("DTSTART;VALUE=DATE:20270810");
    expect(ics.split("\r\n")[0]).toBe("BEGIN:VCALENDAR");
  });
});
