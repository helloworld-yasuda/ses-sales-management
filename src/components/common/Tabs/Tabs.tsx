import { Tab, Tabs } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  id: string;
};

export const TabsComponent = ({ id }: Props) => {
  const router = useRouter();
  const [value, setValue] = useState<string>("detail");
  return (
    <Tabs
      value={value}
      onChange={(_, newValue) => {
        router.push(
          newValue === "detail"
            ? `/member/${id}/detail`
            : `/member/${id}/summary`,
        );
        setValue(newValue);
      }}
      sx={{
        border: "1px solid #E2E8F0",
        pl: 4,
      }}
    >
      <Tab
        label="要員詳細"
        value="detail"
        sx={{ "&.Mui-selected": { fontWeight: 500 } }}
      />
      <Tab
        label="営業サマリー"
        value="summary"
        sx={{ "&.Mui-selected": { fontWeight: 500 } }}
      />
    </Tabs>
  );
};

export default TabsComponent;
