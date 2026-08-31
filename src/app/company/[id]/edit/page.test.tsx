import { beforeEach, expect, vi } from "vitest";
import { describe, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import EditCompanyPage from "./page";
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
  usePathname: () => "/company/1/edit",
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

describe("EditCompanyPage", () => {
  beforeEach(() => {
    pushMock.mockClear();
    useParamsMock.mockReturnValue({ id: "1" });
  });

  it("会社名、共通メールアドレス、相手企業担当者、自社営業担当、ランク、面談実績、配信の有無、Lineの有無が表示される", () => {
    render(<EditCompanyPage />);
    expect(screen.getByText("会社名")).toBeInTheDocument();
    expect(screen.getByText("営業共通メールアドレス")).toBeInTheDocument();
    expect(screen.getByText("相手企業担当者")).toBeInTheDocument();
    expect(screen.getByText("自社営業担当")).toBeInTheDocument();
    expect(screen.getByText("ランク")).toBeInTheDocument();
    expect(screen.getByText("主要領域")).toBeInTheDocument();
    expect(screen.getByText("面談実績")).toBeInTheDocument();
    expect(screen.getByText("配信の有無")).toBeInTheDocument();
    expect(screen.getByText("Lineの有無")).toBeInTheDocument();
  });

  it("デフォルト値が表示される", () => {
    render(<EditCompanyPage />);
    expect(screen.getByPlaceholderText("株式会社〇〇〇")).toHaveValue(
      "株式会社 テクノロジーソリューションズ",
    );
    expect(screen.getByPlaceholderText("山田 太郎")).toHaveValue("山田 太郎");
    expect(screen.getByPlaceholderText("山田 花子")).toHaveValue("佐藤 花子");
    expect(screen.getByLabelText("配信の有無")).toHaveTextContent("有");
    expect(screen.getByLabelText("Lineの有無")).toHaveTextContent("有");
  });

  it("未入力の項目がある場合は/companyに遷移しない", async () => {
    const user = userEvent.setup();
    render(<EditCompanyPage />);
    await user.clear(screen.getByPlaceholderText("株式会社〇〇〇"));
    await user.click(screen.getByRole("button", { name: "更新する" }));
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("更新するボタンを押下したら/companyに遷移する", async () => {
    const user = userEvent.setup();
    render(<EditCompanyPage />);
    await user.click(screen.getByRole("button", { name: "更新する" }));
    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/company");
    });
  });
});
