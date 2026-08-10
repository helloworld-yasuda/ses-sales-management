"use client";

import {
  Avatar,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export type NavPath = "/management" | "/member" | "/mail" | "/settings";

export type SidebarProps = {
  userName: string;
  role: string;
  avatarUrl?: string;
  onLogout?: () => void;
};

type NavItem = {
  icon: React.ReactNode;
  label: string;
  path: NavPath;
};

const navItems: NavItem[] = [
  {
    icon: <ApartmentOutlinedIcon />,
    label: "取引先管理",
    path: "/management",
  },
  {
    icon: <PeopleOutlinedIcon />,
    label: "要員管理",
    path: "/member",
  },
  {
    icon: <EmailOutlinedIcon />,
    label: "メール配信",
    path: "/mail",
  },
  {
    icon: <SettingsOutlinedIcon />,
    label: "設定",
    path: "/settings",
  },
];

const navItemSx = {
  borderRadius: 2,
  "&.Mui-selected": {
    backgroundColor: "#EFF6FF",
    color: "#2563EB",
    "& .MuiListItemIcon-root": {
      color: "#2563EB",
    },
    "& .MuiListItemText-primary": {
      color: "#2563EB",
      fontWeight: 600,
    },
    "&:hover": {
      backgroundColor: "#DBEAFE",
    },
  },
};

const Sidebar = ({ userName, role, avatarUrl, onLogout }: SidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 260,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 260,
          height: "100vh",
          boxSizing: "border-box",
        },
      }}
    >
      <Stack
        spacing={4}
        sx={{ px: 2, py: 3, height: "100%", justifyContent: "space-between" }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Image src="/logo-icon.png" alt="logo" width={36} height={36} />
            <Stack>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 16 }}>
                SES Manager
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: 11, color: "#64748B" }}
              >
                Sales Core
              </Typography>
            </Stack>
          </Box>

          <List>
            {navItems.map((item) => (
              <ListItemButton
                key={item.path}
                selected={
                  pathname === item.path || pathname.startsWith(`${item.path}/`)
                }
                onClick={() => router.push(item.path)}
                sx={navItemSx}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontWeight: 500,
                      color: "#0F172A",
                    },
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Box>

        <Stack spacing={2}>
          <ListItemButton onClick={onLogout}>
            <ListItemIcon>
              <LogoutOutlinedIcon />
            </ListItemIcon>
            <Typography variant="body2" sx={{ fontSize: 11, color: "#64748B" }}>
              ログアウト
            </Typography>
          </ListItemButton>
          <Box
            sx={{
              pt: 2,
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              gap: 1.5,
              borderTop: "1px solid #E2E8F0",
            }}
          >
            <Avatar src={avatarUrl} alt={userName} />
            <Stack>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 16 }}>
                {userName}
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: 11, color: "#64748B" }}
              >
                {role}
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Drawer>
  );
};

export default Sidebar;
