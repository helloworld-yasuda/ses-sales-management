import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockCompanyDetails } from "@/components/management/CompanyDetail.mock";
import ManagementDetailPage from "./page";

const pushMock = vi.fn();
const useParamsMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  useParams: () => useParamsMock(),
  usePathname: () => "/management/1",
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

const renderPage = () => render(<ManagementDetailPage />);

describe("ManagementDetailPage", () => {
  beforeEach(() => {
    pushMock.mockClear();
    useParamsMock.mockReturnValue({ id: "1" });
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
    expect(screen.getAllByText("あり")).toHaveLength(3);
  });

  it("別IDの会社詳細が表示される", () => {
    useParamsMock.mockReturnValue({ id: "2" });
    const company = mockCompanyDetails[1];
    renderPage();

    expect(screen.getByText(company.name)).toBeInTheDocument();
    expect(screen.getByText(company.representative)).toBeInTheDocument();
    expect(screen.getAllByText("あり").length).toBeGreaterThan(0);
    expect(screen.getByText("なし")).toBeInTheDocument();
  });

  it("編集する押下で編集画面へ遷移する", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(await screen.findByRole("button", { name: "編集する" }));

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/management/1/edit");
    });
  });

  it("存在しないIDの場合はエラーになる", () => {
    useParamsMock.mockReturnValue({ id: "999" });

    expect(() => renderPage()).toThrow("Company not found");
  });
});
