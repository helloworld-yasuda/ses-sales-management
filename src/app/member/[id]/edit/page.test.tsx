import { beforeEach, expect, vi } from "vitest";
import { describe, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import MemberEditPage from "./page";
import userEvent from "@testing-library/user-event";
import { mockAuthUser } from "@/contexts/AuthContext.mock";

const pushMock = vi.fn();
const useParamsMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    replace: vi.fn(),
  }),
  useParams: () => useParamsMock(),
  usePathname: () => "/member/1/edit",
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

vi.mock("@/contexts/AuthContext", () => ({
  useAuth: () => ({
    user: mockAuthUser,
    login: vi.fn(),
    logout: vi.fn(),
  }),
}));

describe("MemberEditPage", () => {
  beforeEach(() => {
    pushMock.mockClear();
    useParamsMock.mockReturnValue({ id: "1" });
  });

  it("氏名、フリガナ、所属会社 / 属性、最寄駅、上位会社、支払サイト、更新頻度、経験年数、提案単価、主要スキル1、主要スキル2、スキルシートURL、備考・その他コメント、稼働ステータスが表示される", () => {
    render(<MemberEditPage />);
    expect(screen.getByText("氏名")).toBeInTheDocument();
    expect(screen.getByText("フリガナ")).toBeInTheDocument();
    expect(screen.getByText("所属会社 / 属性")).toBeInTheDocument();
    expect(screen.getByText("最寄駅")).toBeInTheDocument();
    expect(screen.getByText("上位会社")).toBeInTheDocument();
    expect(screen.getByText("支払サイト")).toBeInTheDocument();
    expect(screen.getByText("更新頻度")).toBeInTheDocument();
    expect(screen.getByText("経験年数")).toBeInTheDocument();
    expect(screen.getByText("提案単価 (万)")).toBeInTheDocument();
    expect(screen.getByText("主要スキル1 (タグ)")).toBeInTheDocument();
    expect(screen.getByText("主要スキル2 (タグ)")).toBeInTheDocument();
    expect(screen.getByText("スキルシートURL")).toBeInTheDocument();
    expect(screen.getByText("備考・その他コメント")).toBeInTheDocument();
    expect(screen.getByText("稼働ステータス")).toBeInTheDocument();
  });

  it("デフォルト値が表示される", () => {
    render(<MemberEditPage />);
    expect(screen.getByPlaceholderText("例：山田 太郎")).toHaveValue(
      "佐藤 健太",
    );
    expect(screen.getByPlaceholderText("例：ヤマダ タロウ")).toHaveValue(
      "サトウ ケンタ",
    );
    expect(
      screen.getByPlaceholderText("例：パートナーA または 自社社員"),
    ).toHaveValue("自社社員 (SES第1事業部)");
    expect(screen.getByPlaceholderText("例：新宿駅")).toHaveValue("新宿駅");
    expect(screen.getByPlaceholderText("例：ABC商事株式会社")).toHaveValue(
      "ABC商事株式会社",
    );
    expect(screen.getByPlaceholderText("例：月末締め翌月末払い")).toHaveValue(
      "月末締め翌月末払い",
    );
    expect(screen.getByPlaceholderText("例：3ヶ月")).toHaveValue("3ヶ月");
    expect(screen.getByPlaceholderText("例：５年")).toHaveValue(
      "8年 (フロントエンド中心)",
    );
    expect(screen.getByLabelText("unitPrice")).toHaveTextContent("40万円");
    expect(screen.getByLabelText("skills")).toHaveTextContent("React");
    expect(screen.getByLabelText("skills2")).toHaveTextContent("Java");
    expect(screen.getByLabelText("availability")).toHaveTextContent("稼働中");
  });
  it("未入力の項目がある場合は/memberに遷移しない", async () => {
    const user = userEvent.setup();
    render(<MemberEditPage />);
    await user.clear(screen.getByPlaceholderText("例：山田 太郎"));
    await user.click(screen.getByRole("button", { name: "変更を保存する" }));
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("更新するボタンを押下したら/memberに遷移する", async () => {
    const user = userEvent.setup();
    render(<MemberEditPage />);
    await user.click(screen.getByRole("button", { name: "変更を保存する" }));
    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/member");
    });
  });
});
