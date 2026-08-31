import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { mockSalesSummary } from "@/components/member/SalesSummary.mock";
import useSummaryForm, { toSummaryFormValues } from "./useSummaryForm";

const defaultValues = toSummaryFormValues(mockSalesSummary[0]);

describe("useSummaryForm", () => {
  it("モックデータからフォーム初期値に変換できる", () => {
    expect(toSummaryFormValues(mockSalesSummary[0])).toEqual({
      initial: "E.T",
      age: "22",
      mainSkills: "React / Next.js",
      experience: "実務3年9ヶ月",
      startDate: "7月~",
      unitPrice: "600000",
      nearestStation: "新宿駅",
      affiliation: "弊社正社員",
      features: mockSalesSummary[0].features,
      frontendSkills: mockSalesSummary[0].frontendSkills,
      backendSkills: mockSalesSummary[0].backendSkills,
      databaseSkills: mockSalesSummary[0].databaseSkills,
      aiSkills: mockSalesSummary[0].aiSkills,
      desiredConditions: mockSalesSummary[0].desiredConditions,
      parallelStatus: "提案のみ",
      availableDate: "柔軟に調整可能",
      avaiableAreas: mockSalesSummary[0].avaiableAreas,
    });
  });

  it("送信失敗時にエラーメッセージが設定される", async () => {
    const onSave = vi.fn().mockRejectedValue(new Error("保存に失敗しました"));
    const { result } = renderHook(() =>
      useSummaryForm({ defaultValues, onSave }),
    );

    await act(async () => {
      await result.current.onSubmit(defaultValues);
    });

    expect(result.current.submitError).toBe("保存に失敗しました");
  });
});
