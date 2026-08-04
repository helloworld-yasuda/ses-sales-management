import type { Meta, StoryObj } from "@storybook/react";
import Sidebar from "./Sidebar";

const meta: Meta<typeof Sidebar> = {
  title: "Layout/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  args: {
    title: "SES Manager",
    description: "Sales Core",
    selected: "partners",
    userName: "佐藤健太",
    role: "営業部長",
    onSelect: () => {},
    onLogout: () => {},
  },
};
