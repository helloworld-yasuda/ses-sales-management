import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockAuthUser } from "@/contexts/AuthContext.mock";
import { useMemberPage } from "@/hooks/useMemberPage";
import MemberPage from "./page";

const pushMock = vi.fn();
const memberPageHook = vi.hoisted(() => ({
  actual: undefined as undefined | (() => ReturnType<typeof useMemberPage>),
}));

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

vi.mock("@/hooks/useMemberPage", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/hooks/useMemberPage")>();
  memberPageHook.actual = actual.useMemberPage;
  return {
    ...actual,
    useMemberPage: vi.fn(() => actual.useMemberPage()),
  };
});

describe("MemberPage", () => {
  beforeEach(() => {
    pushMock.mockClear();
    vi.mocked(useMemberPage).mockReset();
    vi.mocked(useMemberPage).mockImplementation(() => {
      if (!memberPageHook.actual) {
        throw new Error("useMemberPage actual is not set");
      }
      return memberPageHook.actual();
    });
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

  it("要員が0件のとき空状態が表示される", async () => {
    const user = userEvent.setup();
    vi.mocked(useMemberPage).mockReturnValue({
      columns: [{ label: "要員氏名", key: "name" }],
      rows: [],
      handleAdd: () => pushMock("/member/create"),
      handleRowClick: vi.fn(),
      paging: { currentPage: 1, totalPages: 1, onPageChange: vi.fn() },
    });

    render(<MemberPage />);

    expect(screen.getByText("データがありません")).toBeInTheDocument();
    expect(screen.getByText("要員を追加してください。")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "＋ 初めての要員を登録する" }),
    );
    expect(pushMock).toHaveBeenCalledWith("/member/create");
  });
});
