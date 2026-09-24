"use client";

import AppLayout from "@/components/Layout/AppLayout";
import { Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import EditCompanyForm from "@/components/editcompany/EditCompanyForm";

const CompanyEditPage = () => {
  const router = useRouter();

  return (
    <AppLayout
      title="取引先管理 / 取引先編集"
      actions={
        <Stack direction="row" sx={{ alignItems: "center" }} spacing={0.5}>
          <Typography
            variant="body1"
            sx={{ fontSize: 14, fontWeight: 400, color: "#64748B" }}
          >
            取引先一覧 /
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 14, fontWeight: 600 }}>
            編集
          </Typography>
        </Stack>
      }
    >
      <EditCompanyForm
        onEditCompany={() => router.push("/company")}
        onCancel={() => router.push("/company")}
      />
    </AppLayout>
  );
};

export default CompanyEditPage;
