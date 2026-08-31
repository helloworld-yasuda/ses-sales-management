import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockAuthUser } from "@/contexts/AuthContext.mock";
import MemberPage from "./page";
import { mockMemberTableRows } from "@/components/member/MemberTable.mock";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    replace: vi.fn(),
  }),
  usePathname: () => "/member",
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

vi.mock("@/hooks/useFetchData", () => ({
  useFetchData: () => ({
    data: mockMemberTableRows.map(({ id, ...rest }) => ({
      memberId: id,
      ...rest,
    })),
    error: undefined,
    isLoading: false,
  }),
}));

describe("MemberPage", () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  it("要員管理とページングが表示される", () => {
    render(<MemberPage />);

    expect(
      screen.getByRole("heading", { name: "要員管理" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "page 1" })).toBeInTheDocument();
    expect(screen.getByText("佐藤 健太")).toBeInTheDocument();
  });

  it("要員の新規追加ボタンで /member/create へ遷移する", async () => {
    const user = userEvent.setup();
    render(<MemberPage />);

    await user.click(screen.getByRole("button", { name: "要員の新規追加" }));

    expect(pushMock).toHaveBeenCalledWith("/member/create");
  });

  it("行クリックで詳細ページへ遷移する", async () => {
    const user = userEvent.setup();
    render(<MemberPage />);

    await user.click(screen.getByText("佐藤 健太"));

    expect(pushMock).toHaveBeenCalledWith("/member/1");
  });

  it("ページ変更で一覧が切り替わる", async () => {
    const user = userEvent.setup();
    render(<MemberPage />);

    expect(screen.getByText("佐藤 健太")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Go to page 2" }));

    expect(screen.getByText("山本 健")).toBeInTheDocument();
    expect(screen.queryByText("佐藤 健太")).not.toBeInTheDocument();
  });

  it("サイドバーから取引先管理へ遷移できる", async () => {
    const user = userEvent.setup();
    render(<MemberPage />);

    await user.click(screen.getByRole("button", { name: "取引先管理" }));

    expect(pushMock).toHaveBeenCalledWith("/company");
  });
});
