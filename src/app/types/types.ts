export type MemberTableRow = {
  id: number;
  memberName: string;
  nameKana?: string; // TODO: API修正後オプショナルは削除
  mainSkills: string[];
  offerRate: number;
  experienceYears: number;
  statuses: string;
  skillSheetUrl: string;
};

export type CompanyTableRow = {
  id: number;
  clientName: string;
  contactPerson: string;
  primaryDomain: string;
  salesPerson: string;
  rank: Rank;
};

export type Rank = "A" | "B" | "C";

export const RANK_STYLES = {
  A: { bgcolor: "#E5FFE5", color: "#218721" },
  B: { bgcolor: "#E5EDFF", color: "#1A5CCC" },
  C: { bgcolor: "#FFF2E5", color: "#CC801A" },
};
