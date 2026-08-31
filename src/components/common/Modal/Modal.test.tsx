import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Modal from "./Modal";

vi.mock("next/image", () => ({
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}));

const renderModal = ({
  onClose = vi.fn(),
  onConfirm = vi.fn(),
}: {
  onClose?: () => void;
  onConfirm?: () => void;
} = {}) => {
  render(
    <Modal
      open
      onClose={onClose}
      onConfirm={onConfirm}
      title="取引先を削除しますか？"
      description="この操作は元に戻せません。関連するデータもすべて削除されます。"
    />,
  );
  return { onClose, onConfirm };
};

describe("Modal", () => {
  it("キャンセル押下でonCloseが呼ばれる", async () => {
    const user = userEvent.setup({ delay: null });
    const { onClose } = renderModal();

    await user.click(screen.getByRole("button", { name: "キャンセル" }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("背景タップではonCloseが呼ばれない", async () => {
    const user = userEvent.setup({ delay: null });
    const { onClose } = renderModal();
    const backdrop = document.querySelector(".MuiBackdrop-root");

    expect(backdrop).toBeTruthy();
    if (!backdrop) {
      return;
    }

    await user.click(backdrop);

    expect(onClose).not.toHaveBeenCalled();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("EscapeキーではonCloseが呼ばれない", async () => {
    const user = userEvent.setup({ delay: null });
    const { onClose } = renderModal();

    await user.keyboard("{Escape}");

    expect(onClose).not.toHaveBeenCalled();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
