"use client";

import AppLayout from "@/components/Layout/AppLayout";
import { Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import CreateSalesSummaryForm from "@/components/summary/CreateSalesSummaryForm";
import Loading from "@/components/common/Loading/Loading";
import { useSubmitCreateSalesSummary } from "@/hooks/useSubmitCreateSalesSummary";

const SalesSummaryCreatePage = () => {
  const router = useRouter();
  const { handleCreate, isLoading } = useSubmitCreateSalesSummary();

  return (
    <AppLayout
      title="要員管理 / 営業サマリーの新規追加"
      actions={
        <Stack direction="row" sx={{ alignItems: "center" }} spacing={0.5}>
          <Typography
            variant="body1"
            sx={{ fontSize: 14, fontWeight: 400, color: "#64748B" }}
          >
            要員管理 /
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 14, fontWeight: 600 }}>
            詳細情報
          </Typography>
        </Stack>
      }
    >
      <Loading open={isLoading} />
      <CreateSalesSummaryForm
        onCreateSalesSummary={handleCreate}
        onCancel={() => router.push("/member")}
      />
    </AppLayout>
  );
};

export default SalesSummaryCreatePage;
