import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockCompanyDetails } from "@/components/company/CompanyDetail.mock";
import useCompanyDetail from "./useCompanyDetail";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe("useCompanyDetail", () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  it("指定したIDの会社情報とfieldsを返す", () => {
    const { result } = renderHook(() => useCompanyDetail("1"));
    const company = mockCompanyDetails[0];

    expect(result.current.company).toEqual(company);
    expect(result.current.fields).toContainEqual({
      label: "会社名",
      value: company.name,
    });
    expect(result.current.fields).toContainEqual({
      label: "面談実績",
      value: "有",
    });
  });

  it("handleEditで編集画面へ遷移する", () => {
    const { result } = renderHook(() => useCompanyDetail("3"));

    act(() => {
      result.current.handleEdit();
    });

    expect(pushMock).toHaveBeenCalledWith("/company/3/edit");
  });

  it("存在しないIDの場合はエラーを投げる", () => {
    expect(() => renderHook(() => useCompanyDetail("999"))).toThrow(
      "Company not found",
    );
  });
});
