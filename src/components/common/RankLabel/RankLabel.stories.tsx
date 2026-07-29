import type { Meta, StoryObj } from "@storybook/react";
import RankLabelComponent from "./RankLabel";

const meta: Meta<typeof RankLabelComponent> = {
  title: "Common/RankLabel",
  component: RankLabelComponent,
  tags: ["autodocs"],
  argTypes: {
    rank: {
      control: "select",
      options: ["A", "B", "C"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof RankLabelComponent>;

export const RankA: Story = {
  args: {
    rank: "A",
  },
};

export const RankB: Story = {
  args: {
    rank: "B",
  },
};

export const RankC: Story = {
  args: {
    rank: "C",
  },
};
