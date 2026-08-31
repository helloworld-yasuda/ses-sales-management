"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { SalesSummary } from "@/components/member/SalesSummary.mock";

const requiredText = (message: string) => z.string().trim().min(1, message);

const summaryFormSchema = z.object({
  initial: requiredText("氏名（イニシャル）を入力してください"),
  age: requiredText("年齢を入力してください"),
  mainSkills: requiredText("メイン技術を入力してください"),
  experience: requiredText("実務経験年数を入力してください"),
  startDate: requiredText("稼働開始を入力してください"),
  unitPrice: requiredText("単価を選択してしてください"),
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

export type SummaryFormValues = z.infer<typeof summaryFormSchema>;

export const toSummaryFormValues = (
  summary: SalesSummary,
): SummaryFormValues => ({
  initial: summary.initial,
  age: summary.age,
  mainSkills: summary.mainskills,
  experience: summary.experience,
  startDate: summary.startDate,
  unitPrice: summary.unitPrice,
  nearestStation: summary.nearestStation,
  affiliation: summary.affiliation,
  features: summary.features,
  frontendSkills: summary.frontendSkills,
  backendSkills: summary.backendSkills,
  databaseSkills: summary.databaseSkills,
  aiSkills: summary.aiSkills,
  desiredConditions: summary.desiredConditions,
  parallelStatus: summary.parallelStatus,
  availableDate: summary.availableDate,
  avaiableAreas: summary.avaiableAreas,
});

type UseSummaryFormParams = {
  defaultValues: SummaryFormValues;
  onSave?: (data: SummaryFormValues) => Promise<void> | void;
};

const useSummaryForm = ({ defaultValues, onSave }: UseSummaryFormParams) => {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SummaryFormValues>({
    resolver: zodResolver(summaryFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: SummaryFormValues) => {
    setSubmitError(null);
    try {
      await onSave?.(data);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "営業サマリーの保存に失敗しました",
      );
    }
  };

  return {
    control,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    submitError,
    onSubmit,
  };
};

export default useSummaryForm;
