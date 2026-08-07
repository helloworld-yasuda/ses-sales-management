"use client";

import { Box } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import Header from "@/components/Layout/Header/Header";
import Sidebar, { type NavKey } from "@/components/Layout/Sidebar/Sidebar";
import { mockSidebarProps } from "@/components/Layout/Sidebar/Sidebar.mock";

type AppLayoutProps = {
  title: string;
  actions?: ReactNode;
  children?: ReactNode;
};

const NAV_PATHS: Record<NavKey, string | null> = {
  partners: "/management",
  engineers: "/member",
  mail: null, // TODO: メール管理機能が実装されたら追加
  settings: null, // TODO: 設定機能が実装されたら追加
};

const getSelectedNavKey = (pathname: string): NavKey => {
  if (pathname.startsWith("/member")) return "engineers";
  if (pathname.startsWith("/management")) return "partners";
  return "partners";
};

const AppLayout = ({ title, actions, children }: AppLayoutProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const selected = getSelectedNavKey(pathname);

  const handleSelect = (key: NavKey) => {
    const path = NAV_PATHS[key];
    if (path) {
      router.push(path);
    }
  };

  const handleLogout = () => {
    // TODO: ログアウト処理
    router.push("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar
        {...mockSidebarProps}
        selected={selected}
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
