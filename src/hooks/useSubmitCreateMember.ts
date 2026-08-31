"use client";

import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";
import { mockDelay } from "@/utils/mockDelay";

const CREATE_MEMBER_KEY = "mock://members/create";

const createMember = async () => {
  await mockDelay();
};

export const useSubmitCreateMember = () => {
  const router = useRouter();
  const { trigger, isMutating: isLoading } = useSWRMutation(
    CREATE_MEMBER_KEY,
    createMember,
  );

  const handleCreate = async () => {
    await trigger();
    router.push("/member");
  };

  return { handleCreate, isLoading };
};
