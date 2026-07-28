"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const Login = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
      }}
    >
      <Card
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 600,
          height: 400,
          margin: "10% auto",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
        }}
      >
        <CardContent sx={{ px: 10, py: 5 }}>
          <Stack
            component="form"
            spacing={4}
            noValidate
            onSubmit={(e) => e.preventDefault()}
          >
            <Typography
              component="h1"
              variant="h4"
              sx={{ textAlign: "center", fontWeight: 600 }}
            >
              Login
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="body1" sx={{ textAlign: "center" }}>
                ユーザーID
              </Typography>
              <TextField
                placeholder="ユーザーIDを入力"
                name="userId"
                autoComplete="username"
                fullWidth
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="body1" sx={{ textAlign: "center" }}>
                パスワード
              </Typography>
              <TextField
                type="password"
                placeholder="パスワードを入力"
                name="password"
                autoComplete="current-password"
                fullWidth
              />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                type="submit"
                variant="contained"
                size="medium"
                sx={{ width: 150 }}
              >
                ログイン
              </Button>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
