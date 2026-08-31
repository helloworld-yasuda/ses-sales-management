"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

const createSalesSummaryFormSchema = z.object({
  initial: z.string().trim().min(1, "氏名（イニシャル）を入力してください"),
  age: z.string().trim().min(1, "年齢を入力してください"),
  mainSkills: z.string().trim().min(1, "メイン技術を入力してください"),
  experience: z.string().trim().min(1, "実務経験年数を入力してください"),
  startDate: z.string().trim().min(1, "稼働開始を入力してください"),
  unitPrice: z.string().trim().min(1, "単価を選択してしてください"),
  nearestStation: z.string().nullable(),
  affiliation: z.string().nullable(),
  features: z.string().nullable(),
  frontendSkills: z.string().nullable(),
  backendSkills: z.string().nullable(),
  databaseSkills: z.string().nullable(),
  aiSkills: z.string().nullable(),
  desiredConditions: z.string().nullable(),
  parallelStatus: z.string().nullable(),
  availableDate: z.string().nullable(),
  avaiableAreas: z.string().nullable(),
});

export type CreateSalesSummaryFormValues = z.infer<
  typeof createSalesSummaryFormSchema
>;

type UseCreateSalesSummaryFormParams = {
  onCreateSalesSummary?: (
    data: CreateSalesSummaryFormValues,
  ) => Promise<void> | void;
};

const useCreateSalesSummaryForm = ({
  onCreateSalesSummary,
}: UseCreateSalesSummaryFormParams = {}) => {
  const [submitError, setSubmitError] = useState<string | null>(null);

  type SelectBoxOptions = {
    label: string;
    value: string;
  };
  const unitPriceOptions: SelectBoxOptions[] = [
    { label: "40万円", value: "400000" },
    { label: "50万円", value: "500000" },
    { label: "60万円", value: "600000" },
    { label: "70万円", value: "700000" },
    { label: "80万円", value: "800000" },
  ];

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateSalesSummaryFormValues>({
    resolver: zodResolver(createSalesSummaryFormSchema),
    defaultValues: {
      initial: "",
      age: "",
      mainSkills: "",
      experience: "",
      startDate: "",
      unitPrice: "",
      nearestStation: "",
      affiliation: "",
      features: "",
      frontendSkills: "",
      backendSkills: "",
      databaseSkills: "",
      aiSkills: "",
      desiredConditions: "",
      parallelStatus: "",
      availableDate: "",
      avaiableAreas: "",
    },
  });

  // 営業サマリー登録フォームの送信処理
  const onSubmit = async (data: CreateSalesSummaryFormValues) => {
    try {
      await onCreateSalesSummary?.(data);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "営業サマリー登録に失敗しました",
      );
    }
  };

  return {
    unitPriceOptions,
    control,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    submitError,
    onSubmit,
  };
};
export default useCreateSalesSummaryForm;
