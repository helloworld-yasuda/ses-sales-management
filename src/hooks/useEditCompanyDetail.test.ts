import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockCompanyDetails } from "@/components/company/CompanyDetail.mock";
import useEditCompanyDetail from "./useEditCompanyDetail";

const paramsMock = vi.fn(() => ({ id: "1" }));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
  useParams: () => paramsMock(),
}));

const validFormValues = {
  companyName: "テスト会社",
  contactPerson: "テスト太郎",
  salesPerson: "テスト花子",
  email: "",
  companyEmail: "",
  rank: "",
  mainArea: "",
  interviewAchievement: "",
  deliveryAvailability: "0",
  lineAvailability: "0",
};

describe("useEditCompanyDetail", () => {
  beforeEach(() => {
    paramsMock.mockReturnValue({ id: "1" });
  });

  it("会社情報をフォームの初期値にする", () => {
    const { result } = renderHook(() => useEditCompanyDetail());
    const company = mockCompanyDetails[0];

    expect(result.current.control._defaultValues).toEqual({
      companyName: company.name,
      contactPerson: company.representative,
      salesPerson: company.salesName,
      email: company.email,
      companyEmail: company.companyEmail,
      rank: company.rank,
      mainArea: company.mainArea,
      interviewAchievement: company.interviewAchievement,
      deliveryAvailability: company.deliveryAvailability,
      lineAvailability: company.lineAvailability,
    });
  });

  it("onSubmitでonEditCompanyが呼ばれる", async () => {
    const onEditCompany = vi.fn();
    const { result } = renderHook(() =>
      useEditCompanyDetail({ onEditCompany }),
    );

    await act(async () => {
      await result.current.onSubmit(validFormValues);
    });

    expect(onEditCompany).toHaveBeenCalledWith(validFormValues);
    expect(result.current.submitError).toBeNull();
  });

  it("送信失敗時にsubmitErrorをセットする", async () => {
    const onEditCompany = vi
      .fn()
      .mockRejectedValue(new Error("会社情報の更新に失敗しました"));
    const { result } = renderHook(() =>
      useEditCompanyDetail({ onEditCompany }),
    );

    await act(async () => {
      await result.current.onSubmit(validFormValues);
    });

    expect(result.current.submitError).toBe("会社情報の更新に失敗しました");
  });

  it("存在しないIDの場合はエラーを投げる", () => {
    paramsMock.mockReturnValue({ id: "999" });

    expect(() => renderHook(() => useEditCompanyDetail())).toThrow(
      "Company not found",
    );
  });
});
