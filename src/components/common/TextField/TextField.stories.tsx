import type { Meta, StoryObj } from "@storybook/react";
import TextFieldComponent from "./TextField";

const meta: Meta<typeof TextFieldComponent> = {
  title: "Common/TextField",
  component: TextFieldComponent,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof TextFieldComponent>;

export const Default: Story = {
  args: {
    placeholder: "値を入力",
  },
};

export const Password: Story = {
  args: {
    placeholder: "パスワードを入力",
    type: "password",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "この項目は編集できません",
    disabled: true,
  },
};

export const Validation: Story = {
  args: {
    placeholder: "値を入力",
    type: "password",
    error: true,
    helperText: "正しい値を入力してください",
  },
};
