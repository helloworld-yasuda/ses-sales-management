import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Paging } from "./Paging";

const meta = {
  title: "Common/Paging",
  component: Paging,
} satisfies Meta<typeof Paging>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage);

    return (
      <Paging
        {...args}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    );
  },
  args: {
    currentPage: 1,
    totalPages: 10,
    onPageChange: () => {},
  },
};
