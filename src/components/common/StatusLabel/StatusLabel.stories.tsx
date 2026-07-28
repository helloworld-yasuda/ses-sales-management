import type { Meta, StoryObj } from "@storybook/react";
import StatusLabelComponent from "./StatusLabel";

const meta: Meta<typeof StatusLabelComponent> = {
  title: "Common/StatusLabel",
  component: StatusLabelComponent,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof StatusLabelComponent>;

export const Default: Story = {
  args: {
    children: "Java",
  },
};
