"use client";

import { useRouter } from "next/navigation";
import ButtonComponent from "@/components/common/Button/Button";
import AppLayout from "@/components/Layout/AppLayout";

const ManagementPage = () => {
  const router = useRouter();

  return (
    <AppLayout
      title="取引先管理"
      actions={
        <ButtonComponent
          withIcon
          onClick={() => router.push("/management/create")}
        >
          新規追加
        </ButtonComponent>
      }
    />
  );
};

export default ManagementPage;
