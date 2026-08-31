import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import CompanyEmptyState from "./CompanyEmptyState";

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

describe("CompanyEmptyState", () => {
  it("空状態の文言が表示される", () => {
    render(<CompanyEmptyState onAdd={vi.fn()} />);

    expect(screen.getByText("データがありません")).toBeInTheDocument();
    expect(screen.getByText("取引先を追加してください。")).toBeInTheDocument();
  });

  it("登録ボタン押下でonAddが呼ばれる", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<CompanyEmptyState onAdd={onAdd} />);

    await user.click(
      screen.getByRole("button", { name: "＋ 初めての取引先を登録する" }),
    );

    expect(onAdd).toHaveBeenCalled();
  });
});
