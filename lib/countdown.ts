import { ELECTION } from "./election";

export type CountdownParts =
  | { phase: "before"; days: number; hours: number; minutes: number; seconds: number }
  | { phase: "today" }
  | { phase: "after" };

const DAY = 86_400_000;

/** Split the time until election day (00:00 EAT, 10 Aug 2027) into d/h/m/s. */
export function countdownParts(nowMs: number, targetIso: string = ELECTION.isoStart): CountdownParts {
  const target = new Date(targetIso).getTime();
  const diff = target - nowMs;
  if (diff <= -DAY) return { phase: "after" };
  if (diff <= 0) return { phase: "today" };
  const total = Math.floor(diff / 1000);
  return {
    phase: "before",
    days: Math.floor(total / 86_400),
    hours: Math.floor((total % 86_400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

export const pad2 = (n: number) => String(n).padStart(2, "0");
