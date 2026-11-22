import type { SourceId } from "./sources";

export type Sector =
  | "education"
  | "health"
  | "water"
  | "roads"
  | "security"
  | "bursaries"
  | "agriculture"
  | "sports"
  | "environment"
  | "women-empowerment";

export type ProjectStatus = "approved" | "ongoing" | "complete";
export type CandidateRole = "sponsored" | "lobbied" | "allocated" | "oversaw" | "delivered";
export type AmountKind = "allocation" | "disbursement" | "expenditure";

export interface Project {
  id: string;
  name: string;
  sector: Sector;
  constituency: string;
  ward: string | null;
  /** Financial year, e.g. "2019/20". */
  year: string;
  amountKes: number | null;
  amountKind: AmountKind | null;
  fundingSource: "NGAAF" | "NG-CDF" | "County" | "National Government" | "Other";
  status: ProjectStatus;
  role: CandidateRole;
  source: SourceId;
  photoId?: string;
}

/**
 * Projects ledger — EMPTY BY DESIGN.
 *
 * Research (22 Nov 2026) found no public, official list of Bomet NGAAF projects or
 * allocations for FY 2017/18–2021/22. The National Assembly DFAC report on NGAAF
 * audits (FY 2016/17–2021/22) contains no Bomet line items.
 *
 * [[TO CONFIRM: Campaign to supply NGAAF Bomet County Committee minutes, approved
 * project lists, cheque-issue records or NGAAF Board allocation letters per FY.
 * Each entry needs a document before it can be listed.]]
 */
export const projects: Project[] = [];
