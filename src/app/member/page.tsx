"use client";

import { useRouter } from "next/navigation";
import ButtonComponent from "@/components/common/Button/Button";
import AppLayout from "@/components/Layout/AppLayout";

const MemberPage = () => {
  const router = useRouter();

  return (
    <AppLayout
      title="要員管理"
      actions={
        <ButtonComponent
          withIcon
          onClick={() => router.push("/member/create")}
        >
          要員の新規追加
        </ButtonComponent>
      }
    />
  );
};

export default MemberPage;
