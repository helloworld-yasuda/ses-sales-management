"use client";

import { Box, Stack } from "@mui/material";
import Sidebar from "@/components/Layout/Sidebar/Sidebar";
import Header from "@/components/Layout/Header/Header";
import ButtonComponent from "@/components/common/Button/Button";
import TableComponent from "@/components/common/Table/Table";
import { Paging } from "@/components/common/Paging/Paging";
import { useMemberPage } from "@/hooks/useMemberPage";

const MemberPage = () => {
  const { sidebar, columns, rows, handleAdd, handleRowClick, paging } =
    useMemberPage();

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar {...sidebar} />
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Header
          title="要員管理"
          actions={
            <ButtonComponent withIcon onClick={handleAdd}>
              要員の新規追加
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

export default MemberPage;
