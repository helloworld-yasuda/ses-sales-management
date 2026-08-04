import { Meta, StoryObj } from "@storybook/react";
import Modal from "./Modal";

const meta: Meta<typeof Modal> = {
  title: "Common/Modal",
  component: Modal,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    open: true,
    onClose: () => {},
    onConfirm: () => {},
    title: "取引先を削除しますか？",
    description:
      "この操作は元に戻せません。関連するデータもすべて削除されます。",
    cancelLabel: "キャンセル",
    confirmLabel: "削除する",
  },
};

export const memberDelete: Story = {
  args: {
    open: true,
    onClose: () => {},
    onConfirm: () => {},
    title: "要員を削除しますか",
    description:
      "この操作は元に戻せません。関連するデータもすべて削除されます。",
    cancelLabel: "キャンセル",
    confirmLabel: "削除する",
    withIcon: true,
  },
};
