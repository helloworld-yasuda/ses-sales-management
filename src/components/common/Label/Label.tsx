import { Stack, Typography, type TypographyProps } from "@mui/material";

type LabelProps = TypographyProps & {
  label: string;
  required?: boolean;
};

const LabelComponent = ({ label, required = false, ...props }: LabelProps) => {
  return (
    <Stack direction="row" spacing={0.5}>
      <Typography
        variant="body1"
        sx={{ fontWeight: 600, fontSize: 13 }}
        {...props}
      >
        {label}
      </Typography>
      {required && (
        <Typography
          variant="body1"
          sx={{ fontWeight: 600, fontSize: 13, color: "#EF4444" }}
        >
          *
        </Typography>
      )}
    </Stack>
  );
};

export default LabelComponent;
