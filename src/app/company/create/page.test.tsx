import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CompanyCreatePage from "./page";
import { mockAuthUser } from "@/contexts/AuthContext.mock";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    replace: vi.fn(),
  }),
  usePathname: () => "/company/create",
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

const renderPage = () => render(<CompanyCreatePage />);

describe("CompanyCreatePage", () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  it("会社名、共通メールアドレス、相手企業担当者、自社営業担当、ランク、面談実績、配信の有無、Lineの有無が表示される", () => {
    render(<CompanyCreatePage />);
    expect(screen.getByText("会社名")).toBeInTheDocument();
    expect(screen.getByText("営業共通メールアドレス")).toBeInTheDocument();
    expect(screen.getByText("企業担当者メールアドレス")).toBeInTheDocument();
    expect(screen.getByText("相手企業担当者")).toBeInTheDocument();
    expect(screen.getByText("自社営業担当")).toBeInTheDocument();
    expect(screen.getByText("ランク")).toBeInTheDocument();
    expect(screen.getByText("主要領域")).toBeInTheDocument();
    expect(screen.getByText("面談実績")).toBeInTheDocument();
    expect(screen.getByText("配信の有無")).toBeInTheDocument();
    expect(screen.getByText("Lineの有無")).toBeInTheDocument();
  });

  it("未入力の項目がある場合は/companyに遷移しない", async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByRole("button", { name: "取引先を保存" }));
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("必須項目を入力して取引先を保存ボタンを押下したら/companyに遷移する", async () => {
    const user = userEvent.setup();
    renderPage();
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
      expect(pushMock).toHaveBeenCalledWith("/company");
    });
  });
});
