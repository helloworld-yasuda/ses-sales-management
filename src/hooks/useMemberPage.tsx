"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import LinkComponent from "@/components/common/Link/Link";
import StatusLabelComponent from "@/components/common/StatusLabel/StatusLabel";
import type { TableColumn } from "@/components/common/Table/Table";
import type { MemberTableRow } from "@/app/types/types";
import useFetchMembers, { Member } from "./useFetchMembers";
import { calculateMonthlyRate } from "./useCalculatMonthlyRate";
import PAGE_SIZE from "@/app/constants/usePage";

const memberTableColumns: TableColumn<MemberTableRow>[] = [
  {
    label: "要員氏名",
    key: "memberName",
    render: (row) => (
      <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
        <Avatar sx={{ width: 36, height: 36, bgcolor: "#CBD5E1" }} />
        <Box>
          <Typography sx={{ fontSize: 14, color: "#212121", fontWeight: 600 }}>
            {row.memberName}
          </Typography>
          <Typography sx={{ fontSize: 12, color: "#94A3B8", lineHeight: 1.4 }}>
            {row.nameKana}
          </Typography>
        </Box>
      </Stack>
    ),
  },
  {
    label: "主要スキル",
    key: "mainSkills",
    render: (row) => (
      <Stack direction="row" spacing={0.5}>
        {row.mainSkills.map((skill) => (
          <StatusLabelComponent key={skill}>{skill}</StatusLabelComponent>
        ))}
      </Stack>
    ),
  },
  {
    label: "単価 / 経験年数",
    key: "offerRate",
    render: (row) => (
      <Box>
        <Typography
          sx={{
            fontSize: 14,
            color: "#212121",
            lineHeight: 1.4,
            fontWeight: 600,
          }}
        >
          {calculateMonthlyRate(row.offerRate)}万円/月
        </Typography>
        <Typography sx={{ fontSize: 12, color: "#64748B", lineHeight: 1.4 }}>
          経験 {row.experienceYears}年
        </Typography>
      </Box>
    ),
  },
  { label: "稼働可能時期", key: "statuses" },
  {
    label: "スキルシート",
    key: "skillSheetUrl",
    render: (row) => (
      <LinkComponent
        href={row.skillSheetUrl}
        underline="none"
        onClick={(event) => event.stopPropagation()}
      >
        参照する
      </LinkComponent>
    ),
  },
  {
    label: "アクション",
    key: "id",
    render: (row) => (
      <Stack direction="row" spacing={1.5}>
        <LinkComponent
          href={`/member/${row.id}`}
          underline="none"
          onClick={(event) => event.stopPropagation()}
        >
          詳細
        </LinkComponent>
        <LinkComponent
          href={`/member/${row.id}/edit`}
          underline="none"
          onClick={(event) => event.stopPropagation()}
        >
          編集
        </LinkComponent>
      </Stack>
    ),
  },
];

export const useMemberPage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isLoading } = useFetchMembers();

  const columns = memberTableColumns;

  //Tableのデータに合わせて整形
  const members = (data ?? []).map((member: Member) => ({
    ...member,
    id: member.memberId,
  }));

  const totalPages = Math.max(1, Math.ceil(members.length / PAGE_SIZE));
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const rows = members.slice(startIndex, startIndex + PAGE_SIZE);

  const handleAdd = () => {
    router.push("/member/create");
  };

  const handleRowClick = (row: MemberTableRow) => {
    router.push(`/member/${row.id}`);
  };

  return {
    columns,
    rows,
    handleAdd,
    handleRowClick,
    paging: {
      currentPage,
      totalPages,
      onPageChange: setCurrentPage,
    },
  };
};
