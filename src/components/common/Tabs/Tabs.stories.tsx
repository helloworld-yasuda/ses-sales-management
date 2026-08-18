import type { Meta, StoryObj } from "@storybook/react";
import TabsComponent from "./Tabs";

const meta: Meta<typeof TabsComponent> = {
  title: "Common/Tabs",
  component: TabsComponent,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;

export const Default: StoryObj<typeof TabsComponent> = {
  args: {
    id: "1",
  },
};
