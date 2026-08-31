import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { Stack, Typography } from "@mui/material";
import ButtonComponent from "@/components/common/Button/Button";

type SummaryEmptyStateProps = {
  onAdd: () => void;
};

const SummaryEmptyState = ({ onAdd }: SummaryEmptyStateProps) => {
  return (
    <Stack
      spacing={1.5}
      sx={{
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <DescriptionOutlinedIcon sx={{ fontSize: 48, color: "#2563EB" }} />
      <Typography sx={{ fontWeight: 700, fontSize: 18, color: "#0F172A" }}>
        データがありません
      </Typography>
      <Typography sx={{ fontSize: 14, color: "#64748B" }}>
        営業サマリーを追加してください。
      </Typography>
      <ButtonComponent
        variant="outlined"
        onClick={onAdd}
        sx={{
          mt: 1,
          fontWeight: 600,
          color: "#2563EB",
          borderColor: "#2563EB",
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        営業サマリーを登録する
      </ButtonComponent>
    </Stack>
  );
};

export default SummaryEmptyState;
