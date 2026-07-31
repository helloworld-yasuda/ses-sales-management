import type { Meta, StoryObj } from "@storybook/react";
import {
  mockPersonnelColumns,
  mockPersonnelRows,
  mockTableColumns,
  mockTableRows,
  type CompanyRow,
  type PersonnelRow,
} from "./Table.mock";
import TableComponent from "./Table";

const meta: Meta<typeof TableComponent> = {
  title: "Common/Table",
  component: TableComponent,
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryObj<typeof TableComponent<CompanyRow>> = {
  args: {
    columns: mockTableColumns,
    rows: mockTableRows,
  },
};

export const Personnel: StoryObj<typeof TableComponent<PersonnelRow>> = {
  args: {
    columns: mockPersonnelColumns,
    rows: mockPersonnelRows,
  },
};
