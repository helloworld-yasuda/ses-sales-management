"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

const createCompanyFormSchema = z.object({
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

export type CreateCompanyFormValues = z.infer<typeof createCompanyFormSchema>;

type UseCreateCompanyFormParams = {
  onCreateCompany?: (data: CreateCompanyFormValues) => Promise<void> | void;
};

const useCreateCompanyForm = ({
  onCreateCompany,
}: UseCreateCompanyFormParams = {}) => {
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
    { label: "0回", value: "0" },
    { label: "1回", value: "1" },
    { label: "2回", value: "2" },
    { label: "3回", value: "3" },
    { label: "4回", value: "4" },
    { label: "5回", value: "5" },
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
  } = useForm<CreateCompanyFormValues>({
    resolver: zodResolver(createCompanyFormSchema),
    defaultValues: {
      companyName: "",
      contactPerson: "",
      salesPerson: "",
      email: "",
      companyEmail: "",
      rank: "",
      mainArea: "",
      interviewAchievement: "",
      deliveryAvailability: "",
      lineAvailability: "",
    },
  });

  // 会社登録フォームの送信処理
  const onSubmit = async (data: CreateCompanyFormValues) => {
    try {
      await onCreateCompany?.(data);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "会社登録に失敗しました",
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
export default useCreateCompanyForm;
