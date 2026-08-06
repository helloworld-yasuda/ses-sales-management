"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Stack } from "@mui/material";
import RankLabelComponent from "@/components/common/RankLabel/RankLabel";
import type { TableColumn } from "@/components/common/Table/Table";
import {
  mockTableRows,
  type CompanyRow,
} from "@/components/common/Table/Table.mock";
import { mockSidebarProps } from "@/components/Layout/Sidebar/Sidebar.mock";
import type { NavKey } from "@/components/Layout/Sidebar/Sidebar";
import LinkComponent from "@/components/common/Link/Link";

const PAGE_SIZE = 10;

// 取引先一覧テーブルのカラム定義
const managementTableColumns: TableColumn<CompanyRow>[] = [
  { label: "会社名", key: "companyName" },
  { label: "営業担当者", key: "contactPerson" },
  { label: "主要領域", key: "mainArea" },
  { label: "自社営業担当", key: "salesPerson" },
  {
    label: "ランク",
    key: "rank",
    render: (row) => <RankLabelComponent rank={row.rank} />,
  },
  {
    label: "操作",
    key: "id",
    render: (row) => (
      <Stack direction="row" spacing={1.5}>
        <LinkComponent
          href={`/management/${row.id}`}
          underline="none"
          onClick={(event) => event.stopPropagation()}
        >
          詳細
        </LinkComponent>
        <LinkComponent
          href={`/management/${row.id}/edit`}
          underline="none"
          onClick={(event) => event.stopPropagation()}
        >
          編集
        </LinkComponent>
      </Stack>
    ),
  },
];

export const useManagementPage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  // TODO: API 接続後は取得データに差し替え
  const selected: NavKey = "partners";
  const sidebar = {
    ...mockSidebarProps,
    selected,
  };
  const columns = managementTableColumns;
  const allRows = mockTableRows;

  const totalPages = Math.max(1, Math.ceil(allRows.length / PAGE_SIZE));
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const rows = allRows.slice(startIndex, startIndex + PAGE_SIZE);

  const handleAdd = () => {
    router.push("/management/create");
  };

  const handleRowClick = (row: CompanyRow) => {
    router.push(`/management/${row.id}`);
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
