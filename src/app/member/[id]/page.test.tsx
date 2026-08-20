import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockMemberDetails } from "@/components/member/MemberDetail.mock";
import { mockAuthUser } from "@/contexts/AuthContext.mock";
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

const renderPage = () => render(<MemberDetailPage />);

describe("MemberDetailPage", () => {
  beforeEach(() => {
    pushMock.mockClear();
    useParamsMock.mockReturnValue({ id: "1" });
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
      expect(pushMock).toHaveBeenCalledWith("/member/1/skill-sheet");
    });
  });

  it("存在しないIDの場合はエラーになる", () => {
    useParamsMock.mockReturnValue({ id: "999" });

    expect(() => renderPage()).toThrow("Member not found");
  });
});
