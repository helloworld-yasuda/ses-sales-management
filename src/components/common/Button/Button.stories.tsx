import type { Meta, StoryObj } from "@storybook/react";
import ButtonComponent from "./Button";

const meta: Meta<typeof ButtonComponent> = {
  title: "Common/Button",
  component: ButtonComponent,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ButtonComponent>;

export const Outlined: Story = {
  args: {
    children: "キャンセル",
    variant: "outlined",
    color: "primary",
  },
};

export const Contained: Story = {
  args: {
    children: "削除",
    variant: "contained",
    color: "error",
  },
};

export const WithIcon: Story = {
  args: {
    children: "新規追加",
    variant: "contained",
    color: "primary",
    withIcon: true,
  },
};
