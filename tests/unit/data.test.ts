import { describe, expect, it } from "vitest";
import { results2017 } from "@/data/election/results-2017";
import { sourceById, sources } from "@/data/sources";
import { contextStats, populationByConstituency2019, recordStats } from "@/data/stats";

describe("sources", () => {
  it("has unique ids and https URLs", () => {
    const ids = sources.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const s of sources) expect(s.url.startsWith("https://")).toBe(true);
  });
  it("every stat cites a non-tertiary source", () => {
    for (const s of [...contextStats, ...recordStats]) {
      expect(sourceById[s.source]).toBeDefined();
      expect(sourceById[s.source].tier).not.toBe("tertiary");
    }
  });
});

describe("2017 results", () => {
  const c = results2017.county;
  it("candidate votes sum to total valid votes", () => {
    expect(c.candidates.reduce((n, x) => n + x.votes, 0)).toBe(c.totalValidVotes);
  });
  it("derived share and margin match recordStats", () => {
    const joyce = c.candidates.find((x) => x.isCandidate)!;
    const share = Math.round((joyce.votes / c.totalValidVotes) * 1000) / 10;
    expect(share).toBe(78.5);
    const margin = recordStats.find((s) => s.id === "wr-margin-2017")!.value;
    expect(joyce.votes - 51091).toBe(margin);
  });
  it("does not estimate constituency or ward results", () => {
    expect(results2017.constituencies).toHaveLength(0);
    expect(results2017.wards).toHaveLength(0);
  });
});

describe("census", () => {
  it("constituency populations sum to the county total", () => {
    const sum = populationByConstituency2019.reduce((n, c) => n + c.population, 0);
    expect(sum).toBe(contextStats.find((s) => s.id === "population-2019")!.value);
  });
  it("2022 voters by constituency sum to the county total", () => {
    const sum = populationByConstituency2019.reduce((n, c) => n + c.voters2022, 0);
    expect(sum).toBe(contextStats.find((s) => s.id === "voters-2022")!.value);
  });
});
