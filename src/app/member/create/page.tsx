"use client";

import AppLayout from "@/components/Layout/AppLayout";
import { Stack, Typography } from "@mui/material";
import CreateMemberForm from "@/components/createMember/CreateMemberForm";
import Loading from "@/components/common/Loading/Loading";
import { useSubmitCreateMember } from "@/hooks/useSubmitCreateMember";
import { useRouter } from "next/navigation";

const CreateMemberPage = () => {
  const router = useRouter();
  const { handleCreate, isLoading } = useSubmitCreateMember();

  return (
    <AppLayout
      title="要員管理 / 要員の新規追加"
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
      <CreateMemberForm
        onCreateMember={handleCreate}
        onCancel={() => router.push("/member")}
      />
    </AppLayout>
  );
};

export default CreateMemberPage;
