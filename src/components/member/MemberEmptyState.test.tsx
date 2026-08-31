import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import MemberEmptyState from "./MemberEmptyState";

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

describe("MemberEmptyState", () => {
  it("空状態の文言が表示される", () => {
    render(<MemberEmptyState onAdd={vi.fn()} />);

    expect(screen.getByText("データがありません")).toBeInTheDocument();
    expect(screen.getByText("要員を追加してください。")).toBeInTheDocument();
  });

  it("登録ボタン押下でonAddが呼ばれる", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<MemberEmptyState onAdd={onAdd} />);

    await user.click(
      screen.getByRole("button", { name: "＋ 初めての要員を登録する" }),
    );

    expect(onAdd).toHaveBeenCalled();
  });
});
