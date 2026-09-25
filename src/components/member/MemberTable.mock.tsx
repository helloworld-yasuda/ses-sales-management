import { Avatar, Box, Stack, Typography } from "@mui/material";
import LinkComponent from "@/components/common/Link/Link";
import StatusLabelComponent from "@/components/common/StatusLabel/StatusLabel";
import type { TableColumn } from "@/components/common/Table/Table";
import type { Member, MemberTableRow } from "@/app/types/types";

/** Storybook 用。画面の columns は useMemberPage 側で定義 */
export const mockMemberTableColumns: TableColumn<MemberTableRow>[] = [
  {
    label: "要員氏名",
    key: "memberName",
    render: (row) => (
      <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
        <Avatar sx={{ width: 36, height: 36, bgcolor: "#CBD5E1" }} />
        <Box>
          <Typography sx={{ fontSize: 14, color: "#212121", lineHeight: 1.4 }}>
            {row.memberName}
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
    key: "mainSkills",
    render: (row) => (
      <Stack direction="row" spacing={0.5}>
        {row.mainSkills.map((skill) => (
          <StatusLabelComponent key={skill}>{skill}</StatusLabelComponent>
        ))}
      </Stack>
    ),
  },
  {
    label: "単価 / 経験年数",
    key: "offerRate",
    render: (row) => (
      <Box>
        <Typography sx={{ fontSize: 14, color: "#212121", lineHeight: 1.4 }}>
          {row.offerRate}
        </Typography>
        <Typography sx={{ fontSize: 12, color: "#64748B", lineHeight: 1.4 }}>
          {row.experienceYears}
        </Typography>
      </Box>
    ),
  },
  { label: "稼働可能時期", key: "statuses" },
  {
    label: "スキルシート",
    key: "skillSheetUrl",
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

export const mockMemberTableRows: Member[] = [
  {
    memberId: 1,
    memberName: "佐藤 健太",
    mainSkills: ["React", "TypeScript", "Node.js", "AWS"],
    offerRate: 850000,
    experienceYears: 8,
    statuses: "即可能",
    skillSheetUrl: "https://example.com/skill-sheet",
  },
  {
    memberId: 2,
    memberName: "田中 美咲",
    mainSkills: ["Java", "Spring Boot", "PostgreSQL"],
    offerRate: 750000,
    experienceYears: 6,
    statuses: "案件調整中",
    skillSheetUrl: "https://example.com/skill-sheet",
  },
  {
    memberId: 3,
    memberName: "鈴木 一郎",
    mainSkills: ["Vue.js", "PHP", "Laravel", "Docker"],
    offerRate: 700000,
    experienceYears: 5,
    statuses: "稼働中",
    skillSheetUrl: "https://example.com/skill-sheet",
  },
  {
    memberId: 4,
    memberName: "高橋 優子",
    mainSkills: ["Python", "Django", "AWS", "Terraform"],
    offerRate: 900000,
    experienceYears: 10,
    statuses: "即可能",
    skillSheetUrl: "https://example.com/skill-sheet",
  },
  {
    memberId: 5,
    memberName: "伊藤 直樹",
    mainSkills: ["Go", "Kubernetes", "GCP"],
    offerRate: 880000,
    experienceYears: 9,
    statuses: "来月〜",
    skillSheetUrl: "https://example.com/skill-sheet",
  },
  {
    memberId: 6,
    memberName: "渡辺 彩",
    mainSkills: ["Swift", "iOS", "Firebase"],
    offerRate: 800000,
    experienceYears: 7,
    statuses: "即可能",
    skillSheetUrl: "https://example.com/skill-sheet",
  },
  {
    memberId: 7,
    memberName: "中村 翔",
    mainSkills: ["Kotlin", "Android", "GraphQL"],
    offerRate: 780000,
    experienceYears: 6,
    statuses: "稼働中",
    skillSheetUrl: "https://example.com/skill-sheet",
  },
  {
    memberId: 8,
    memberName: "小林 美咲",
    mainSkills: ["C#", "NET", "Azure"],
    offerRate: 820000,
    experienceYears: 8,
    statuses: "即可能",
    skillSheetUrl: "https://example.com/skill-sheet",
  },
  {
    memberId: 9,
    memberName: "加藤 大輔",
    mainSkills: ["Ruby", "Rails", "MySQL"],
    offerRate: 720000,
    experienceYears: 5,
    statuses: "案件調整中",
    skillSheetUrl: "https://example.com/skill-sheet",
  },
  {
    memberId: 10,
    memberName: "吉田 真由",
    mainSkills: ["Flutter", "Dart", "Firebase"],
    offerRate: 760000,
    experienceYears: 4,
    statuses: "即可能",
    skillSheetUrl: "https://example.com/skill-sheet",
  },
  {
    memberId: 11,
    memberName: "山本 健",
    mainSkills: ["Scala", "Spark", "Kafka"],
    offerRate: 950000,
    experienceYears: 11,
    statuses: "来月〜",
    skillSheetUrl: "https://example.com/skill-sheet",
  },
  {
    memberId: 12,
    memberName: "松本 裕子",
    mainSkills: ["React", "Next.js", "TypeScript"],
    offerRate: 840000,
    experienceYears: 7,
    statuses: "稼働中",
    skillSheetUrl: "https://example.com/skill-sheet",
  },
];
