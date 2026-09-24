"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

const createMemberFormSchema = z.object({
  memberName: z.string().trim().min(1, "氏名を入力してください"),
  nameKana: z.string().trim().min(1, "フリガナを入力してください"),
  affiliation: z.string().trim().min(1, "所属会社 / 属性を入力してください"),
  nearestStation: z.string().trim().min(1, "最寄駅を入力してください"),
  upperCompany: z.string().trim().min(1, "上位会社を入力してください"),
  paymentTerms: z.string().trim().min(1, "支払サイトを入力してください"),
  renewal: z.string().trim().min(1, "更新頻度を入力してください"),
  experienceYears: z.string().trim().min(1, "経験年数を入力してください"),
  unitPrice: z.string().trim().min(1, "提案単価を選択してください"),
  skills: z.string().trim().min(1, "主要スキル1 を選択してください"),
  skills2: z.string().trim().min(1, "主要スキル2 を選択してください"),
  skillSheet: z.string().trim().min(1, "スキルシートURLを入力してください"),
  remarks: z.string().nullable(),
  availability: z.string().trim().min(1, "稼働ステータスを選択してください"),
});

export type CreateMemberFormValues = z.infer<typeof createMemberFormSchema>;

type UseCreateCompanyFormParams = {
  onCreateMember?: (data: CreateMemberFormValues) => Promise<void> | void;
};

const useCreateMember = ({
  onCreateMember,
}: UseCreateCompanyFormParams = {}) => {
  const [submitError, setSubmitError] = useState<string | null>(null);

  type SelectBoxOptions = {
    label: string;
    value: string;
  };
  const SkillsOptions: SelectBoxOptions[] = [
    { label: "React", value: "0" },
    { label: "TypeScript", value: "1" },
    { label: "Node.js", value: "2" },
    { label: "Spring Boot", value: "4" },
    { label: "Docker", value: "5" },
    { label: "Kubernetes", value: "6" },
    { label: "Terraform", value: "7" },
    { label: "Ansible", value: "8" },
    { label: "Chef", value: "9" },
    { label: "AWS", value: "10" },
  ];

  const SkillsOptions2: SelectBoxOptions[] = [
    { label: "Java", value: "0" },
    { label: "Docker", value: "1" },
    { label: "Kubernetes", value: "2" },
    { label: "Terraform", value: "3" },
    { label: "Ansible", value: "4" },
    { label: "Chef", value: "5" },
    { label: "Spring Boot", value: "6" },
  ];

  const StatusOptions: SelectBoxOptions[] = [
    { label: "即可能", value: "0" },
    { label: "稼働中", value: "1" },
    { label: "休職中", value: "2" },
  ];

  const UnitPriceOptions: SelectBoxOptions[] = [
    { label: "40万円", value: "400000" },
    { label: "50万円", value: "500000" },
    { label: "60万円", value: "600000" },
    { label: "70万円", value: "700000" },
    { label: "80万円", value: "800000" },
    { label: "90万円", value: "900000" },
    { label: "100万円", value: "1000000" },
  ];

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateMemberFormValues>({
    resolver: zodResolver(createMemberFormSchema),
    defaultValues: {
      memberName: "",
      nameKana: "",
      affiliation: "",
      nearestStation: "",
      upperCompany: "",
      paymentTerms: "",
      renewal: "",
      experienceYears: "",
      skills: "",
      skills2: "",
      skillSheet: "",
      remarks: "",
      availability: "",
      unitPrice: "",
    },
  });

  // 会社登録フォームの送信処理
  const onSubmit = async (data: CreateMemberFormValues) => {
    try {
      await onCreateMember?.(data);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "要員登録に失敗しました",
      );
    }
  };

  return {
    SkillsOptions,
    SkillsOptions2,
    StatusOptions,
    UnitPriceOptions,
    control,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    submitError,
    onSubmit,
  };
};
export default useCreateMember;
