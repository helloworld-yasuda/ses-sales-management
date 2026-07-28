import type { Meta, StoryObj } from "@storybook/react";
import TextFieldComponent from "./TextField";

const meta: Meta<typeof TextFieldComponent> = {
  title: "Common/TextField",
  component: TextFieldComponent,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof TextFieldComponent>;

export const Password: Story = {
  args: {
    label: "メールアドレス",
    variant: "outlined",
    type: "password",
  },
};

export const Outlined: Story = {
  args: {
    label: "メールアドレス",
    variant: "outlined",
  },
};
