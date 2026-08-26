import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import useCreateMember from "./useCreateMember";

describe("useCreateMember", () => {
  it("送信失敗時にエラーメッセージが表示される", async () => {
    const onCreateMember = vi
      .fn()
      .mockRejectedValue(new Error("要員登録に失敗しました"));

    const { result } = renderHook(() => useCreateMember({ onCreateMember }));

    await act(async () => {
      await result.current.onSubmit({
        memberName: "山田太郎",
        nameKana: "ヤマダタロウ",
        affiliation: "自社社員",
        nearestStation: "新宿駅",
        upperCompany: "ABC商事株式会社",
        paymentTerms: "月末時め25日払い",
        renewal: "3ヶ月",
        experienceYears: "10年",
        unitPrice: "400000",
        skills: "0",
        skills2: "0",
        skillSheet: "https://example.com/skillsheet",
        remarks: "",
        availability: "1",
      });
    });

    expect(result.current.submitError).toBe("要員登録に失敗しました");
  });
});
