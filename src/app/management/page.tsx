"use client";

import ButtonComponent from "@/components/common/Button/Button";
import { Box, Stack } from "@mui/material";
import TableComponent from "@/components/common/Table/Table";
import { useManagementPage } from "@/hooks/useManagementPage";
import { Paging } from "@/components/common/Paging/Paging";
import AppLayout from "@/components/Layout/AppLayout";

const ManagementPage = () => {
  const { columns, rows, handleAdd, handleRowClick, paging } =
    useManagementPage();

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
      <Box sx={{ p: 3 }}>
        <TableComponent
          columns={columns}
          rows={rows}
          onRowClick={handleRowClick}
        />
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

export default ManagementPage;
