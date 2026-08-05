import { Box, Button, Stack, TextField, Typography } from "@mui/material";
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

type LoginFormProps = {
  onLogin?: (data: LoginFormValues) => Promise<void> | void;
};

const LoginForm = ({ onLogin }: LoginFormProps) => {
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

  // ログインボタンをクリックした時の処理
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

  return (
    <Box
      sx={{
        margin: "auto",
        width: "400px",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={4}>
          <Stack spacing={1}>
            <Typography variant="h5" sx={{ fontWeight: 700, fontSize: "28px" }}>
              ログイン
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: "14px", color: "#64748B", fontWeight: 400 }}
            >
              アカウント情報を入力してログインしてください。
            </Typography>
          </Stack>
          <Stack spacing={2.5}>
            <Stack spacing={1}>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, fontSize: "13px", color: "#0F172A" }}
              >
                メールアドレス
              </Typography>
              <TextField
                type="email"
                placeholder="メールアドレスを入力してください"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Stack>
            <Stack spacing={1}>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, fontSize: "13px", color: "#0F172A" }}
              >
                パスワード
              </Typography>
              <TextField
                type="password"
                placeholder="パスワードを入力してください"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Stack>
            {submitError && (
              <Typography variant="body2" sx={{ color: "error.main" }}>
                {submitError}
              </Typography>
            )}
          </Stack>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isSubmitting}
            sx={{ height: "45px" }}
          >
            ログイン
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default LoginForm;
