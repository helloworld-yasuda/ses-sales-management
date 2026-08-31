"use client";

import AppLayout from "@/components/Layout/AppLayout";
import { Stack, Typography } from "@mui/material";
import CreateCompanyForm from "@/components/createcompany/CreateCompanyForm";
import Loading from "@/components/common/Loading/Loading";
import { useCreateCompany } from "@/hooks/useCreateCompany";
import { useRouter } from "next/navigation";

const CompanyCreatePage = () => {
  const router = useRouter();
  const { handleCreate, isLoading } = useCreateCompany();

  return (
    <AppLayout
      title="取引先管理 / 取引先登録"
      actions={
        <Stack direction="row" sx={{ alignItems: "center" }} spacing={0.5}>
          <Typography
            variant="body1"
            sx={{ fontSize: 14, fontWeight: 400, color: "#64748B" }}
          >
            取引先一覧 /
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 14, fontWeight: 600 }}>
            新規登録
          </Typography>
        </Stack>
      }
    >
      <Loading open={isLoading} />
      <CreateCompanyForm
        onCreateCompany={handleCreate}
        onCancel={() => router.push("/company")}
      />
    </AppLayout>
  );
};

export default CompanyCreatePage;
