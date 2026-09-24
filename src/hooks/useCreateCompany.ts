"use client";

import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";
import { mockDelay } from "@/utils/mockDelay";

const CREATE_COMPANY_KEY = "mock://clients/create";

const createCompany = async () => {
  await mockDelay();
};

export const useCreateCompany = () => {
  const router = useRouter();
  const { trigger, isMutating: isLoading } = useSWRMutation(
    CREATE_COMPANY_KEY,
    createCompany,
  );

  const handleCreate = async () => {
    await trigger();
    router.push("/company");
  };

  return { handleCreate, isLoading };
};
