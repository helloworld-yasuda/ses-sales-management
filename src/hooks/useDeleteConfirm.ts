"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";
import { mockDelay } from "@/utils/mockDelay";

type UseDeleteConfirmParams = {
  mutationKey: string;
  redirectPath: string;
};

const deleteResource = async () => {
  await mockDelay();
};

export const useDeleteConfirm = ({
  mutationKey,
  redirectPath,
}: UseDeleteConfirmParams) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { trigger, isMutating: isLoading } = useSWRMutation(
    mutationKey,
    deleteResource,
  );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleConfirm = async () => {
    closeModal();
    await trigger();
    router.push(redirectPath);
  };

  return {
    isModalOpen,
    isLoading,
    openModal,
    closeModal,
    handleConfirm,
  };
};
