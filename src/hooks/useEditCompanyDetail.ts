"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useParams } from "next/navigation";
import useCompanyDetail from "./useCompanyDetail";

const editCompanyFormSchema = z.object({
  companyName: z.string().trim().min(1, "会社名を入力してください"),
  contactPerson: z.string().trim().min(1, "相手企業担当者を入力してください"),
  salesPerson: z.string().trim().min(1, "自社営業担当者を入力してください"),
  email: z.string().nullable(),
  companyEmail: z.string().nullable(),
  rank: z.string().nullable(),
  mainArea: z.string().nullable(),
  interviewAchievement: z.string().nullable(),
  deliveryAvailability: z.string().min(1, "配信の有無を選択してください"),
  lineAvailability: z.string().min(1, "Lineの有無を選択してください"),
});

export type EditCompanyFormValues = z.infer<typeof editCompanyFormSchema>;

type UseEditCompanyFormParams = {
  onEditCompany?: (data: EditCompanyFormValues) => Promise<void> | void;
};

const useEditCompanyDetail = ({
  onEditCompany,
}: UseEditCompanyFormParams = {}) => {
  const { id } = useParams<{ id: string }>();
  const { company } = useCompanyDetail(id);

  const [submitError, setSubmitError] = useState<string | null>(null);

  type SelectBoxOptions = {
    label: string;
    value: string;
  };
  const RankOptions: SelectBoxOptions[] = [
    { label: "A", value: "A" },
    { label: "B", value: "B" },
    { label: "C", value: "C" },
  ];

  const InterviewOptions: SelectBoxOptions[] = [
    { label: "有", value: "0" },
    { label: "無", value: "1" },
  ];

  const DeliveryOptions: SelectBoxOptions[] = [
    { label: "有", value: "0" },
    { label: "無", value: "1" },
  ];

  const LineOptions: SelectBoxOptions[] = [
    { label: "有", value: "0" },
    { label: "無", value: "1" },
  ];

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditCompanyFormValues>({
    resolver: zodResolver(editCompanyFormSchema),
    defaultValues: {
      companyName: company?.name,
      contactPerson: company?.representative,
      salesPerson: company?.salesName,
      email: company?.email,
      companyEmail: company?.companyEmail,
      rank: company?.rank,
      mainArea: company?.mainArea,
      interviewAchievement: company?.interviewAchievement,
      deliveryAvailability: company?.deliveryAvailability,
      lineAvailability: company?.lineAvailability,
    },
  });

  // 会社登録フォームの送信処理
  const onSubmit = async (data: EditCompanyFormValues) => {
    try {
      await onEditCompany?.(data);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "会社情報の更新に失敗しました",
      );
    }
  };

  return {
    DeliveryOptions,
    LineOptions,
    RankOptions,
    InterviewOptions,
    control,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    submitError,
    onSubmit,
  };
};
export default useEditCompanyDetail;
