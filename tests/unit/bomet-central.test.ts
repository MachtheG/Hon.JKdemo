import { describe, expect, it } from "vitest";
import { BOMET_CENTRAL, bometCentralWards, ngcdfAllocations } from "@/data/bomet-central";
import { bometMap } from "@/data/geo/bomet-paths";
import { populationByConstituency2019, wardsByConstituency } from "@/data/stats";

describe("Bomet Central data", () => {
  it("ward voters (IEBC per-ward files) add up to the constituency totals", () => {
    expect(bometCentralWards.reduce((n, w) => n + w.voters2022, 0)).toBe(BOMET_CENTRAL.voters2022);
    expect(bometCentralWards.reduce((n, w) => n + w.voters2017, 0)).toBe(BOMET_CENTRAL.voters2017);
    expect(bometCentralWards.reduce((n, w) => n + w.pollingStations2017, 0)).toBe(BOMET_CENTRAL.pollingStations2017);
  });
  it("agrees with the constituency-level census and 2022 register", () => {
    const c = populationByConstituency2019.find((x) => x.name === "Bomet Central")!;
    expect(c.population).toBe(BOMET_CENTRAL.population2019);
    expect(c.voters2022).toBe(BOMET_CENTRAL.voters2022);
  });
  it("covers exactly the five official wards, each with a map shape", () => {
    expect(bometCentralWards.map((w) => w.name).sort()).toEqual([...wardsByConstituency["Bomet Central"]].sort());
    for (const w of bometCentralWards) expect(bometMap.wards.find((m) => m.slug === w.slug && m.constituency === "bomet-central")).toBeDefined();
  });
  it("lists NG-CDF allocations in order, every year once", () => {
    const fys = ngcdfAllocations.map((a) => a.fy);
    expect(new Set(fys).size).toBe(fys.length);
    expect([...fys].sort()).toEqual(fys);
  });
});
