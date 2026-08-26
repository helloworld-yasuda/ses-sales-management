import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import CreateMemberForm from "./CreateMemberForm";
import userEvent from "@testing-library/user-event";
import { mockAuthUser } from "@/contexts/AuthContext.mock";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    replace: vi.fn(),
  }),
  usePathname: () => "/member/create",
}));

vi.mock("@/contexts/AuthContext", () => ({
  useAuth: () => ({
    user: mockAuthUser,
    login: vi.fn(),
    logout: vi.fn(),
  }),
}));

describe("CreateMemberForm", () => {
  beforeEach(() => {
    pushMock.mockClear();
  });
  it("正しい入力でonCreateCompanyが呼ばれる", async () => {
    const user = userEvent.setup();
    const onCreateMember = vi.fn();
    render(<CreateMemberForm onCreateMember={onCreateMember} />);

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
      expect(onCreateMember).toHaveBeenCalledWith(
        expect.objectContaining({
          memberName: "山田太郎",
          nameKana: "ヤマダタロウ",
          affiliation: "自社社員",
          availability: "1",
          nearestStation: "新宿駅",
          upperCompany: "ABC商事株式会社",
          paymentTerms: "月末時め25日払い",
          renewal: "3ヶ月",
          skills: "0",
          skills2: "0",
          experienceYears: "10年",
          unitPrice: "1000000",
          skillSheet: "https://example.com/skillsheet",
          remarks: "",
        }),
      );
    });
  });

  it("未入力の項目がある場合はエラーメッセージが表示される", async () => {
    const user = userEvent.setup();
    const onCreateMember = vi.fn();
    render(<CreateMemberForm onCreateMember={onCreateMember} />);
    await user.click(screen.getByRole("button", { name: "要員を保存する" }));
    expect(screen.getByText("氏名を入力してください")).toBeInTheDocument();
    expect(screen.getByText("フリガナを入力してください")).toBeInTheDocument();
    expect(
      screen.getByText("所属会社 / 属性を入力してください"),
    ).toBeInTheDocument();
    expect(screen.getByText("最寄駅を入力してください")).toBeInTheDocument();
    expect(
      screen.getByText("稼働ステータスを選択してください"),
    ).toBeInTheDocument();
    expect(screen.getByText("上位会社を入力してください")).toBeInTheDocument();
    expect(
      screen.getByText("支払サイトを入力してください"),
    ).toBeInTheDocument();
    expect(screen.getByText("更新頻度を入力してください")).toBeInTheDocument();
    expect(screen.getByText("提案単価を選択してください")).toBeInTheDocument();
    expect(
      screen.getByText("主要スキル1 を選択してください"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("主要スキル2 を選択してください"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("スキルシートURLを入力してください"),
    ).toBeInTheDocument();
  });
});
