"use client";

import ButtonComponent from "@/components/common/Button/Button";
import { Box, Stack } from "@mui/material";
import TableComponent from "@/components/common/Table/Table";
import CompanyEmptyState from "@/components/company/CompanyEmptyState";
import { useCompanyPage } from "@/hooks/useCompanyPage";
import { Paging } from "@/components/common/Paging/Paging";
import AppLayout from "@/components/Layout/AppLayout";

const CompanyPage = () => {
  const { columns, rows, handleAdd, handleRowClick, paging } = useCompanyPage();
  const isEmpty = rows.length === 0;

  return (
    <AppLayout
      title="取引先管理"
      actions={
        <ButtonComponent
          withIcon
          onClick={handleAdd}
          sx={{ backgroundColor: "#2563EB", color: "#FFFFFF" }}
        >
          新規登録
        </ButtonComponent>
      }
    >
      <Box
        sx={{
          p: 4,
          ...(isEmpty
            ? {
                flex: 1,
                minHeight: 0,
                display: "flex",
                flexDirection: "column",
              }
            : undefined),
        }}
      >
        <Box sx={isEmpty ? { flex: 1, minHeight: 0 } : undefined}>
          <TableComponent
            columns={columns}
            rows={rows}
            onRowClick={handleRowClick}
            emptyContent={<CompanyEmptyState onAdd={handleAdd} />}
          />
        </Box>
        <Stack
          direction="row"
          sx={{
            mt: 2,
            justifyContent: "flex-end",
          }}
        >
          <Paging {...paging} />
        </Stack>
      </Box>
    </AppLayout>
  );
};

export default CompanyPage;
