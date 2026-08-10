import { Avatar, Box, Link, Stack, Typography } from "@mui/material";
import RankLabelComponent from "../RankLabel/RankLabel";
import type { Rank } from "../RankLabel/rankStyles";
import StatusLabelComponent from "../StatusLabel/StatusLabel";
import type { TableColumn } from "./Table";

export type CompanyRow = {
  id: number;
  companyName: string;
  contactPerson: string;
  mainArea: string;
  salesPerson: string;
  rank: Rank;
};

export type PersonnelRow = {
  id: number;
  name: string;
  nameKana: string;
  skills: string;
  unitPrice: string;
  experienceYears: string;
  availability: string;
};

// 取引先一覧モック（Storybook 用。画面の columns は useManagementPage 側で定義）
export const mockTableColumns: TableColumn<CompanyRow>[] = [
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

export const mockTableRows: CompanyRow[] = [
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

// 要員一覧モック
export const mockPersonnelColumns: TableColumn<PersonnelRow>[] = [
  {
    label: "要員氏名",
    key: "name",
    render: (row) => (
      <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
        <Avatar sx={{ width: 36, height: 36, bgcolor: "#CBD5E1" }} />
        <Box>
          <Typography sx={{ fontSize: 14, color: "#212121", lineHeight: 1.4 }}>
            {row.name}
          </Typography>
          <Typography sx={{ fontSize: 12, color: "#94A3B8", lineHeight: 1.4 }}>
            {row.nameKana}
          </Typography>
        </Box>
      </Stack>
    ),
  },
  {
    label: "主要スキル",
    key: "skills",
    render: (row) => (
      <Stack direction="row" spacing={0.5}>
        {row.skills.split(",").map((skill) => (
          <StatusLabelComponent key={skill}>{skill}</StatusLabelComponent>
        ))}
      </Stack>
    ),
  },
  {
    label: "単価 / 経験年数",
    key: "unitPrice",
    render: (row) => (
      <Box>
        <Typography sx={{ fontSize: 14, color: "#212121", lineHeight: 1.4 }}>
          {row.unitPrice}
        </Typography>
        <Typography sx={{ fontSize: 12, color: "#64748B", lineHeight: 1.4 }}>
          {row.experienceYears}
        </Typography>
      </Box>
    ),
  },
  { label: "稼働可能時期", key: "availability" },
  {
    label: "スキルシート",
    key: "nameKana",
    render: (row) => (
      <Link
        href={`/personnel/${row.id}/skill-sheet`}
        underline="none"
        onClick={(event) => event.stopPropagation()}
      >
        参照する
      </Link>
    ),
  },
  {
    label: "アクション",
    key: "id",
    render: (row) => (
      <>
        <Link
          href={`/member/${row.id}`}
          underline="none"
          onClick={(event) => event.stopPropagation()}
        >
          詳細
        </Link>{" "}
        <Link
          href={`/member/${row.id}/edit`}
          underline="none"
          onClick={(event) => event.stopPropagation()}
        >
          編集
        </Link>
      </>
    ),
  },
];

export const mockPersonnelRows: PersonnelRow[] = [
  {
    id: 1,
    name: "佐藤 健太",
    nameKana: "サトウ ケンタ",
    skills: "React,TypeScript,Node.js,AWS",
    unitPrice: "85万円/月",
    experienceYears: "経験8年",
    availability: "即可能",
  },
  {
    id: 2,
    name: "田中 美咲",
    nameKana: "タナカ ミサキ",
    skills: "Java,Spring Boot,PostgreSQL",
    unitPrice: "75万円/月",
    experienceYears: "経験6年",
    availability: "案件調整中",
  },
  {
    id: 3,
    name: "鈴木 一郎",
    nameKana: "スズキ イチロウ",
    skills: "Vue.js,PHP,Laravel,Docker",
    unitPrice: "70万円/月",
    experienceYears: "経験5年",
    availability: "稼働中",
  },
  {
    id: 4,
    name: "高橋 優子",
    nameKana: "タカハシ ユウコ",
    skills: "Python,Django,AWS,Terraform",
    unitPrice: "90万円/月",
    experienceYears: "経験10年",
    availability: "即可能",
  },
];
