import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import EditCompanyForm from "./EditCompanyForm";
import userEvent from "@testing-library/user-event";
import { mockAuthUser } from "@/contexts/AuthContext.mock";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    replace: vi.fn(),
  }),
  useParams: () => ({ id: "1" }),
  usePathname: () => "/company/1/edit",
}));

vi.mock("@/contexts/AuthContext", () => ({
  useAuth: () => ({
    user: mockAuthUser,
    login: vi.fn(),
    logout: vi.fn(),
  }),
}));

describe("EditCompanyForm", () => {
  beforeEach(() => {
    pushMock.mockClear();
  });
  it("正しい入力でonEditCompanyが呼ばれる", async () => {
    const user = userEvent.setup();
    const onEditCompany = vi.fn();
    render(<EditCompanyForm onEditCompany={onEditCompany} />);
    await user.click(screen.getByRole("button", { name: "更新する" }));
    expect(onEditCompany).toHaveBeenCalledWith({
      companyName: "株式会社 テクノロジーソリューションズ",
      contactPerson: "山田 太郎",
      email: "sales@tech-solutions.example.com",
      companyEmail: "yamada@tech-solutions.example.com",
      salesPerson: "佐藤 花子",
      rank: "A",
      mainArea: "Java / Spring",
      interviewAchievement: "0",
      deliveryAvailability: "0",
      lineAvailability: "0",
    });
  });

  it("未入力の項目がある場合はエラーメッセージが表示される", async () => {
    const user = userEvent.setup();
    const onEditCompany = vi.fn();
    render(<EditCompanyForm onEditCompany={onEditCompany} />);
    await user.clear(screen.getByPlaceholderText("株式会社〇〇〇"));
    await user.clear(screen.getByPlaceholderText("山田 太郎"));
    await user.clear(screen.getByPlaceholderText("山田 花子"));
    await user.click(screen.getByRole("button", { name: "更新する" }));
    expect(screen.getByText("会社名を入力してください")).toBeInTheDocument();
    expect(
      screen.getByText("相手企業担当者を入力してください"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("自社営業担当者を入力してください"),
    ).toBeInTheDocument();
  });
});
