import { vi, describe, it, beforeEach, expect } from "vitest";
import { mockAuthUser } from "@/contexts/AuthContext.mock";
import { mockSalesSummary } from "@/components/member/SalesSummary.mock";
import MemberSummaryPage from "./page";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

const pushMock = vi.fn();
const useParamsMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    replace: vi.fn(),
  }),
  useParams: () => useParamsMock(),
  usePathname: () => "/member/1/summary",
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

const renderPage = () => render(<MemberSummaryPage />);

describe("MemberSummaryPage", () => {
  beforeEach(() => {
    pushMock.mockClear();
    useParamsMock.mockReturnValue({ id: "1" });
  });
  it("要員詳細、営業サマリーが表示される", () => {
    const memberSummary = mockSalesSummary[0];
    renderPage();

    expect(screen.getByText("要員詳細")).toBeInTheDocument();
    expect(screen.getByText("営業サマリー")).toBeInTheDocument();
  });

  it("別IDの営業サマリーが表示される", () => {
    useParamsMock.mockReturnValue({ id: "2" });
    const memberSummary = mockSalesSummary[1];
    renderPage();

    expect(screen.getByText(memberSummary.experience)).toBeInTheDocument();
    expect(screen.getByText(memberSummary.nearestStation)).toBeInTheDocument();
    expect(screen.getByText(memberSummary.unitPrice)).toBeInTheDocument();
    expect(screen.getByText(memberSummary.parallelStatus)).toBeInTheDocument();
    expect(screen.getByText(memberSummary.availableDate)).toBeInTheDocument();
  });

  it("編集ボタンをクリックすると編集ページに遷移する", async () => {
    const user = userEvent.setup();
    renderPage();
    const editButton = await screen.findByTestId("edit-button");
    await user.click(editButton);
    expect(pushMock).toHaveBeenCalledWith("/member/1/summary/edit");
  });

  it("コピーボタンをクリックすると営業サマリーがクリップボードにコピーされる", async () => {
    const user = userEvent.setup();
    const writeTextMock = vi.spyOn(navigator.clipboard, "writeText");

    renderPage();
    const copyButton = await screen.findByTestId("copy-button");
    await user.click(copyButton);
    expect(writeTextMock).toHaveBeenCalledWith(
      expect.stringContaining(mockSalesSummary[0].initial),
    );
  });

  it("営業サマリーが0件のとき空状態が表示される", async () => {
    const user = userEvent.setup();
    useParamsMock.mockReturnValue({ id: "999" });
    renderPage();

    expect(screen.getByText("データがありません")).toBeInTheDocument();
    expect(
      screen.getByText("営業サマリーを追加してください。"),
    ).toBeInTheDocument();
    expect(document.querySelector(".MuiCard-root")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: "営業サマリーを登録する",
      }),
    );
    expect(pushMock).toHaveBeenCalledWith("/member/createSummary");
  });
});
