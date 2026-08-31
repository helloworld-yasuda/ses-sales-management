import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import SummaryEmptyState from "./SummaryEmptyState";

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
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} src={src} width={width} height={height} />
  ),
}));

describe("SummaryEmptyState", () => {
  it("空状態の文言が表示される", () => {
    render(<SummaryEmptyState onAdd={vi.fn()} />);

    expect(screen.getByText("データがありません")).toBeInTheDocument();
    expect(
      screen.getByText("営業サマリーを追加してください。"),
    ).toBeInTheDocument();
  });

  it("登録ボタン押下でonAddが呼ばれる", async () => {
    const user = userEvent.setup({ delay: null });
    const onAdd = vi.fn();
    render(<SummaryEmptyState onAdd={onAdd} />);

    await user.click(
      screen.getByRole("button", {
        name: "営業サマリーを登録する",
      }),
    );

    expect(onAdd).toHaveBeenCalled();
  });
});
