import type { Meta, StoryObj } from "@storybook/react";
import TableComponent from "./Table";
import type { TableColumn } from "./Table";

const meta: Meta<typeof TableComponent> = {
  title: "Common/Table",
  component: TableComponent,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof TableComponent>;

const columns: TableColumn[] = [
  { label: "会社名", key: "companyName" },
  { label: "企業担当者", key: "contactPerson" },
  {
    label: "主要領域",
    key: "mainArea",
  },
  { label: "営業担当", key: "salesPerson" },
  { label: "ランク", key: "rank" },
];

const rows = [
  {
    id: 1,
    companyName: "株式会社テックソリューション",
    contactPerson: "山田 太郎",
    mainArea: "金融",
    salesPerson: "佐藤 花子",
    rank: "A",
  },
  {
    id: 2,
    companyName: "デジタルイノベーション株式会社",
    contactPerson: "鈴木 一郎",
    mainArea: "Web制作",
    salesPerson: "田中 美咲",
    rank: "B",
  },
  {
    id: 3,
    companyName: "クラウドシステムズ株式会社",
    contactPerson: "高橋 健太",
    mainArea: "インフラ, クラウド",
    salesPerson: "伊藤 直樹",
    rank: "C",
  },
];

export const Default: Story = {
  args: {
    columns,
    rows,
  },
};
