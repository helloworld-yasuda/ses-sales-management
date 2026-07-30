import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import SelectBoxComponent from "./SelectBox";

const meta: Meta<typeof SelectBoxComponent> = {
  title: "Common/SelectBox",
  component: SelectBoxComponent,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SelectBoxComponent>;

const options: { label: string; value: string }[] = [
  { label: "java", value: "1" },
  { label: "python", value: "2" },
  { label: "javascript", value: "3" },
];

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState("");

    return (
      <SelectBoxComponent
        {...args}
        value={value}
        onChange={(event) => setValue(String(event.target.value))}
      />
    );
  },
  args: {
    placeholder: "選択してください",
    options,
  },
};
