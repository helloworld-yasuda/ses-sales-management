import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockCompanyDetails } from "@/components/company/CompanyDetail.mock";
import { mockAuthUser } from "@/contexts/AuthContext.mock";
import { mockDelay } from "@/utils/mockDelay";
import CompanyDetailPage from "./page";

const pushMock = vi.fn();
const useParamsMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    replace: vi.fn(),
  }),
  useParams: () => useParamsMock(),
  usePathname: () => "/company/1",
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

vi.mock("@/utils/mockDelay", () => ({
  mockDelay: vi.fn(() => Promise.resolve()),
}));

const renderPage = () => render(<CompanyDetailPage />);

describe("CompanyDetailPage", () => {
  beforeEach(() => {
    pushMock.mockClear();
    useParamsMock.mockReturnValue({ id: "1" });
    vi.mocked(mockDelay).mockReset();
    vi.mocked(mockDelay).mockResolvedValue(undefined);
  });

  it("基本会社情報とモックの会社詳細が表示される", () => {
    const company = mockCompanyDetails[0];
    renderPage();

    expect(screen.getByText("基本会社情報")).toBeInTheDocument();
    expect(screen.getByText("会社名")).toBeInTheDocument();
    expect(screen.getByText(company.name)).toBeInTheDocument();
    expect(screen.getByText(company.representative)).toBeInTheDocument();
    expect(screen.getByText(company.email)).toBeInTheDocument();
    expect(screen.getByText(company.mainArea)).toBeInTheDocument();
    expect(screen.getAllByText("有")).toHaveLength(3);
  });

  it("別IDの会社詳細が表示される", () => {
    useParamsMock.mockReturnValue({ id: "2" });
    const company = mockCompanyDetails[1];
    renderPage();

    expect(screen.getByText(company.name)).toBeInTheDocument();
    expect(screen.getByText(company.representative)).toBeInTheDocument();
    expect(screen.getAllByText("無").length).toBeGreaterThan(0);
    expect(screen.getByText("無")).toBeInTheDocument();
  });

  it("編集する押下で編集画面へ遷移する", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(await screen.findByRole("button", { name: "編集する" }));

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/company/1/edit");
    });
  });

  it("存在しないIDの場合はエラーになる", () => {
    useParamsMock.mockReturnValue({ id: "999" });

    expect(() => renderPage()).toThrow("Company not found");
  });

  it("削除する押下で確認モーダルが表示される", async () => {
    const user = userEvent.setup({ delay: null });
    renderPage();

    await user.click(await screen.findByRole("button", { name: "削除する" }));

    expect(screen.getByText("取引先を削除しますか？")).toBeInTheDocument();
    expect(
      screen.getByText(
        "この操作は元に戻せません。関連するデータもすべて削除されます。",
      ),
    ).toBeInTheDocument();
  });

  it("キャンセル押下でモーダルが閉じ、遷移しない", async () => {
    const user = userEvent.setup({ delay: null });
    renderPage();

    await user.click(await screen.findByRole("button", { name: "削除する" }));
    await user.click(screen.getByRole("button", { name: "キャンセル" }));

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("モーダルの削除する押下でローディング後に一覧へ遷移する", async () => {
    let resolveDelay: () => void = () => {};
    vi.mocked(mockDelay).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveDelay = resolve;
        }),
    );

    const user = userEvent.setup({ delay: null });
    renderPage();

    await user.click(await screen.findByRole("button", { name: "削除する" }));
    await user.click(
      within(screen.getByRole("dialog")).getByRole("button", {
        name: "削除する",
      }),
    );

    expect(await screen.findByRole("progressbar")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    resolveDelay();

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/company");
    });
  });
});
