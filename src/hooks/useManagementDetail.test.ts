import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockCompanyDetails } from "@/components/management/CompanyDetail.mock";
import useManagementDetail from "./useManagementDetail";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe("useManagementDetail", () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  it("指定したIDの会社情報とfieldsを返す", () => {
    const { result } = renderHook(() => useManagementDetail("1"));
    const company = mockCompanyDetails[0];

    expect(result.current.company).toEqual(company);
    expect(result.current.fields).toContainEqual({
      label: "会社名",
      value: company.name,
    });
    expect(result.current.fields).toContainEqual({
      label: "面談実績",
      value: "あり",
    });
  });

  it("boolean項目をあり/なしに変換する", () => {
    const { result } = renderHook(() => useManagementDetail("2"));

    expect(result.current.fields).toContainEqual({
      label: "面談実績",
      value: "あり",
    });
    expect(result.current.fields).toContainEqual({
      label: "配信の有無",
      value: "なし",
    });
    expect(result.current.fields).toContainEqual({
      label: "Lineの有無",
      value: "あり",
    });
  });

  it("handleEditで編集画面へ遷移する", () => {
    const { result } = renderHook(() => useManagementDetail("3"));

    act(() => {
      result.current.handleEdit();
    });

    expect(pushMock).toHaveBeenCalledWith("/management/3/edit");
  });

  it("存在しないIDの場合はエラーを投げる", () => {
    expect(() => renderHook(() => useManagementDetail("999"))).toThrow(
      "Company not found",
    );
  });
});
