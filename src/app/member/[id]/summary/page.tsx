"use client";

import TabsComponent from "@/components/common/Tabs/Tabs";
import AppLayout from "@/components/Layout/AppLayout";
import { Card, IconButton, Stack, Typography } from "@mui/material";
import useMemberSummary from "@/hooks/useSalesSummary";
import { useParams, useRouter } from "next/navigation";
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import TextComponent from "@/components/summary/Textcomponent";
import useCopy from "@/hooks/useCopy";

const MemberSummaryPage = () => {
  const { id } = useParams<{ id: string }>();
  const { memberSummary } = useMemberSummary(id);
  const { handleCopy } = useCopy();
  const router = useRouter();
  return (
    <AppLayout
      title="要員管理 / 要員詳細"
      actions={
        <Stack direction="row" sx={{ alignItems: "center" }} spacing={0.5}>
          <Typography
            variant="body1"
            sx={{ fontSize: 14, fontWeight: 400, color: "#64748B" }}
          >
            要員詳細 /
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 14, fontWeight: 600 }}>
            詳細情報
          </Typography>
        </Stack>
      }
    >
      <TabsComponent id={id} />
      <Card
        elevation={0}
        sx={{ m: 3, p: 2.5, borderRadius: 2, border: "1px solid #E6E6E6" }}
      >
        <Stack spacing={0.5}>
          <Stack
            direction="row"
            spacing={2}
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700, fontSize: 28 }}>
              {memberSummary?.initial} ({memberSummary?.age}歳) |{" "}
              {memberSummary?.mainskills}
            </Typography>
            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
              <IconButton
                sx={{
                  border: "1px solid #E2E8F0",
                  borderRadius: 2,
                  width: 32,
                  height: 32,
                }}
                onClick={() => router.push(`/member/${id}/summary/edit`)}
                data-testid="edit-button"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                sx={{
                  border: "1px solid #E2E8F0",
                  borderRadius: 2,
                  width: 32,
                  height: 32,
                }}
                onClick={() => handleCopy(memberSummary)}
                data-testid="copy-button"
              >
                <ContentCopyOutlinedIcon />
              </IconButton>
            </Stack>
          </Stack>
          <Typography
            variant="body1"
            sx={{ fontSize: 14, fontWeight: 600, color: "#64748B" }}
          >
            {memberSummary?.experience}
          </Typography>
        </Stack>
        <Stack spacing={0.5}>
          <Typography
            variant="body1"
            sx={{ fontSize: 16, fontWeight: 700, color: "#0F172A" }}
          >
            ■特徴
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: 14, fontWeight: 400, whiteSpace: "pre-line" }}
          >
            {memberSummary?.features}
          </Typography>
        </Stack>
        <Stack spacing={0.5}>
          <Typography
            variant="body1"
            sx={{ fontSize: 16, fontWeight: 700, color: "#0F172A" }}
          >
            ■基本情報
          </Typography>
          <TextComponent
            label="稼働開始"
            value={memberSummary?.startDate || ""}
            isBold
          />
          <TextComponent
            label="単価"
            value={memberSummary?.unitPrice || ""}
            isBold
          />
          <TextComponent
            label="最寄駅"
            value={memberSummary?.nearestStation || ""}
            isBold
          />
          <TextComponent
            label="所属"
            value={memberSummary?.affiliation || ""}
            isBold
          />
        </Stack>
        <Stack spacing={0.5}>
          <Typography
            variant="body1"
            sx={{ fontSize: 16, fontWeight: 700, color: "#0F172A" }}
          >
            ■得意領域・対応可能領域
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: 14, fontWeight: 400, whiteSpace: "pre-line" }}
          >
            {memberSummary?.avaiableAreas}
          </Typography>
        </Stack>
        <Stack spacing={0.5}>
          <Typography
            variant="body1"
            sx={{ fontSize: 16, fontWeight: 700, color: "#0F172A" }}
          >
            ■主要技術
          </Typography>
          <TextComponent
            label="Front End"
            value={memberSummary?.frontendSkills || ""}
          />
          <TextComponent
            label="Back End"
            value={memberSummary?.backendSkills || ""}
          />
          <TextComponent
            label="Database"
            value={memberSummary?.databaseSkills || ""}
          />
          <TextComponent label="生成AI" value={memberSummary?.aiSkills || ""} />
        </Stack>
        <Stack spacing={0.5}>
          <Typography
            variant="body1"
            sx={{ fontSize: 16, fontWeight: 700, color: "#0F172A" }}
          >
            ■希望条件
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: 14, fontWeight: 400, whiteSpace: "pre-line" }}
          >
            {memberSummary?.desiredConditions}
          </Typography>
        </Stack>
        <Stack spacing={0.5}>
          <Typography
            variant="body1"
            sx={{ fontSize: 16, fontWeight: 700, color: "#0F172A" }}
          >
            ■並行状況
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 14, fontWeight: 400 }}>
            {memberSummary?.parallelStatus}
          </Typography>
        </Stack>
        <Stack spacing={0.5}>
          <Typography
            variant="body1"
            sx={{ fontSize: 16, fontWeight: 700, color: "#0F172A" }}
          >
            ■面談可能日程
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 14, fontWeight: 400 }}>
            {memberSummary?.availableDate}
          </Typography>
        </Stack>
      </Card>
    </AppLayout>
  );
};

export default MemberSummaryPage;
