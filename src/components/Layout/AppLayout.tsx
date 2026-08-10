"use client";

import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import Header from "@/components/Layout/Header/Header";
import Sidebar, { type NavPath } from "@/components/Layout/Sidebar/Sidebar";
import { APP_INFO } from "@/constants/app";
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

  const handleSelect = (path: NavPath) => {
    router.push(path);
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (!user) {
    return null;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar
        {...APP_INFO}
        userName={user.userName}
        role={user.role}
        avatarUrl={user.avatarUrl}
        onSelect={handleSelect}
        onLogout={handleLogout}
      />
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Header title={title} actions={actions} />
        {children}
      </Box>
    </Box>
  );
};

export default AppLayout;
