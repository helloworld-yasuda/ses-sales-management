"use client";

import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";
import { mockDelay } from "@/utils/mockDelay";

const CREATE_SALES_SUMMARY_KEY = "mock://summaries/create";

const createSalesSummary = async () => {
  await mockDelay();
};

export const useSubmitCreateSalesSummary = () => {
  const router = useRouter();
  const { trigger, isMutating: isLoading } = useSWRMutation(
    CREATE_SALES_SUMMARY_KEY,
    createSalesSummary,
  );

  const handleCreate = async () => {
    await trigger();
    router.push("/member");
  };

  return { handleCreate, isLoading };
};
