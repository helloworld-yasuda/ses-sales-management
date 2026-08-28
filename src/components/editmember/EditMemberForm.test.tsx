import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import EditMemberForm from "./EditMemberForm";
import userEvent from "@testing-library/user-event";
import { mockAuthUser } from "@/contexts/AuthContext.mock";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    replace: vi.fn(),
  }),
  useParams: () => ({ id: "1" }),
  usePathname: () => "/member/1/edit",
}));

vi.mock("@/contexts/AuthContext", () => ({
  useAuth: () => ({
    user: mockAuthUser,
    login: vi.fn(),
    logout: vi.fn(),
  }),
}));

describe("EditMemberForm", () => {
  beforeEach(() => {
    pushMock.mockClear();
  });
  it("正しい入力でonEditMemberが呼ばれる", async () => {
    const user = userEvent.setup();
    const onEditMember = vi.fn();
    render(<EditMemberForm onEditMember={onEditMember} />);
    await user.click(screen.getByRole("button", { name: "変更を保存する" }));
    expect(onEditMember).toHaveBeenCalledWith({
      memberName: "佐藤 健太",
      nameKana: "サトウ ケンタ",
      affiliation: "自社社員 (SES第1事業部)",
      nearestStation: "新宿駅",
      upperCompany: "ABC商事株式会社",
      paymentTerms: "月末締め翌月末払い",
      renewal: "3ヶ月",
      experienceYears: "8年 (フロントエンド中心)",
      unitPrice: "400000",
      skills: "0",
      skills2: "0",
      skillSheet: "/images/member/1_skill_sheet.pdf",
      remarks:
        "フロントエンド開発を軸としつつ、Terraformを利用したインフラ構成管理やAWS構築の実務経験もあり。リーダーシップ経験もあり、将来のPM候補として期待できる人材。",
      availability: "1",
    });
  });

  it("未入力の項目がある場合はエラーメッセージが表示される", async () => {
    const user = userEvent.setup();
    const onEditMember = vi.fn();
    render(<EditMemberForm onEditMember={onEditMember} />);
    await user.clear(screen.getByPlaceholderText("例：山田 太郎"));
    await user.clear(screen.getByPlaceholderText("例：ヤマダ タロウ"));
    await user.clear(
      screen.getByPlaceholderText("例：パートナーA または 自社社員"),
    );
    await user.clear(screen.getByPlaceholderText("例：新宿駅"));
    await user.clear(screen.getByPlaceholderText("例：月末締め翌月末払い"));
    await user.clear(screen.getByPlaceholderText("例：3ヶ月"));
    await user.clear(screen.getByPlaceholderText("例：５年"));
    await user.clear(
      screen.getByPlaceholderText("例：https://example.com/skillsheet"),
    );
    await user.clear(screen.getByPlaceholderText("例：ABC商事株式会社"));

    await user.click(screen.getByRole("button", { name: "変更を保存する" }));
    expect(screen.getByText("氏名を入力してください")).toBeInTheDocument();
    expect(screen.getByText("フリガナを入力してください")).toBeInTheDocument();
    expect(
      screen.getByText("所属会社 / 属性を入力してください"),
    ).toBeInTheDocument();
    expect(screen.getByText("最寄駅を入力してください")).toBeInTheDocument();
    expect(screen.getByText("経験年数を入力してください")).toBeInTheDocument();
    expect(screen.getByText("上位会社を入力してください")).toBeInTheDocument();
    expect(
      screen.getByText("支払サイトを入力してください"),
    ).toBeInTheDocument();
    expect(screen.getByText("更新頻度を入力してください")).toBeInTheDocument();
    expect(
      screen.getByText("スキルシートURLを入力してください"),
    ).toBeInTheDocument();
  });
});
