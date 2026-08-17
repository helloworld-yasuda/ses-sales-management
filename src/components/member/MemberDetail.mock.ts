type MemberDetail = {
  id: string;
  name: string;
  nameKana: string;
  workPlace: string;
  neareststation: string;
  parentcompany: string;
  duedate: string;
  update: string;
  experienceYears: number;
  unitPrice: number;
  skills: string[];
  skillSheetUrl: string;
  availability: string;
  note: string;
  avatarUrl: string;
};

export const mockMemberDetail: MemberDetail[] = [
  {
    id: "1",
    name: "山田 太郎",
    nameKana: "ヤマダ タロウ",
    workPlace: "株式会社 山田",
    neareststation: "新宿駅",
    parentcompany: "ABC商事株式会社",
    duedate: "月末締め翌月末払い",
    update: "3ヶ月",
    experienceYears: 1,
    unitPrice: 65,
    skills: ["Skill 1", "Skill 2", "Skill 3"],
    skillSheetUrl: "https://example.com/skill-sheet.pdf",
    availability: "出向中",
    note: "テストメモ",
    avatarUrl: "https://example.com/avatar.png",
  },
  {
    id: "2",
    name: "高橋 翔太",
    nameKana: "タカハシ ショウタ",
    workPlace: "株式会社 高橋",
    neareststation: "新宿駅",
    parentcompany: "ABC商事株式会社",
    duedate: "月末締め翌月末払い",
    update: "Jane Doe",
    experienceYears: 2,
    unitPrice: 85,
    skills: ["Skill 4", "Skill 5", "Skill 6"],
    skillSheetUrl: "https://example.com/skill-sheet.pdf",
    availability: "即可能",
    note: "テストメモ",
    avatarUrl: "https://example.com/avatar.png",
  },
  {
    id: "3",
    name: "Jim Doe",
    nameKana: "Jim Doe",
    workPlace: "Jim Doe",
    neareststation: "Jim Doe",
    parentcompany: "Jim Doe",
    duedate: "Jim Doe",
    update: "Jim Doe",
    experienceYears: 3,
    unitPrice: 300000,
    skills: ["Skill 7", "Skill 8", "Skill 9"],
    skillSheetUrl: "https://example.com/skill-sheet.pdf",
    availability: "Available",
    note: "Note",
    avatarUrl: "https://example.com/avatar.png",
  },
];
