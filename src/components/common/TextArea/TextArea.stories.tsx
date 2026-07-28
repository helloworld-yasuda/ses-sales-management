import type { Meta, StoryObj } from "@storybook/react";
import TextAreaComponent from "./TextArea";

const meta: Meta<typeof TextAreaComponent> = {
  title: "Common/TextArea",
  component: TextAreaComponent,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof TextAreaComponent>;

export const Default: Story = {
  args: {
    placeholder: "値を入力",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "この項目は編集できません",
    disabled: true,
  },
};
