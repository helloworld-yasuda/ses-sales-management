import { Typography, TypographyProps } from "@mui/material";
import type { Rank } from "@/app/types/types";
import { RANK_STYLES } from "@/app/types/types";

type RankLabelProps = TypographyProps & {
  rank: Rank;
};

export const RankLabelComponent = ({ rank }: RankLabelProps) => {
  return (
    <Typography
      sx={{
        textAlign: "center",
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
