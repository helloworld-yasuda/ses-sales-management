import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { mockSalesSummary } from "@/components/member/SalesSummary.mock";
import type { SummaryFormValues } from "@/hooks/useSummaryForm";
import { toSummaryFormValues } from "@/hooks/useSummaryForm";
import SummaryForm from "./SummaryForm";

const emptyValues: SummaryFormValues = {
  initial: "",
  age: "",
  mainSkills: "",
  experience: "",
  startDate: "",
  unitPrice: "",
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
};

describe("SummaryForm", () => {
  it("追加画面と同じラベルと初期値が表示される", () => {
    const memberSummary = mockSalesSummary[0];
    render(
      <SummaryForm defaultValues={toSummaryFormValues(memberSummary)} />,
    );

    expect(screen.getByText("営業サマリー情報の入力")).toBeInTheDocument();
    expect(screen.getByText("氏名（イニシャル）")).toBeInTheDocument();
    expect(screen.getByText("メイン技術")).toBeInTheDocument();
    expect(screen.getByText("実務経験年数")).toBeInTheDocument();
    expect(screen.getByDisplayValue(memberSummary.initial)).toBeInTheDocument();
    expect(screen.getByDisplayValue(memberSummary.mainskills)).toBeInTheDocument();
    expect(screen.getByLabelText("unitPrice")).toHaveTextContent("60万円");
  });

  it("必須項目が未入力の場合はエラーメッセージが表示される", async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();
    render(<SummaryForm defaultValues={emptyValues} onSave={onSave} />);

    await user.click(screen.getByRole("button", { name: "保存する" }));

    expect(
      screen.getByText("氏名（イニシャル）を入力してください"),
    ).toBeInTheDocument();
    expect(screen.getByText("年齢を入力してください")).toBeInTheDocument();
    expect(screen.getByText("メイン技術を入力してください")).toBeInTheDocument();
    expect(
      screen.getByText("実務経験年数を入力してください"),
    ).toBeInTheDocument();
    expect(screen.getByText("稼働開始を入力してください")).toBeInTheDocument();
    expect(screen.getByText("単価を選択してしてください")).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it("正しい入力でonSaveが呼ばれる", async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();
    render(
      <SummaryForm
        defaultValues={toSummaryFormValues(mockSalesSummary[0])}
        onSave={onSave}
      />,
    );

    await user.click(screen.getByRole("button", { name: "保存する" }));
    await waitFor(() => {
      expect(onSave).toHaveBeenCalledWith(
        expect.objectContaining({
          initial: "E.T",
          unitPrice: "600000",
        }),
      );
    });
  });

  it("単価を変更するとvalueが送信される", async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();
    render(
      <SummaryForm
        defaultValues={toSummaryFormValues(mockSalesSummary[0])}
        onSave={onSave}
      />,
    );

    await user.click(screen.getByLabelText("unitPrice"));
    await user.click(await screen.findByRole("option", { name: "50万円" }));
    await user.click(screen.getByRole("button", { name: "保存する" }));

    await waitFor(() => {
      expect(onSave).toHaveBeenCalledWith(
        expect.objectContaining({ unitPrice: "500000" }),
      );
    });
  });

  it("キャンセル押下でonCancelが呼ばれる", async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();
    render(
      <SummaryForm
        defaultValues={toSummaryFormValues(mockSalesSummary[0])}
        onCancel={onCancel}
      />,
    );

    await user.click(screen.getByRole("button", { name: "キャンセル" }));
    expect(onCancel).toHaveBeenCalled();
  });
});
