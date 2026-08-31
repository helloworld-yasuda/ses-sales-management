import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockMemberDetails } from "@/components/member/MemberDetail.mock";
import { mockAuthUser } from "@/contexts/AuthContext.mock";
import { mockDelay } from "@/utils/mockDelay";
import MemberDetailPage from "./page";

const pushMock = vi.fn();
const useParamsMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    replace: vi.fn(),
  }),
  useParams: () => useParamsMock(),
  usePathname: () => "/member/1",
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

const renderPage = () => render(<MemberDetailPage />);

describe("MemberDetailPage", () => {
  beforeEach(() => {
    pushMock.mockClear();
    useParamsMock.mockReturnValue({ id: "1" });
    vi.mocked(mockDelay).mockReset();
    vi.mocked(mockDelay).mockResolvedValue(undefined);
  });

  it("要員詳細の主要情報が表示される", () => {
    const member = mockMemberDetails[0];
    renderPage();

    expect(screen.getByText("要員管理 / 詳細情報")).toBeInTheDocument();
    expect(screen.getByText(member.name)).toBeInTheDocument();
    expect(screen.getByText(member.nameKana)).toBeInTheDocument();
    expect(screen.getByText(member.affiliation)).toBeInTheDocument();
    expect(screen.getByText(member.unitPrice)).toBeInTheDocument();
    expect(screen.getByText("主要スキル")).toBeInTheDocument();
    expect(screen.getByText(member.skills[0])).toBeInTheDocument();
    expect(screen.getByText(member.availability)).toBeInTheDocument();
    expect(screen.getByText(member.remarks)).toBeInTheDocument();
    expect(screen.getByText(member.skillSheet.fileName)).toBeInTheDocument();
  });

  it("別IDの要員詳細が表示される", () => {
    useParamsMock.mockReturnValue({ id: "2" });
    const member = mockMemberDetails[1];
    renderPage();

    expect(screen.getByText(member.name)).toBeInTheDocument();
    expect(screen.getByText(member.affiliation)).toBeInTheDocument();
  });

  it("編集押下で編集画面へ遷移する", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(await screen.findByRole("button", { name: "編集" }));

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/member/1/edit");
    });
  });

  it("表示する押下でスキルシート画面へ遷移する", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(await screen.findByRole("button", { name: "表示する" }));

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/images/member/1_skill_sheet.pdf");
    });
  });

  it("存在しないIDの場合はエラーになる", () => {
    useParamsMock.mockReturnValue({ id: "999" });

    expect(() => renderPage()).toThrow("Member not found");
  });

  it("削除押下で確認モーダルが表示される", async () => {
    const user = userEvent.setup({ delay: null });
    renderPage();

    await user.click(await screen.findByRole("button", { name: "削除" }));

    expect(screen.getByText("要員を削除しますか")).toBeInTheDocument();
    expect(
      screen.getByText(
        "この操作は元に戻せません。関連するデータもすべて削除されます。",
      ),
    ).toBeInTheDocument();
  });

  it("キャンセル押下でモーダルが閉じ、遷移しない", async () => {
    const user = userEvent.setup({ delay: null });
    renderPage();

    await user.click(await screen.findByRole("button", { name: "削除" }));
    await user.click(screen.getByRole("button", { name: "キャンセル" }));

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("削除する押下でローディング後に一覧へ遷移する", async () => {
    let resolveDelay: () => void = () => {};
    vi.mocked(mockDelay).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveDelay = resolve;
        }),
    );

    const user = userEvent.setup({ delay: null });
    renderPage();

    await user.click(await screen.findByRole("button", { name: "削除" }));
    await user.click(screen.getByRole("button", { name: "削除する" }));

    expect(await screen.findByRole("progressbar")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    resolveDelay();

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/member");
    });
  });
});
