export type MemberDetail = {
  id: string;
  imageUrl: string;
  name: string;
  nameKana: string;
  affiliation: string;
  nearestStation: string;
  upperCompany: string;
  paymentTerms: string;
  renewal: string;
  experienceYears: string;
  unitPrice: string;
  skills: string[];
  skillSheet: {
    fileName: string;
    updatedAt: string;
  };
  availability: string;
  remarks: string;
};

export const mockMemberDetails: MemberDetail[] = [
  {
    id: "1",
    imageUrl: "/images/member/1.jpg",
    name: "佐藤 健太",
    nameKana: "サトウ ケンタ",
    affiliation: "自社社員 (SES第1事業部)",
    nearestStation: "新宿駅",
    upperCompany: "ABC商事株式会社",
    paymentTerms: "月末締め翌月末払い",
    renewal: "3ヶ月",
    experienceYears: "8年 (フロントエンド中心)",
    unitPrice: "85万円/月",
    skills: ["React", "TypeScript", "Node.js", "AWS"],
    skillSheet: {
      fileName: "佐藤健太_スキルシート_202602.pdf",
      updatedAt: "2026/02/01",
    },
    availability: "即可能",
    remarks:
      "フロントエンド開発を軸としつつ、Terraformを利用したインフラ構成管理やAWS構築の実務経験もあり。リーダーシップ経験もあり、将来のPM候補として期待できる人材。",
  },
  {
    id: "2",
    imageUrl: "/images/member/2.jpg",
    name: "田中 美咲",
    nameKana: "タナカ ミサキ",
    affiliation: "協力会社社員 (パートナー)",
    nearestStation: "渋谷駅",
    upperCompany: "デジタルイノベーション株式会社",
    paymentTerms: "月末締め翌々月末払い",
    renewal: "6ヶ月",
    experienceYears: "6年 (バックエンド中心)",
    unitPrice: "75万円/月",
    skills: ["Java", "Spring Boot", "PostgreSQL"],
    skillSheet: {
      fileName: "田中美咲_スキルシート_202601.pdf",
      updatedAt: "2026/01/15",
    },
    availability: "案件調整中",
    remarks: "大規模基幹系の開発経験が豊富。チームリード経験あり。",
  },
  {
    id: "3",
    imageUrl: "/images/member/3.jpg",
    name: "鈴木 一郎",
    nameKana: "スズキ イチロウ",
    affiliation: "自社社員 (SES第2事業部)",
    nearestStation: "品川駅",
    upperCompany: "クラウドシステムズ株式会社",
    paymentTerms: "月末締め翌月末払い",
    renewal: "3ヶ月",
    experienceYears: "5年 (フルスタック)",
    unitPrice: "70万円/月",
    skills: ["Vue.js", "PHP", "Laravel", "Docker"],
    skillSheet: {
      fileName: "鈴木一郎_スキルシート_202512.pdf",
      updatedAt: "2025/12/20",
    },
    availability: "稼働中",
    remarks: "Webアプリケーション開発を中心に、インフラ寄りの作業も対応可能。",
  },
  {
    id: "4",
    imageUrl: "/images/member/4.jpg",
    name: "高橋 優子",
    nameKana: "タカハシ ユウコ",
    affiliation: "自社社員 (SES第1事業部)",
    nearestStation: "池袋駅",
    upperCompany: "ネクストウェア株式会社",
    paymentTerms: "月末締め翌月末払い",
    renewal: "6ヶ月",
    experienceYears: "10年 (インフラ・バックエンド)",
    unitPrice: "90万円/月",
    skills: ["Python", "Django", "AWS", "Terraform"],
    skillSheet: {
      fileName: "高橋優子_スキルシート_202602.pdf",
      updatedAt: "2026/02/10",
    },
    availability: "即可能",
    remarks: "インフラ設計からアプリケーション開発まで幅広く対応可能。",
  },
];
