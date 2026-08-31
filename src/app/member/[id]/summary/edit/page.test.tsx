import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockSalesSummary } from "@/components/member/SalesSummary.mock";
import { mockAuthUser } from "@/contexts/AuthContext.mock";
import MemberSummaryEditPage from "./page";

const pushMock = vi.fn();
const useParamsMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    replace: vi.fn(),
  }),
  useParams: () => useParamsMock(),
  usePathname: () => "/member/1/summary/edit",
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

const renderPage = () => render(<MemberSummaryEditPage />);

describe("MemberSummaryEditPage", () => {
  beforeEach(() => {
    pushMock.mockClear();
    useParamsMock.mockReturnValue({ id: "1" });
  });

  it("営業サマリー編集画面と初期値が表示される", () => {
    const memberSummary = mockSalesSummary[0];
    renderPage();

    expect(screen.getByText("要員管理 / 営業サマリー編集")).toBeInTheDocument();
    expect(screen.getByText("営業サマリー情報の入力")).toBeInTheDocument();
    expect(screen.getByDisplayValue(memberSummary.initial)).toBeInTheDocument();
    expect(screen.getByDisplayValue(memberSummary.nearestStation)).toBeInTheDocument();
  });

  it("保存押下で営業サマリー詳細へ遷移する", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole("button", { name: "保存する" }));
    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/member/1/summary");
    });
  });

  it("キャンセル押下で営業サマリー詳細へ遷移する", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole("button", { name: "キャンセル" }));
    expect(pushMock).toHaveBeenCalledWith("/member/1/summary");
  });

  it("存在しないIDの場合はエラーになる", () => {
    useParamsMock.mockReturnValue({ id: "999" });
    expect(() => renderPage()).toThrow("Summary not found");
  });
});
