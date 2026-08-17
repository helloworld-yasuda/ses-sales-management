import RankLabelComponent from "@/components/common/RankLabel/RankLabel";
import type { Rank } from "@/components/common/RankLabel/rankStyles";
import type { TableColumn } from "@/components/common/Table/Table";

export type CompanyRow = {
  id: number;
  companyName: string;
  contactPerson: string;
  mainArea: string;
  salesPerson: string;
  rank: Rank;
};

/** Storybook 用。画面の columns は useCompanyPage 側で定義 */
export const mockCompanyColumns: TableColumn<CompanyRow>[] = [
  { label: "会社名", key: "companyName" },
  { label: "営業担当者", key: "contactPerson" },
  { label: "主要領域", key: "mainArea" },
  { label: "自社営業担当", key: "salesPerson" },
  {
    label: "ランク",
    key: "rank",
    render: (row) => <RankLabelComponent rank={row.rank} />,
  },
  { label: "操作", key: "id" },
];

export const mockCompanyRows: CompanyRow[] = [
  {
    id: 1,
    companyName: "株式会社テックソリューション",
    contactPerson: "山田 太郎",
    mainArea: "Java",
    salesPerson: "佐藤 花子",
    rank: "A",
  },
  {
    id: 2,
    companyName: "デジタルイノベーション株式会社",
    contactPerson: "鈴木 一郎",
    mainArea: "React",
    salesPerson: "田中 美咲",
    rank: "B",
  },
  {
    id: 3,
    companyName: "クラウドシステムズ株式会社",
    contactPerson: "高橋 健太",
    mainArea: "AWS",
    salesPerson: "伊藤 直樹",
    rank: "C",
  },
  {
    id: 4,
    companyName: "ネクストウェーブ株式会社",
    contactPerson: "中村 翔",
    mainArea: "Python",
    salesPerson: "佐藤 花子",
    rank: "A",
  },
  {
    id: 5,
    companyName: "スマートデータ株式会社",
    contactPerson: "小林 美咲",
    mainArea: "Go",
    salesPerson: "田中 美咲",
    rank: "B",
  },
  {
    id: 6,
    companyName: "フューチャーリンク株式会社",
    contactPerson: "加藤 大輔",
    mainArea: "Vue",
    salesPerson: "伊藤 直樹",
    rank: "C",
  },
  {
    id: 7,
    companyName: "オリエンタルソフト株式会社",
    contactPerson: "吉田 彩",
    mainArea: "Java / Spring",
    salesPerson: "佐藤 花子",
    rank: "A",
  },
  {
    id: 8,
    companyName: "ブルーオーシャン株式会社",
    contactPerson: "山本 健",
    mainArea: "React / TypeScript",
    salesPerson: "田中 美咲",
    rank: "B",
  },
  {
    id: 9,
    companyName: "サンライズテック株式会社",
    contactPerson: "松本 裕子",
    mainArea: "AWS / Terraform",
    salesPerson: "伊藤 直樹",
    rank: "A",
  },
  {
    id: 10,
    companyName: "グローバルワークス株式会社",
    contactPerson: "井上 誠",
    mainArea: "PHP / Laravel",
    salesPerson: "佐藤 花子",
    rank: "C",
  },
  {
    id: 11,
    companyName: "アステリアシステムズ株式会社",
    contactPerson: "木村 玲奈",
    mainArea: "Kotlin",
    salesPerson: "田中 美咲",
    rank: "B",
  },
  {
    id: 12,
    companyName: "ハイパフォーマンス株式会社",
    contactPerson: "林 拓也",
    mainArea: "C# /.NET",
    salesPerson: "伊藤 直樹",
    rank: "A",
  },
  {
    id: 13,
    companyName: "コードクラフト株式会社",
    contactPerson: "斎藤 真由",
    mainArea: "Flutter",
    salesPerson: "佐藤 花子",
    rank: "B",
  },
  {
    id: 14,
    companyName: "データブリッジ株式会社",
    contactPerson: "清水 剛",
    mainArea: "Scala",
    salesPerson: "田中 美咲",
    rank: "C",
  },
  {
    id: 15,
    companyName: "イノベートラボ株式会社",
    contactPerson: "森 恵",
    mainArea: "Node.js",
    salesPerson: "伊藤 直樹",
    rank: "A",
  },
  {
    id: 16,
    companyName: "プライムパートナーズ株式会社",
    contactPerson: "池田 亮",
    mainArea: "Ruby on Rails",
    salesPerson: "佐藤 花子",
    rank: "B",
  },
  {
    id: 17,
    companyName: "セキュアネット株式会社",
    contactPerson: "橋本 優",
    mainArea: "セキュリティ",
    salesPerson: "田中 美咲",
    rank: "A",
  },
  {
    id: 18,
    companyName: "モバイルファースト株式会社",
    contactPerson: "石川 奈々",
    mainArea: "Swift",
    salesPerson: "伊藤 直樹",
    rank: "C",
  },
  {
    id: 19,
    companyName: "クラウドネイティブ株式会社",
    contactPerson: "前田 浩二",
    mainArea: "Kubernetes",
    salesPerson: "佐藤 花子",
    rank: "B",
  },
  {
    id: 20,
    companyName: "エクスペリエンスデザイン株式会社",
    contactPerson: "藤原 里奈",
    mainArea: "UI/UX",
    salesPerson: "田中 美咲",
    rank: "A",
  },
  {
    id: 21,
    companyName: "アナリティクスワン株式会社",
    contactPerson: "岡田 智也",
    mainArea: "データ分析",
    salesPerson: "伊藤 直樹",
    rank: "B",
  },
  {
    id: 22,
    companyName: "ディープラーニング研究所",
    contactPerson: "長谷川 萌",
    mainArea: "機械学習",
    salesPerson: "佐藤 花子",
    rank: "A",
  },
  {
    id: 23,
    companyName: "エンタープライズソリューションズ",
    contactPerson: "村上 健太",
    mainArea: "SAP",
    salesPerson: "田中 美咲",
    rank: "C",
  },
  {
    id: 24,
    companyName: "オープンソースジャパン株式会社",
    contactPerson: "近藤 あかり",
    mainArea: "Linux",
    salesPerson: "伊藤 直樹",
    rank: "B",
  },
];
