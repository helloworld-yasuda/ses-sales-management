import { Typography, TypographyProps } from "@mui/material";
import { Rank, RANK_STYLES } from "./rankStyles";

type RankLabelProps = TypographyProps & {
  rank: Rank;
};

export const RankLabelComponent = ({ rank }: RankLabelProps) => {
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
