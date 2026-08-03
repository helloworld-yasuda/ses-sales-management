import { Typography, TypographyProps } from "@mui/material";

const StatusLabelComponent = (props: TypographyProps) => {
  return (
    <Typography
      {...props}
      sx={{
        bgcolor: "#F1F5F9",
        color: "#64748B",
        borderRadius: "4px",
        px: 1,
        py: 0.5,
        fontSize: 12,
      }}
    />
  );
};

export default StatusLabelComponent;
