import type { Meta, StoryObj } from "@storybook/react";
import {
  mockCompanyColumns,
  mockCompanyRows,
  type CompanyRow,
} from "@/components/management/CompanyTable.mock";
import {
  mockPersonnelColumns,
  mockPersonnelRows,
  type PersonnelRow,
} from "@/components/member/MemberTable.mock";
import TableComponent from "./Table";

const meta: Meta<typeof TableComponent> = {
  title: "Common/Table",
  component: TableComponent,
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryObj<typeof TableComponent<CompanyRow>> = {
  args: {
    columns: mockCompanyColumns,
    rows: mockCompanyRows,
  },
};

export const Personnel: StoryObj<typeof TableComponent<PersonnelRow>> = {
  args: {
    columns: mockPersonnelColumns,
    rows: mockPersonnelRows,
  },
};
