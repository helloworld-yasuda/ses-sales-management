import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockAuthUser } from "@/contexts/AuthContext.mock";
import { useCompanyPage } from "@/hooks/useCompanyPage";
import CompanyPage from "./page";

const pushMock = vi.fn();
const companyPageHook = vi.hoisted(() => ({
  actual: undefined as undefined | (() => ReturnType<typeof useCompanyPage>),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    replace: vi.fn(),
  }),
  usePathname: () => "/company",
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
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} src={src} width={width} height={height} />
  ),
}));

vi.mock("@/contexts/AuthContext", () => ({
  useAuth: () => ({
    user: mockAuthUser,
    login: vi.fn(),
    logout: vi.fn(),
  }),
}));

vi.mock("@/hooks/useCompanyPage", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("@/hooks/useCompanyPage")>();
  companyPageHook.actual = actual.useCompanyPage;
  return {
    ...actual,
    useCompanyPage: vi.fn(() => actual.useCompanyPage()),
  };
});

describe("CompanyPage", () => {
  beforeEach(() => {
    pushMock.mockClear();
    vi.mocked(useCompanyPage).mockReset();
    vi.mocked(useCompanyPage).mockImplementation(() => {
      if (!companyPageHook.actual) {
        throw new Error("useCompanyPage actual is not set");
      }
      return companyPageHook.actual();
    });
  });

  it("取引先管理とページングが表示される", () => {
    render(<CompanyPage />);

    expect(
      screen.getByRole("heading", { name: "取引先管理" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "page 1" })).toBeInTheDocument();
  });

  it("新規登録ボタンで /company/create へ遷移する", async () => {
    const user = userEvent.setup();
    render(<CompanyPage />);

    await user.click(screen.getByRole("button", { name: "新規登録" }));

    expect(pushMock).toHaveBeenCalledWith("/company/create");
  });

  it("行クリックで詳細ページへ遷移する", async () => {
    const user = userEvent.setup();
    render(<CompanyPage />);

    await user.click(screen.getByText("株式会社テックソリューション"));

    expect(pushMock).toHaveBeenCalledWith("/company/1");
  });

  it("ページ変更で一覧が切り替わる", async () => {
    const user = userEvent.setup();
    render(<CompanyPage />);

    expect(
      screen.getByText("株式会社テックソリューション"),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Go to page 2" }));

    expect(
      screen.getByText("アステリアシステムズ株式会社"),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("株式会社テックソリューション"),
    ).not.toBeInTheDocument();
  });

  it("会社が0件のとき空状態が表示される", async () => {
    const user = userEvent.setup();
    vi.mocked(useCompanyPage).mockReturnValue({
      columns: [{ label: "会社名", key: "companyName" }],
      rows: [],
      handleAdd: () => pushMock("/company/create"),
      handleRowClick: vi.fn(),
      paging: { currentPage: 1, totalPages: 1, onPageChange: vi.fn() },
    });

    render(<CompanyPage />);

    expect(screen.getByText("データがありません")).toBeInTheDocument();
    expect(screen.getByText("取引先を追加してください。")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "＋ 初めての取引先を登録する" }),
    );
    expect(pushMock).toHaveBeenCalledWith("/company/create");
  });
});
