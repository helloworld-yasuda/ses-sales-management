"use client";

import { Box, Stack } from "@mui/material";
import ButtonComponent from "@/components/common/Button/Button";
import TableComponent from "@/components/common/Table/Table";
import { Paging } from "@/components/common/Paging/Paging";
import AppLayout from "@/components/Layout/AppLayout";
import { useMemberPage } from "@/hooks/useMemberPage";

const MemberPage = () => {
  const { columns, rows, handleAdd, handleRowClick, paging } = useMemberPage();

  return (
    <AppLayout
      title="要員管理"
      actions={
        <ButtonComponent
          withIcon
          onClick={handleAdd}
          sx={{ backgroundColor: "#2563EB", color: "#FFFFFF" }}
        >
          要員の新規追加
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

export default MemberPage;
