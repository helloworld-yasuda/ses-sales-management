import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import CreateCompanyForm from "./CreateCompanyForm";
import userEvent from "@testing-library/user-event";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    replace: vi.fn(),
  }),
}));

const renderPage = () =>
  render(<CreateCompanyForm onCreateCompany={vi.fn()} onCancel={vi.fn()} />);

describe("CreateCompanyForm", () => {
  beforeEach(() => {
    pushMock.mockClear();
  });
  it("正しい入力でonCreateCompanyが呼ばれる", async () => {
    const user = userEvent.setup();
    const onCreateCompany = vi.fn();
    render(
      <CreateCompanyForm
        onCreateCompany={onCreateCompany}
        onCancel={vi.fn()}
      />,
    );
    await user.type(
      screen.getByPlaceholderText("株式会社〇〇〇"),
      "テスト会社",
    );
    await user.type(screen.getByPlaceholderText("山田 太郎"), "テスト太郎");
    await user.type(screen.getByPlaceholderText("山田 花子"), "テスト花子");
    await user.click(screen.getByLabelText("配信の有無"));
    await user.click(await screen.findByRole("option", { name: "有" }));
    await user.click(screen.getByLabelText("Lineの有無"));
    await user.click(await screen.findByRole("option", { name: "有" }));

    await user.click(screen.getByRole("button", { name: "取引先を保存" }));
    await waitFor(() => {
      expect(onCreateCompany).toHaveBeenCalledWith({
        companyName: "テスト会社",
        representative: "テスト太郎",
        contactPerson: "テスト花子",
        deliveryAvailability: "有",
        lineAvailability: "有",
      });
    });
  });

  it("未入力の項目がある場合はエラーメッセージが表示される", async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByRole("button", { name: "取引先を保存" }));
    expect(screen.getByText("会社名を入力してください")).toBeInTheDocument();
    expect(
      screen.getByText("自社営業担当者を入力してください"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("配信の有無を選択してください"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Lineの有無を選択してください"),
    ).toBeInTheDocument();
  });
});
