"use client";

import { useRouter } from "next/navigation";
import ButtonComponent from "@/components/common/Button/Button";
import { usePageHeader } from "@/hooks/usePageHeader";

const ManagementPage = () => {
  const router = useRouter();

  usePageHeader({
    title: "取引先管理",
    actions: (
      <ButtonComponent
        withIcon
        onClick={() => router.push("/management/create")}
      >
        新規追加
      </ButtonComponent>
    ),
  });

  return null;
};

export default ManagementPage;
