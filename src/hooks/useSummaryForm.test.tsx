import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { mockSalesSummary } from "@/components/member/SalesSummary.mock";
import useSummaryForm, { toSummaryFormValues } from "./useSummaryForm";

const defaultValues = toSummaryFormValues(mockSalesSummary[0]);

describe("useSummaryForm", () => {
  it("モックデータからフォーム初期値に変換できる", () => {
    expect(toSummaryFormValues(mockSalesSummary[0])).toEqual({
      initial: "T.Y",
      age: "28",
      mainSkills: "Spring Boot / Java / PostgreSQL",
      experience: "実務5年",
      startDate: "7月~",
      unitPrice: "700000",
      nearestStation: "東京駅",
      affiliation: "弊社正社員",
      features: mockSalesSummary[0].features,
      frontendSkills: mockSalesSummary[0].frontendSkills,
      backendSkills: mockSalesSummary[0].backendSkills,
      databaseSkills: mockSalesSummary[0].databaseSkills,
      aiSkills: mockSalesSummary[0].aiSkills,
      desiredConditions: mockSalesSummary[0].desiredConditions,
      parallelStatus: "待機中",
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
