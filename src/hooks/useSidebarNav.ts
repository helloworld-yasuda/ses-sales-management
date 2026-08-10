import { usePathname } from "next/navigation";
import type { NavPath } from "@/components/Layout/Sidebar/Sidebar";

export const useSidebarNav = () => {
  const pathname = usePathname();

  const isSelected = (path: NavPath) =>
    pathname === path || pathname.startsWith(`${path}/`);

  return { isSelected };
};
