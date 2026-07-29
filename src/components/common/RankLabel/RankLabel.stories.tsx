import { Meta, StoryObj } from "@storybook/react";
import RankLabelComponent from "./RankLabel";

const meta: Meta<typeof RankLabelComponent> = {
  title: "Common/RankLabel",
  component: RankLabelComponent,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof RankLabelComponent>;

export const Default: Story = {
  args: {
    children: "A",
  },
};
