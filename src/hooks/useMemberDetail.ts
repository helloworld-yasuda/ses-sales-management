"use client";

import { useParams } from "next/navigation";
import { mockMemberDetail } from "@/components/member/MemberDetail.mock";

export const useMemberDetail = () => {
  const { id } = useParams();
  const member = mockMemberDetail.find((member) => member.id === id);
  return { member };
};
