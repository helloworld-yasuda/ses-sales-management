import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import LoginForm from "./LoginForm";

describe("LoginForm", () => {
  it("タイトルと説明文が表示される", () => {
    render(<LoginForm />);

    expect(
      screen.getByRole("heading", { name: "ログイン" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("アカウント情報を入力してログインしてください。"),
    ).toBeInTheDocument();
  });

  it("未入力で送信すると必須エラーが表示される", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.click(screen.getByRole("button", { name: "ログイン" }));

    expect(
      await screen.findByText("メールアドレスは必須です"),
    ).toBeInTheDocument();
    expect(screen.getByText("パスワードは必須です")).toBeInTheDocument();
  });

  it("メール形式が不正だとエラーが表示される", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(
      screen.getByPlaceholderText("メールアドレスを入力してください"),
      "invalid-email",
    );
    await user.type(
      screen.getByPlaceholderText("パスワードを入力してください"),
      "password",
    );
    await user.click(screen.getByRole("button", { name: "ログイン" }));

    expect(
      await screen.findByText("メールアドレスの形式が正しくありません"),
    ).toBeInTheDocument();
  });

  it("パスワードが6文字未満だとエラーが表示される", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(
      screen.getByPlaceholderText("メールアドレスを入力してください"),
      "sales@example.com",
    );
    await user.type(
      screen.getByPlaceholderText("パスワードを入力してください"),
      "12345",
    );
    await user.click(screen.getByRole("button", { name: "ログイン" }));

    expect(
      await screen.findByText("パスワードは6文字以上で入力してください"),
    ).toBeInTheDocument();
  });

  it("正しい入力で onLogin が呼ばれる", async () => {
    const user = userEvent.setup();
    const onLogin = vi.fn();
    render(<LoginForm onLogin={onLogin} />);

    await user.type(
      screen.getByPlaceholderText("メールアドレスを入力してください"),
      "sales@example.com",
    );
    await user.type(
      screen.getByPlaceholderText("パスワードを入力してください"),
      "password",
    );
    await user.click(screen.getByRole("button", { name: "ログイン" }));

    await waitFor(() => {
      expect(onLogin).toHaveBeenCalledWith({
        email: "sales@example.com",
        password: "password",
      });
    });
  });

  it("onLogin が失敗するとエラーメッセージが表示される", async () => {
    const user = userEvent.setup();
    const onLogin = vi
      .fn()
      .mockRejectedValue(
        new Error("メールアドレスまたはパスワードが正しくありません"),
      );
    render(<LoginForm onLogin={onLogin} />);

    await user.type(
      screen.getByPlaceholderText("メールアドレスを入力してください"),
      "sales@example.com",
    );
    await user.type(
      screen.getByPlaceholderText("パスワードを入力してください"),
      "password",
    );
    await user.click(screen.getByRole("button", { name: "ログイン" }));

    expect(
      await screen.findByText(
        "メールアドレスまたはパスワードが正しくありません",
      ),
    ).toBeInTheDocument();
  });
});
