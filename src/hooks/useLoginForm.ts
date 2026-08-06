import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, "メールアドレスは必須です")
    .regex(emailRegex, "メールアドレスの形式が正しくありません"),
  password: z
    .string()
    .min(1, "パスワードは必須です")
    .min(6, "パスワードは6文字以上で入力してください")
    .max(64, "パスワードは64文字以下で入力してください"),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

type UseLoginFormParams = {
  onLogin?: (data: LoginFormValues) => Promise<void> | void;
};

export const useLoginForm = ({ onLogin }: UseLoginFormParams = {}) => {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setSubmitError(null);
    try {
      await onLogin?.(data);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "ログインに失敗しました",
      );
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    submitError,
    onSubmit,
  };
};
