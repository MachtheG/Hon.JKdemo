import type { SourceId } from "../sources";

/**
 * 2017 General Election — County Woman Member of the National Assembly, Bomet (036).
 * Only figures published by IEBC are recorded. Constituency, ward and polling-station
 * levels are NOT published in the IEBC data report; they require Forms 37A/37B from
 * the campaign's agents. Until then `constituencies` is empty and the map shows the
 * county-level result only. Nothing is estimated.
 */
export interface CandidateResult {
  name: string;
  party: string;
  votes: number;
  isCandidate?: boolean; // our candidate
  source: SourceId;
}

export interface AreaResult {
  code: string;
  name: string;
  level: "county" | "constituency" | "ward" | "pollingStation";
  registeredVoters: number | null;
  registeredVotersSource: SourceId | null;
  /** Total valid votes cast for this race in this area. */
  totalValidVotes: number | null;
  rejectedVotes: number | null;
  candidates: CandidateResult[];
  /** Form reference, e.g. "Form 37B — Sotik". */
  form?: string;
}

export const results2017 = {
  election: "2017-08-08",
  race: "County Woman Member of the National Assembly",
  county: {
    code: "036",
    name: "Bomet",
    level: "county",
    registeredVoters: 322024,
    registeredVotersSource: "iebc-data-report-2017",
    totalValidVotes: 262253,
    rejectedVotes: null, // [[TO CONFIRM: rejected ballots — Form 37C]]
    form: "IEBC Data Report 2017, s.5.4 p.137",
    candidates: [
      {
        name: "Chepkoech Joyce Korir",
        party: "JP",
        votes: 205964,
        isCandidate: true,
        source: "iebc-data-report-2017",
      },
      { name: "Chepkemoi Beatrice", party: "CCM", votes: 51091, source: "iebc-data-report-2017" },
      { name: "Sieley Lila Chepkemoi", party: "KANU", votes: 5198, source: "iebc-data-report-2017" },
    ],
  } satisfies AreaResult,
  /** [[TO CONFIRM: Forms 37B for Sotik, Chepalungu, Bomet East, Bomet Central, Konoin]] */
  constituencies: [] as AreaResult[],
  /** [[TO CONFIRM: Forms 37A / ward tallies for all 25 wards]] */
  wards: [] as AreaResult[],
} as const;

/** Derived (computed, not published): share = votes / totalValidVotes. */
export function share(votes: number, total: number): number {
  return total > 0 ? votes / total : 0;
}
