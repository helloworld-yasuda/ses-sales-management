import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AuthProvider } from "@/contexts/AuthContext";
import LoginPage from "./page";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

vi.mock("next/image", () => ({
  default: ({
    alt,
    src,
    width,
    height,
  }: {
    alt: string;
    src: string;
    width: number;
    height: number;
  }) => <img alt={alt} src={src} width={width} height={height} />,
}));

const renderLoginPage = () =>
  render(
    <AuthProvider>
      <LoginPage />
    </AuthProvider>,
  );

describe("LoginPage", () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  it("ログイン成功時に /company へ遷移する", async () => {
    const user = userEvent.setup();
    renderLoginPage();

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
      expect(pushMock).toHaveBeenCalledWith("/company");
    });
  });

  it("バリデーションエラー時は遷移しない", async () => {
    const user = userEvent.setup();
    renderLoginPage();

    await user.click(screen.getByRole("button", { name: "ログイン" }));

    expect(
      await screen.findByText("メールアドレスは必須です"),
    ).toBeInTheDocument();
    expect(pushMock).not.toHaveBeenCalled();
  });
});
