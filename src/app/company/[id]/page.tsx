"use client";

import { useParams } from "next/navigation";
import ButtonComponent from "@/components/common/Button/Button";
import Loading from "@/components/common/Loading/Loading";
import Modal from "@/components/common/Modal/Modal";
import AppLayout from "@/components/Layout/AppLayout";
import useCompanyDetail from "@/hooks/useCompanyDetail";
import { useDeleteConfirm } from "@/hooks/useDeleteConfirm";
import {
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";

const CompanyDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { fields, handleEdit } = useCompanyDetail(id);
  const { isModalOpen, isLoading, openModal, closeModal, handleConfirm } =
    useDeleteConfirm({
      mutationKey: "mock://clients/delete",
      redirectPath: "/company",
    });

  return (
    <AppLayout
      title="取引先詳細"
      actions={
        <Stack direction="row" spacing={1.5}>
          <ButtonComponent
            variant="outlined"
            color="error"
            onClick={openModal}
            sx={{
              fontWeight: 600,
              fontSize: 14,
              color: "#EF4444",
              borderRadius: 2,
            }}
          >
            削除する
          </ButtonComponent>
          <ButtonComponent
            onClick={handleEdit}
            sx={{
              fontWeight: 600,
              fontSize: 14,
              borderRadius: 2,
              backgroundColor: "#2563EB",
            }}
          >
            編集する
          </ButtonComponent>
        </Stack>
      }
    >
      <Card
        elevation={0}
        sx={{
          p: 3,
          m: 4,
          border: "1px solid #E2E8F0",
          borderRadius: 2,
          width: "612px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            borderBottom: "1px solid #F1F5F9",
            pb: 1,
            fontWeight: 700,
            fontSize: 18,
            color: "#0F172A",
          }}
        >
          基本会社情報
        </Typography>

        <Table size="small" sx={{ mt: 2 }}>
          <TableBody>
            {fields.map((field) => (
              <TableRow key={field.label}>
                <TableCell
                  sx={{
                    width: 200,
                    color: "#666666",
                    fontWeight: 500,
                    fontSize: 13,
                    border: "none",
                    pl: 0,
                    py: 1,
                  }}
                >
                  {field.label}
                </TableCell>
                <TableCell sx={{ border: "none", py: 1 }}>
                  {field.value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <Loading open={isLoading} />
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirm}
        title="取引先を削除しますか？"
        description="この操作は元に戻せません。関連するデータもすべて削除されます。"
      />
    </AppLayout>
  );
};

export default CompanyDetailPage;
