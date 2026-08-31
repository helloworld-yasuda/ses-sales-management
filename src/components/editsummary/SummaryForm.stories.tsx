import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { mockSalesSummary } from "@/components/member/SalesSummary.mock";
import { toSummaryFormValues } from "@/hooks/useSummaryForm";
import SummaryForm from "./SummaryForm";

const meta: Meta<typeof SummaryForm> = {
  title: "EditSummary/SummaryForm",
  component: SummaryForm,
  tags: ["autodocs"],
  args: {
    defaultValues: toSummaryFormValues(mockSalesSummary[0]),
    onSave: fn(),
    onCancel: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof SummaryForm>;

export const Default: Story = {};
