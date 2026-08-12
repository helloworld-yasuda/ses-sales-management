import { Avatar, Box, Stack, Typography } from "@mui/material";
import LinkComponent from "@/components/common/Link/Link";
import StatusLabelComponent from "@/components/common/StatusLabel/StatusLabel";
import type { TableColumn } from "@/components/common/Table/Table";

export type PersonnelRow = {
  id: number;
  name: string;
  nameKana: string;
  skills: string;
  unitPrice: string;
  experienceYears: string;
  availability: string;
};

/** Storybook 用。画面の columns は useMemberPage 側で定義 */
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
      <LinkComponent
        href={`/member/${row.id}/skill-sheet`}
        underline="none"
        onClick={(event) => event.stopPropagation()}
      >
        参照する
      </LinkComponent>
    ),
  },
  {
    label: "アクション",
    key: "id",
    render: (row) => (
      <>
        <LinkComponent
          href={`/member/${row.id}`}
          underline="none"
          onClick={(event) => event.stopPropagation()}
        >
          詳細
        </LinkComponent>{" "}
        <LinkComponent
          href={`/member/${row.id}/edit`}
          underline="none"
          onClick={(event) => event.stopPropagation()}
        >
          編集
        </LinkComponent>
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
  {
    id: 5,
    name: "伊藤 直樹",
    nameKana: "イトウ ナオキ",
    skills: "Go,Kubernetes,GCP",
    unitPrice: "88万円/月",
    experienceYears: "経験9年",
    availability: "来月〜",
  },
  {
    id: 6,
    name: "渡辺 彩",
    nameKana: "ワタナベ アヤ",
    skills: "Swift,iOS,Firebase",
    unitPrice: "80万円/月",
    experienceYears: "経験7年",
    availability: "即可能",
  },
  {
    id: 7,
    name: "中村 翔",
    nameKana: "ナカムラ ショウ",
    skills: "Kotlin,Android,GraphQL",
    unitPrice: "78万円/月",
    experienceYears: "経験6年",
    availability: "稼働中",
  },
  {
    id: 8,
    name: "小林 美咲",
    nameKana: "コバヤシ ミサキ",
    skills: "C#,NET,Azure",
    unitPrice: "82万円/月",
    experienceYears: "経験8年",
    availability: "即可能",
  },
  {
    id: 9,
    name: "加藤 大輔",
    nameKana: "カトウ ダイスケ",
    skills: "Ruby,Rails,MySQL",
    unitPrice: "72万円/月",
    experienceYears: "経験5年",
    availability: "案件調整中",
  },
  {
    id: 10,
    name: "吉田 真由",
    nameKana: "ヨシダ マユ",
    skills: "Flutter,Dart,Firebase",
    unitPrice: "76万円/月",
    experienceYears: "経験4年",
    availability: "即可能",
  },
  {
    id: 11,
    name: "山本 健",
    nameKana: "ヤマモト ケン",
    skills: "Scala,Spark,Kafka",
    unitPrice: "95万円/月",
    experienceYears: "経験11年",
    availability: "来月〜",
  },
  {
    id: 12,
    name: "松本 裕子",
    nameKana: "マツモト ユウコ",
    skills: "React,Next.js,TypeScript",
    unitPrice: "84万円/月",
    experienceYears: "経験7年",
    availability: "稼働中",
  },
];
