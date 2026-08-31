import { describe, it, vi, beforeEach } from "vitest";
import CreateSalesSummaryForm from "./CreateSalesSummaryForm";
import { mockAuthUser } from "@/contexts/AuthContext.mock";
import { render, screen, waitFor } from "@testing-library/react";
import { expect } from "vitest";
import { userEvent } from "@testing-library/user-event";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    replace: vi.fn(),
  }),
  usePathname: () => "/member/createSummary",
}));

vi.mock("@/contexts/AuthContext", () => ({
  useAuth: () => ({
    user: mockAuthUser,
    login: vi.fn(),
    logout: vi.fn(),
  }),
}));

describe("CreateSalesSummaryForm", () => {
  beforeEach(() => {
    pushMock.mockClear();
  });
  it("正しい入力でonCreateSalesSummaryが呼ばれる", async () => {
    const user = userEvent.setup({ delay: null });
    const onCreateSalesSummary = vi.fn();
    render(
      <CreateSalesSummaryForm onCreateSalesSummary={onCreateSalesSummary} />,
    );
    await user.type(screen.getByPlaceholderText("例: T.S"), "Y.S");
    await user.type(screen.getByPlaceholderText("例: 28歳"), "25歳");
    await user.type(
      screen.getByPlaceholderText("例: Java, Spring Boot"),
      "React, Next.js",
    );
    await user.type(screen.getByPlaceholderText("例: 5年"), "3年");
    await user.type(screen.getByPlaceholderText("例: 即日〜, 8月〜"), "10月〜");
    await user.click(screen.getByLabelText("unitPrice"));
    await user.click(await screen.findByRole("option", { name: "50万円" }));
    await user.click(screen.getByRole("button", { name: "保存する" }));
    await waitFor(() => {
      expect(onCreateSalesSummary).toHaveBeenCalledWith(
        expect.objectContaining({
          initial: "Y.S",
          age: "25歳",
          mainSkills: "React, Next.js",
          experience: "3年",
          startDate: "10月〜",
          unitPrice: "500000",
        }),
      );
    });
  });

  it("未入力の項目がある場合はエラーメッセージが表示される", async () => {
    const user = userEvent.setup({ delay: null });
    const onCreateSalesSummary = vi.fn();
    render(
      <CreateSalesSummaryForm onCreateSalesSummary={onCreateSalesSummary} />,
    );
    await user.click(screen.getByRole("button", { name: "保存する" }));
    expect(
      await screen.findByText("氏名（イニシャル）を入力してください"),
    ).toBeInTheDocument();
    expect(screen.getByText("年齢を入力してください")).toBeInTheDocument();
    expect(
      screen.getByText("メイン技術を入力してください"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("実務経験年数を入力してください"),
    ).toBeInTheDocument();
    expect(screen.getByText("稼働開始を入力してください")).toBeInTheDocument();
    expect(screen.getByText("単価を選択してしてください")).toBeInTheDocument();
  });
});
