import { Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

type HeaderProps = {
  title: string;
  actions?: ReactNode;
};

const Header = ({ title, actions }: HeaderProps) => {
  return (
    <Stack
      direction="row"
      component="header"
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        px: 4,
        py: 2,
        backgroundColor: "#FFFFFF",
        borderBottom: "1px solid #E2E8F0",
        backgroundColor: "#FFFFFF",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 22 }}>
        {title}
      </Typography>

      {actions && (
        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          {actions}
        </Stack>
      )}
    </Stack>
  );
};

export default Header;
