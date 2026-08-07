import type { SidebarProps } from "./Sidebar";

export const mockSidebarProps: Omit<SidebarProps, "selected"> = {
  title: "SES Manager",
  description: "Sales Core",
  userName: "山田太郎",
  role: "管理者",
};
