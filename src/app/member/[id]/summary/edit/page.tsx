"use client";

import { Stack, Typography } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import AppLayout from "@/components/Layout/AppLayout";
import SummaryForm from "@/components/editsummary/SummaryForm";
import { toSummaryFormValues } from "@/hooks/useSummaryForm";
import useMemberSummary from "@/hooks/useSalesSummary";

const MemberSummaryEditPage = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { memberSummary } = useMemberSummary(id);

  if (!memberSummary) {
    throw new Error("Summary not found");
  }

  const summaryPath = `/member/${id}/summary`;

  return (
    <AppLayout
      title="要員管理 / 営業サマリー編集"
      actions={
        <Stack direction="row" sx={{ alignItems: "center" }} spacing={0.5}>
          <Typography
            variant="body1"
            sx={{ fontSize: 14, fontWeight: 400, color: "#64748B" }}
          >
            要員詳細 /
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 14, fontWeight: 600 }}>
            営業サマリー編集
          </Typography>
        </Stack>
      }
    >
      <SummaryForm
        defaultValues={toSummaryFormValues(memberSummary)}
        onSave={() => router.push(summaryPath)}
        onCancel={() => router.push(summaryPath)}
      />
    </AppLayout>
  );
};

export default MemberSummaryEditPage;
