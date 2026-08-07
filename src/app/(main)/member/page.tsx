"use client";

import ButtonComponent from "@/components/common/Button/Button";
import { usePageHeader } from "@/hooks/usePageHeader";
import { useRouter } from "next/navigation";

const MemberPage = () => {
  const router = useRouter();

  usePageHeader({
    title: "要員管理",
    actions: (
      <ButtonComponent withIcon onClick={() => router.push("/member/create")}>
        要員の新規追加
      </ButtonComponent>
    ),
  });

  return null;
};

export default MemberPage;
