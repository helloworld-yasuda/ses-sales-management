import { mockAuthUser } from "@/contexts/AuthContext.mock";
import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import CreateMemberPage from "./page";
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

describe("CreateMemberPage", () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  it("要員登録画面の表示が正しい", () => {
    render(<CreateMemberPage />);
    expect(screen.getByText("要員管理 / 要員の新規追加")).toBeInTheDocument();
    expect(screen.getByText("氏名")).toBeInTheDocument();
    expect(screen.getByText("フリガナ")).toBeInTheDocument();
    expect(screen.getByText("所属会社 / 属性")).toBeInTheDocument();
    expect(screen.getByText("最寄駅")).toBeInTheDocument();
    expect(screen.getByText("上位会社")).toBeInTheDocument();
    expect(screen.getByText("稼働ステータス")).toBeInTheDocument();
    expect(screen.getByText("支払サイト")).toBeInTheDocument();
    expect(screen.getByText("更新頻度")).toBeInTheDocument();
    expect(screen.getByText("主要スキル1 (タグ)")).toBeInTheDocument();
    expect(screen.getByText("主要スキル2 (タグ)")).toBeInTheDocument();
    expect(screen.getByText("経験年数")).toBeInTheDocument();
    expect(screen.getByText("提案単価 (万)")).toBeInTheDocument();
    expect(screen.getByText("スキルシートURL")).toBeInTheDocument();
    expect(screen.getByText("備考・その他コメント")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "要員を保存する" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "キャンセル" }),
    ).toBeInTheDocument();
  });

  it("キャンセルボタンを押下したら/memberに遷移する", async () => {
    const user = userEvent.setup();
    render(<CreateMemberPage />);
    await user.click(screen.getByRole("button", { name: "キャンセル" }));
    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/member");
    });
  });

  it("未入力の項目がある場合は/memberに遷移しない", async () => {
    const user = userEvent.setup();
    render(<CreateMemberPage />);
    await user.click(screen.getByRole("button", { name: "要員を保存する" }));
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("必須項目を入力して要員を保存ボタンを押下したら/memberに遷移する", async () => {
    const user = userEvent.setup();
    render(<CreateMemberPage />);
    await user.type(screen.getByPlaceholderText("例：山田 太郎"), "山田太郎");
    await user.type(
      screen.getByPlaceholderText("例：ヤマダ タロウ"),
      "ヤマダタロウ",
    );
    await user.type(
      screen.getByPlaceholderText("例：パートナーA または 自社社員"),
      "自社社員",
    );
    await user.type(screen.getByPlaceholderText("例：新宿駅"), "新宿駅");
    await user.type(
      screen.getByPlaceholderText("例：ABC商事株式会社"),
      "ABC商事株式会社",
    );
    await user.type(
      screen.getByPlaceholderText("例：月末締め翌月末払い"),
      "月末時め25日払い",
    );
    await user.click(screen.getByLabelText("availability"));
    await user.click(await screen.findByRole("option", { name: "稼働中" }));
    await user.type(screen.getByPlaceholderText("例：3ヶ月"), "3ヶ月");
    await user.click(screen.getByLabelText("skills"));
    await user.click(await screen.findByRole("option", { name: "React" }));
    await user.click(screen.getByLabelText("skills2"));
    await user.click(await screen.findByRole("option", { name: "Java" }));
    await user.type(screen.getByPlaceholderText("例：５年"), "10年");
    await user.click(screen.getByLabelText("unitPrice"));
    await user.click(await screen.findByRole("option", { name: "100万円" }));
    await user.type(
      screen.getByPlaceholderText("例：https://example.com/skillsheet"),
      "https://example.com/skillsheet",
    );
    await user.click(screen.getByRole("button", { name: "要員を保存する" }));
    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/member");
    });
  });
});
