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
    onClick: (event) => {
      event.preventDefault(); // クリック時にページ遷移しないようにする
    },
    sx: {
      color: "primary.main",
      "&:visited": {
        color: "primary.main",
      },
    },
  },
};

export const Visited: Story = {
  args: {
    href: "/visited",
    children: "詳細",
    onClick: (event) => {
      event.preventDefault(); // クリック時にページ遷移しないようにする
    },
    sx: {
      color: "#7C3AED",
    },
  },
};
