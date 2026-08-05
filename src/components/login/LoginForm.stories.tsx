import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";
import LoginForm from "./LoginForm";

const meta: Meta<typeof LoginForm> = {
  title: "Login/LoginForm",
  component: LoginForm,
  tags: ["autodocs"],
  args: {
    // Actions パネルに表示されるモック
    onLogin: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {};

/** 成功するログインのモック */
export const SuccessLogin: Story = {
  args: {
    onLogin: fn(async (data) => {
      // API の代わり（少し待って成功）
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log("login success", data);
      alert(`ログイン成功: ${data.email}`);
    }),
  },
};

/** 失敗するログインのモック */
export const FailedLogin: Story = {
  args: {
    onLogin: fn(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      throw new Error("メールアドレスまたはパスワードが正しくありません");
    }),
  },
};
