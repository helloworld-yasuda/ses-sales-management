import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import useCreateCompanyForm from "./useCreateCompanyForm";

describe("useCreateCompanyForm", () => {
  it("送信失敗時にエラーメッセージが表示される", async () => {
    const onCreateCompany = vi
      .fn()
      .mockRejectedValue(new Error("会社登録に失敗しました"));

    const { result } = renderHook(() =>
      useCreateCompanyForm({ onCreateCompany }),
    );

    await act(async () => {
      await result.current.onSubmit({
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
      });
    });

    expect(result.current.submitError).toBe("会社登録に失敗しました");
  });
});
