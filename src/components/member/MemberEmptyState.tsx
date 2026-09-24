import { Avatar, Stack, Typography } from "@mui/material";
import ButtonComponent from "@/components/common/Button/Button";

type MemberEmptyStateProps = {
  onAdd: () => void;
};

const MemberEmptyState = ({ onAdd }: MemberEmptyStateProps) => {
  return (
    <Stack
      spacing={1.5}
      sx={{
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Avatar sx={{ width: 48, height: 48, bgcolor: "#2563EB" }} aria-hidden />
      <Typography sx={{ fontWeight: 700, fontSize: 18, color: "#0F172A" }}>
        データがありません
      </Typography>
      <Typography sx={{ fontSize: 14, color: "#64748B" }}>
        要員を追加してください。
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
        ＋ 初めての要員を登録する
      </ButtonComponent>
    </Stack>
  );
};

export default MemberEmptyState;
