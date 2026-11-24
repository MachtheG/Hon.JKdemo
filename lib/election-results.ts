import { results2017 } from "@/data/election/results-2017";
import { percent } from "./format";

const county = results2017.county;
const sorted = [...county.candidates].sort((a, b) => b.votes - a.votes);
const joyce = county.candidates.find((c) => c.isCandidate)!;

/** County-level 2017 figures — the only level IEBC has published for this race. */
export const county2017 = {
  votes: joyce.votes,
  share: percent(joyce.votes, county.totalValidVotes),
  margin: joyce.votes - sorted.find((c) => !c.isCandidate)!.votes,
  led: sorted[0].isCandidate === true,
  valid: county.totalValidVotes,
  registered: county.registeredVoters,
  turnout: percent(county.totalValidVotes, county.registeredVoters),
  source: joyce.source,
} as const;

/** Sequential tea ramp (light → dark), one hue — dataviz rule for magnitude. */
export const shareBins = [
  { key: "lt40", max: 40, fill: "#E3EDE6" },
  { key: "b4060", max: 60, fill: "#B5D0BE" },
  { key: "b6075", max: 75, fill: "#6FA383" },
  { key: "gte75", max: Infinity, fill: "#1F4D3A" },
] as const;

export function binFor(share: number) {
  return shareBins.find((b) => share < b.max)!;
}
