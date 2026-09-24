import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import useCreateSalesSummaryForm from "./useCreateSalesSummaryForm";

describe("useCreateSalesSummaryForm", () => {
  it("送信失敗時にエラーメッセージが表示される", async () => {
    const onCreateSalesSummary = vi
      .fn()
      .mockRejectedValue(new Error("会社登録に失敗しました"));

    const { result } = renderHook(() =>
      useCreateSalesSummaryForm({ onCreateSalesSummary }),
    );

    await act(async () => {
      await result.current.onSubmit({
        initial: "Y.S",
        age: "25歳",
        mainSkills: "React, Next.js",
        experience: "3年",
        startDate: "10月〜",
        unitPrice: "50万円",
        nearestStation: "",
        affiliation: "",
        features: "",
        frontendSkills: "",
        backendSkills: "",
        databaseSkills: "",
        aiSkills: "",
        desiredConditions: "",
        parallelStatus: "",
        availableDate: "",
        avaiableAreas: "",
      });
    });

    expect(result.current.submitError).toBe("会社登録に失敗しました");
  });
});
