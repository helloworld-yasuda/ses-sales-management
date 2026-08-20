import { Tab, Tabs } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  id: string;
};

export const TabsComponent = ({ id }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const value = pathname?.includes("/summary") ? "summary" : "detail";

  return (
    <Tabs
      value={value}
      onChange={(_, newValue: string) => {
        router.push(
          newValue === "detail" ? `/member/${id}` : `/member/${id}/summary`,
        );
      }}
      sx={{
        border: "1px solid #E6E6E6",
        borderLeft: "none",
        borderRight: "none",
        borderTop: "none",
        minHeight: 48,
        pl: 4,
        "& .MuiTabs-indicator": {
          backgroundColor: "#386BF2",
        },
      }}
    >
      <Tab
        label="要員詳細"
        value="detail"
        sx={{
          fontSize: 14,
          color: "#808080",
          "&.Mui-selected": { fontWeight: 500, color: "#386BF2" },
        }}
      />
      <Tab
        label="営業サマリー"
        value="summary"
        sx={{
          fontSize: 14,
          color: "#808080",
          "&.Mui-selected": { fontWeight: 500, color: "#386BF2" },
        }}
      />
    </Tabs>
  );
};

export default TabsComponent;
