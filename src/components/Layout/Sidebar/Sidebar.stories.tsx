import type { Meta, StoryObj } from "@storybook/react";
import Sidebar from "./Sidebar";

const meta: Meta<typeof Sidebar> = {
  title: "Layout/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    nextjs: {
      navigation: {
        pathname: "/company",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  args: {
    userName: "佐藤健太",
    role: "営業部長",
    onLogout: () => {},
  },
};
