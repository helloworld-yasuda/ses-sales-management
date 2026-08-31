import { mockAuthUser } from "@/contexts/AuthContext.mock";
import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import CreateSummaryPage from "./page";
import { userEvent } from "@testing-library/user-event";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    replace: vi.fn(),
  }),
  usePathname: () => "/member/create",
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
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} src={src} width={width} height={height} />
  ),
}));

vi.mock("@/contexts/AuthContext", () => ({
  useAuth: () => ({
    user: mockAuthUser,
    login: vi.fn(),
    logout: vi.fn(),
  }),
}));

describe("CreateSummaryPage", () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  it("営業サマリー登録フォームが表示される", () => {
    render(<CreateSummaryPage />);
    expect(
      screen.getByText("要員管理 / 営業サマリーの新規追加"),
    ).toBeInTheDocument();
    expect(screen.getByText("氏名（イニシャル）")).toBeInTheDocument();
    expect(screen.getByText("年齢")).toBeInTheDocument();
    expect(screen.getByText("メイン技術")).toBeInTheDocument();
    expect(screen.getByText("実務経験年数")).toBeInTheDocument();
    expect(screen.getByText("稼働開始")).toBeInTheDocument();
    expect(screen.getByText("単価")).toBeInTheDocument();
    expect(screen.getByText("最寄駅")).toBeInTheDocument();
    expect(screen.getByText("所属")).toBeInTheDocument();
    expect(screen.getByText("特徴（箇条書き）")).toBeInTheDocument();
    expect(
      screen.getByText("得意領域・対応可能領域（箇条書き）"),
    ).toBeInTheDocument();
    expect(screen.getByText("主要技術（カテゴリ別）")).toBeInTheDocument();
    expect(screen.getByText("希望条件")).toBeInTheDocument();
    expect(screen.getByText("並行状況")).toBeInTheDocument();
    expect(screen.getByText("面談可能日程")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "保存する" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "キャンセル" }),
    ).toBeInTheDocument();
  });

  it("キャンセルボタンを押下したら/memberに遷移する", async () => {
    const user = userEvent.setup();
    render(<CreateSummaryPage />);
    await user.click(screen.getByRole("button", { name: "キャンセル" }));
    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/member");
    });
  });

  it("未入力の項目がある場合は/memberに遷移しない", async () => {
    const user = userEvent.setup();
    render(<CreateSummaryPage />);
    await user.click(screen.getByRole("button", { name: "保存する" }));
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("必須項目を入力して保存するボタンを押下したら/memberに遷移する", async () => {
    const user = userEvent.setup();
    render(<CreateSummaryPage />);
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
      expect(pushMock).toHaveBeenCalledWith("/member");
    });
  });
});
