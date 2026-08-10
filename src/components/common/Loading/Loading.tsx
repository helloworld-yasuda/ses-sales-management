import { Backdrop, CircularProgress, Stack, Typography } from "@mui/material";

type LoadingProps = {
  open: boolean;
  label?: string;
};

const Loading = ({ open, label = "読み込み中..." }: LoadingProps) => {
  return (
    <Backdrop
      open={open}
      sx={{
        bgcolor: "rgba(255, 255, 255, 0.7)",
        zIndex: (theme) => theme.zIndex.modal + 1,
      }}
    >
      <Stack spacing={4.5} sx={{ alignItems: "center" }}>
        <CircularProgress color="primary" size={48} />
        <Typography
          variant="h6"
          sx={{ color: "#64748B", fontSize: "14px", fontWeight: "500" }}
        >
          {label}
        </Typography>
      </Stack>
    </Backdrop>
  );
};

export default Loading;
