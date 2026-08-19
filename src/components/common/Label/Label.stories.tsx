import type { Meta, StoryObj } from "@storybook/react";
import LabelComponent from "./Label";

const meta: Meta<typeof LabelComponent> = {
  title: "Common/Label",
  component: LabelComponent,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof LabelComponent>;

export const Default: Story = {
  args: {
    label: "営業共通メールアドレス",
  },
};

export const Required: Story = {
  args: {
    label: "会社名",
    required: true,
  },
};
