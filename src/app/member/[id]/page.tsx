"use client";

import AppLayout from "@/components/Layout/AppLayout";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { useMemberDetail } from "@/hooks/useMemberDetail";

const MemberDetailPage = () => {
  const { member } = useMemberDetail();
  return (
    <AppLayout
      title="要員管理 / 詳細情報"
      actions={
        <Typography variant="body1" sx={{ fontWeight: 600, fontSize: 14 }}>
          <span style={{ color: "#64748B", fontWeight: 400 }}>要員管理 / </span>
          詳細情報
        </Typography>
      }
    >
      <Stack direction="row" spacing={3} sx={{ p: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Card
            elevation={0}
            sx={{
              border: "1px solid #E2E8F0",
              bgcolor: "#FFFFFF",
              p: 3,
              borderRadius: 2,
            }}
          >
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Stack
                direction="row"
                spacing={2.5}
                sx={{ alignItems: "center" }}
              >
                <Avatar
                  src={member?.avatarUrl}
                  alt={member?.name}
                  sx={{ width: 80, height: 80 }}
                />
                <Stack>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, fontSize: 24 }}
                  >
                    {member?.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: 13, fontWeight: 400, color: "#64748B" }}
                  >
                    {member?.nameKana}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Card>
          <Card elevation={0}></Card>
          <Card elevation={0}></Card>
        </Box>
        <Box></Box>
      </Stack>
    </AppLayout>
  );
};

export default MemberDetailPage;
