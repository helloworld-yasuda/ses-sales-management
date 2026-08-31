"use client";

import { Box, Stack } from "@mui/material";
import ButtonComponent from "@/components/common/Button/Button";
import TableComponent from "@/components/common/Table/Table";
import { Paging } from "@/components/common/Paging/Paging";
import AppLayout from "@/components/Layout/AppLayout";
import MemberEmptyState from "@/components/member/MemberEmptyState";
import { useMemberPage } from "@/hooks/useMemberPage";

const MemberPage = () => {
  const { columns, rows, handleAdd, handleRowClick, paging } = useMemberPage();
  const isEmpty = rows.length === 0;

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
            emptyContent={<MemberEmptyState onAdd={handleAdd} />}
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

export default MemberPage;
