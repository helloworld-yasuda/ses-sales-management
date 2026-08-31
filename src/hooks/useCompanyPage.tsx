"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Stack } from "@mui/material";
import RankLabelComponent from "@/components/common/RankLabel/RankLabel";
import type { TableColumn } from "@/components/common/Table/Table";
import type { CompanyTableRow } from "@/app/types/types";
import LinkComponent from "@/components/common/Link/Link";
import { useFetchData } from "./useFetchData";
import type { Client } from "@/app/types/types";
import PAGE_SIZE from "@/app/constants/usePage";

// 取引先一覧テーブルのカラム定義
const companyTableColumns: TableColumn<CompanyTableRow>[] = [
  { label: "会社名", key: "clientName" },
  { label: "営業担当者", key: "contactPerson" },
  { label: "主要領域", key: "primaryDomain" },
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
          href={`/company/${row.id}`}
          underline="none"
          onClick={(event) => event.stopPropagation()}
        >
          詳細
        </LinkComponent>
        <LinkComponent
          href={`/company/${row.id}/edit`}
          underline="none"
          onClick={(event) => event.stopPropagation()}
        >
          編集
        </LinkComponent>
      </Stack>
    ),
  },
];

export const useCompanyPage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading } = useFetchData("clients");
  const columns = companyTableColumns;

  //Tableのデータに合わせて整形
  const clients = (data ?? []).map((company: Client) => ({
    ...company,
    id: company.clientId,
    rank: company.clientRank,
  }));

  const totalPages = Math.max(1, Math.ceil(clients.length / PAGE_SIZE));
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const rows = clients.slice(startIndex, startIndex + PAGE_SIZE);

  const handleAdd = () => {
    router.push("/company/create");
  };

  const handleRowClick = (row: CompanyTableRow) => {
    router.push(`/company/${row.id}`);
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
