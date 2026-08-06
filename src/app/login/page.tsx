"use client";

import { Stack, Typography } from "@mui/material";
import LoginForm from "@/components/login/LoginForm";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  const handleLogin = async () => {
    // TODO: ログイン API 呼び出し
    router.push("/management");
  };

  return (
    <Stack direction="row" sx={{ width: "100%", height: "100vh" }}>
      <Stack
        spacing={3}
        sx={{
          backgroundImage: "url('/login-backgroundimage.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "50%",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image src="/large-logo.png" alt="login-image" width={64} height={64} />
        <Typography variant="h4" sx={{ color: "#FFFFFF" }}>
          SES営業管理システム
        </Typography>
        <Typography variant="body1" sx={{ color: "#93C5FD" }}>
          エンジニア要員とプロジェクト案件の自動マッチングと顧客管理
        </Typography>
      </Stack>
      <LoginForm onLogin={handleLogin} />
    </Stack>
  );
};

export default Login;
