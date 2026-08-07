"use client";

import { Box } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import Header from "@/components/Layout/Header/Header";
import {
  PageHeaderProvider,
  usePageHeaderContext,
} from "@/components/Layout/PageHeaderContext";
import Sidebar, { type NavKey } from "@/components/Layout/Sidebar/Sidebar";
import { mockSidebarProps } from "@/components/Layout/Sidebar/Sidebar.mock";

const NAV_PATHS: Record<NavKey, string | null> = {
  partners: "/management",
  engineers: "/member",
  mail: null,
  settings: null,
};

const getSelectedNavKey = (pathname: string): NavKey => {
  if (pathname.startsWith("/member")) return "engineers";
  if (pathname.startsWith("/management")) return "partners";
  return "partners";
};

const MainLayoutContent = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { header } = usePageHeaderContext();
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
        <Header title={header.title} actions={header.actions} />
        {children}
      </Box>
    </Box>
  );
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <PageHeaderProvider>
      <MainLayoutContent>{children}</MainLayoutContent>
    </PageHeaderProvider>
  );
};

export default MainLayout;
