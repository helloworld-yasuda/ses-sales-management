export type Rank = "A" | "B" | "C";

export const RANK_STYLES = {
  A: { bgcolor: "#E5FFE5", color: "#218721" },
  B: { bgcolor: "#E5EDFF", color: "#1A5CCC" },
  C: { bgcolor: "#FFF2E5", color: "#CC801A" },
} as const;
