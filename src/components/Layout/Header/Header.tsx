import { Stack, Typography } from "@mui/material";

type HeaderProps = {
  title: string;
  description?: string;
  actions?: React.ReactNode;
};

const Header = ({ title, actions, description }: HeaderProps) => {
  return (
    <Stack
      direction="row"
      component="header"
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        px: 4,
        py: 2,
        borderBottom: "1px solid #E2E8F0",
      }}
    >
      <Stack>
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 22 }}>
          {title}
        </Typography>
        {description && (
          <Typography variant="body2" sx={{ color: "#64748B", fontSize: 12 }}>
            {description}
          </Typography>
        )}
      </Stack>
      {actions && (
        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          {actions}
        </Stack>
      )}
    </Stack>
  );
};

export default Header;
