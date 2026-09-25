"use client";

import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import Header from "@/components/Layout/Header/Header";
import Sidebar from "@/components/Layout/Sidebar/Sidebar";
import { useAuth } from "@/contexts/AuthContext";

type AppLayoutProps = {
  title: string;
  actions?: ReactNode;
  children?: ReactNode;
};

const AppLayout = ({ title, actions, children }: AppLayoutProps) => {
  const router = useRouter();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (!user) {
    return null;
  }

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar
        userName={user.userName}
        role={user.role}
        avatarUrl={user.avatarUrl}
        onLogout={handleLogout}
      />
      <Box
        sx={{
          flexGrow: 1,
          minWidth: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header title={title} actions={actions} />
        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AppLayout;
