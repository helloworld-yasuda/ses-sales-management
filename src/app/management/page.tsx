"use client";

import Sidebar from "@/components/Layout/Sidebar/Sidebar";
import Header from "@/components/Layout/Header/Header";
import ButtonComponent from "@/components/common/Button/Button";
import { Box, Stack } from "@mui/material";
import TableComponent from "@/components/common/Table/Table";
import { useManagementPage } from "@/hooks/useManagementPage";
import { Paging } from "@/components/common/Paging/Paging";

const ManagementPage = () => {
  const { sidebar, columns, rows, handleAdd, handleRowClick, paging } =
    useManagementPage();

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar {...sidebar} />
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Header
          title="取引先管理"
          actions={
            <ButtonComponent withIcon onClick={handleAdd}>
              新規登録
            </ButtonComponent>
          }
        />
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
      </Box>
    </Box>
  );
};

export default ManagementPage;
