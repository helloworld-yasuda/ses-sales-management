import type { Meta, StoryObj } from "@storybook/react";
import LinkComponent from "./Link";

const meta: Meta<typeof LinkComponent> = {
  title: "Common/Link",
  component: LinkComponent,
  tags: ["autodocs"],
  argTypes: {
    href: {
      control: "text",
    },
  },
};

export default meta;

type Story = StoryObj<typeof LinkComponent>;

export const Default: Story = {
  args: {
    href: "/edit",
    children: "編集",
  },
};

export const Visited: Story = {
  args: {
    href: "/visited",
    children: "詳細",
    sx: {
      color: "#7C3AED",
    },
  },
};
