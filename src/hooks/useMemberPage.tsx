"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import LinkComponent from "@/components/common/Link/Link";
import StatusLabelComponent from "@/components/common/StatusLabel/StatusLabel";
import type { TableColumn } from "@/components/common/Table/Table";
import {
  mockPersonnelRows,
  type PersonnelRow,
} from "@/components/common/Table/Table.mock";
import { mockSidebarProps } from "@/components/Layout/Sidebar/Sidebar.mock";
import type { NavKey } from "@/components/Layout/Sidebar/Sidebar";

// TODO: API 接続後は取得データに差し替え
const PAGE_SIZE = 10;

const memberTableColumns: TableColumn<PersonnelRow>[] = [
  {
    label: "要員氏名",
    key: "name",
    render: (row) => (
      <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
        <Avatar sx={{ width: 36, height: 36, bgcolor: "#CBD5E1" }} />
        <Box>
          <Typography sx={{ fontSize: 14, color: "#212121", lineHeight: 1.4 }}>
            {row.name}
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
    key: "skills",
    render: (row) => (
      <Stack direction="row" spacing={0.5}>
        {row.skills.split(",").map((skill) => (
          <StatusLabelComponent key={skill}>{skill}</StatusLabelComponent>
        ))}
      </Stack>
    ),
  },
  {
    label: "単価 / 経験年数",
    key: "unitPrice",
    render: (row) => (
      <Box>
        <Typography sx={{ fontSize: 14, color: "#212121", lineHeight: 1.4 }}>
          {row.unitPrice}
        </Typography>
        <Typography sx={{ fontSize: 12, color: "#64748B", lineHeight: 1.4 }}>
          {row.experienceYears}
        </Typography>
      </Box>
    ),
  },
  { label: "稼働可能時期", key: "availability" },
  {
    label: "スキルシート",
    key: "nameKana",
    render: (row) => (
      <LinkComponent
        href={`/member/${row.id}/skill-sheet`}
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

  // TODO: API 接続後は取得データに差し替え
  const selected: NavKey = "engineers";
  const sidebar = {
    ...mockSidebarProps,
    selected,
  };
  const columns = memberTableColumns;
  const allRows = mockPersonnelRows;

  const totalPages = Math.max(1, Math.ceil(allRows.length / PAGE_SIZE));
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const rows = allRows.slice(startIndex, startIndex + PAGE_SIZE);

  const handleAdd = () => {
    router.push("/member/create");
  };

  const handleRowClick = (row: PersonnelRow) => {
    router.push(`/member/${row.id}`);
  };

  return {
    sidebar,
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
