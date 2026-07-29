import { Typography, TypographyProps } from "@mui/material";

type Rank = "A" | "B" | "C";
type RankLabelProps = TypographyProps & {
  rank: Rank;
};

export const RankLabelComponent = ({ rank }: RankLabelProps) => {
  const RANK_STYLES = {
    A: { bgcolor: "#E5FFE5", color: "#218721" },
    B: { bgcolor: "#E5EDFF", color: "#1A5CCC" },
    C: { bgcolor: "#FFF2E5", color: "#CC801A" },
  } as const;
  return (
    <Typography
      sx={{
        borderRadius: "4px",
        px: 0.5,
        py: 1,
        ...RANK_STYLES[rank],
      }}
    >
      {rank}
    </Typography>
  );
};
export default RankLabelComponent;
