import { Stack, Typography } from "@mui/material";

type TextComponentProps = {
  label: string;
  value: string;
  isBold?: boolean;
};

const TextComponent = ({
  label,
  value,
  isBold = false,
}: TextComponentProps) => {
  return (
    <Stack direction="row" sx={{ justifyContent: "space-between" }}>
      <Typography
        variant="body1"
        sx={{ fontSize: 13, fontWeight: 600, color: "#64748B" }}
      >
        {label}
      </Typography>
      <Typography
        variant="body1"
        sx={{ fontSize: 14, fontWeight: isBold ? 600 : 400 }}
      >
        {value}
      </Typography>
    </Stack>
  );
};

export default TextComponent;
