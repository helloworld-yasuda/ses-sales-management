"use client";

import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { Avatar, Box, Card, Stack, Typography } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import ButtonComponent from "@/components/common/Button/Button";
import StatusLabelComponent from "@/components/common/StatusLabel/StatusLabel";
import TabsComponent from "@/components/common/Tabs/Tabs";
import AppLayout from "@/components/Layout/AppLayout";
import useMemberDetail from "@/hooks/useMemberDetail";

const MemberDetailPage = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const {
    member,
    profileFields,
    handleDelete,
    skills1Labels,
    skills2Labels,
    availabilityLabels,
  } = useMemberDetail(id);

  return (
    <AppLayout
      title="要員管理 / 詳細情報"
      actions={
        <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
          <Typography sx={{ fontSize: 14, color: "#64748B" }}>
            要員管理
          </Typography>
          <Typography sx={{ fontSize: 14, color: "#64748B" }}>/</Typography>
          <Typography sx={{ fontSize: 14, fontWeight: 600, color: "#0F172A" }}>
            詳細情報
          </Typography>
        </Stack>
      }
    >
      <TabsComponent id={id} />

      <Box
        sx={{
          display: "flex",
          gap: 3,
          p: 4,
          bgcolor: "#F8FAFC",
          alignItems: "flex-start",
        }}
      >
        <Stack spacing={3} sx={{ width: "50%" }}>
          <Card
            elevation={0}
            sx={{
              p: 3,
              border: "1px solid #E2E8F0",
              borderRadius: "12px",
            }}
          >
            <Stack
              direction="row"
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                pb: 3,
                borderBottom: "1px solid #E2E8F0",
              }}
            >
              <Stack
                direction="row"
                spacing={2.5}
                sx={{ alignItems: "center" }}
              >
                <Avatar
                  src={member.imageUrl}
                  alt={member.name}
                  sx={{ width: 80, height: 80, bgcolor: "#CBD5E1" }}
                />
                <Box>
                  <Typography
                    sx={{ fontWeight: 700, fontSize: 24, color: "#0F172A" }}
                  >
                    {member.name}
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: "#64748B", mt: 0.75 }}>
                    {member.nameKana}
                  </Typography>
                </Box>
              </Stack>

              <Stack direction="row" spacing={1.5}>
                <ButtonComponent
                  variant="outlined"
                  onClick={() => router.push(`/member/${id}/edit`)}
                  sx={{
                    fontWeight: 600,
                    fontSize: 14,
                    color: "#64748B",
                    borderColor: "#E2E8F0",
                    borderRadius: 2,
                    px: 2,
                    py: 1.25,
                  }}
                >
                  編集
                </ButtonComponent>
                <ButtonComponent
                  onClick={handleDelete}
                  sx={{
                    fontWeight: 600,
                    fontSize: 14,
                    borderRadius: 2,
                    px: 2,
                    py: 1.25,
                    backgroundColor: "#EF4444",
                    "&:hover": { backgroundColor: "#DC2626" },
                  }}
                >
                  削除
                </ButtonComponent>
              </Stack>
            </Stack>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                columnGap: 3,
                rowGap: 2,
                pt: 3,
              }}
            >
              {profileFields.map((field) => (
                <Box
                  key={field.label}
                  sx={{
                    gridColumn:
                      field.label === "提案単価" ? "1 / -1" : undefined,
                  }}
                >
                  <Typography sx={{ fontSize: 11, color: "#64748B", mb: 0.5 }}>
                    {field.label}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 13, fontWeight: 500, color: "#0F1729" }}
                  >
                    {field.value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Card>

          <Card
            elevation={0}
            sx={{
              p: 4,
              border: "1px solid #E2E8F0",
              borderRadius: "12px",
            }}
          >
            <Typography
              sx={{ fontWeight: 700, fontSize: 16, color: "#0F172A", mb: 1.5 }}
            >
              主要スキル
            </Typography>
            <Typography sx={{ fontSize: 12, color: "#64748B", mb: 1 }}>
              言語・フレームワーク
            </Typography>
            <Stack
              direction="row"
              spacing={0.75}
              sx={{ flexWrap: "wrap", gap: 0.75 }}
            >
              <StatusLabelComponent>
                {skills1Labels(member.skills)}
              </StatusLabelComponent>
              <StatusLabelComponent>
                {skills2Labels(member.skills2)}
              </StatusLabelComponent>
            </Stack>
          </Card>

          <Card
            elevation={0}
            sx={{
              p: 4,
              border: "1px solid #E2E8F0",
              borderRadius: "12px",
            }}
          >
            <Typography
              sx={{ fontWeight: 700, fontSize: 16, color: "#0F172A", mb: 1.5 }}
            >
              最新スキルシート (経歴書一覧)
            </Typography>
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                p: 1.5,
                border: "1px solid #E2E8F0",
                borderRadius: 2,
              }}
            >
              <Stack
                direction="row"
                spacing={1.5}
                sx={{ alignItems: "center" }}
              >
                <DescriptionOutlinedIcon
                  sx={{ fontSize: 20, color: "#64748B" }}
                />
                <Box>
                  <Typography
                    sx={{ fontWeight: 600, fontSize: 14, color: "#0F172A" }}
                  >
                    {member.skillSheet}
                  </Typography>
                  <Typography sx={{ fontSize: 11, color: "#64748B", mt: 0.25 }}>
                    最終更新日: {member.updatedAt}
                  </Typography>
                </Box>
              </Stack>
              <ButtonComponent
                onClick={() => router.push(member.skillSheet)}
                sx={{
                  fontWeight: 600,
                  fontSize: 13,
                  borderRadius: 1.5,
                  px: 2,
                  py: 1,
                  backgroundColor: "#EFF6FF",
                  color: "#2563EB",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "#DBEAFE",
                    boxShadow: "none",
                  },
                }}
              >
                表示する
              </ButtonComponent>
            </Stack>
          </Card>
        </Stack>

        <Stack spacing={3} sx={{ width: 480, flexShrink: 0 }}>
          <Card
            elevation={0}
            sx={{
              p: 3,
              border: "1px solid #E2E8F0",
              borderRadius: "12px",
            }}
          >
            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
              <Typography
                sx={{ fontWeight: 700, fontSize: 16, color: "#0F172A" }}
              >
                稼働可否ステータス
              </Typography>
              <Typography sx={{ fontSize: 13, color: "#0F1729" }}>
                {availabilityLabels(member.availability)}
              </Typography>
            </Stack>
          </Card>

          <Card
            elevation={0}
            sx={{
              p: 3,
              border: "1px solid #E2E8F0",
              borderRadius: "12px",
            }}
          >
            <Typography
              sx={{ fontWeight: 700, fontSize: 15, color: "#0F172A", mb: 1.5 }}
            >
              備考・その他コメント
            </Typography>
            <Typography
              sx={{
                fontSize: 13,
                color: "#64748B",
                lineHeight: 1.8,
              }}
            >
              {member.remarks}
            </Typography>
          </Card>
        </Stack>
      </Box>
    </AppLayout>
  );
};

export default MemberDetailPage;
