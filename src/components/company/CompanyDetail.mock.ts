export type CompanyDetail = {
  id: string;
  name: string;
  representative: string;
  email: string;
  companyEmail: string;
  salesName: string;
  rank: string;
  mainArea: string;
  interviewAchievement: string;
  deliveryAvailability: string;
  lineAvailability: string;
};

export const mockCompanyDetails: CompanyDetail[] = [
  {
    id: "1",
    name: "株式会社 テクノロジーソリューションズ",
    representative: "山田 太郎",
    email: "sales@tech-solutions.example.com",
    companyEmail: "yamada@tech-solutions.example.com",
    salesName: "佐藤 花子",
    rank: "A",
    mainArea: "Java / Spring",
    interviewAchievement: "0",
    deliveryAvailability: "0",
    lineAvailability: "0",
  },
  {
    id: "2",
    name: "デジタルイノベーション株式会社",
    representative: "鈴木 一郎",
    email: "sales@digital-innovation.example.com",
    companyEmail: "suzuki@digital-innovation.example.com",
    salesName: "田中 美咲",
    rank: "B",
    mainArea: "React / TypeScript",
    interviewAchievement: "0",
    deliveryAvailability: "1",
    lineAvailability: "0",
  },
  {
    id: "3",
    name: "クラウドシステムズ株式会社",
    representative: "高橋 健太",
    email: "sales@cloud-systems.example.com",
    companyEmail: "takahashi@cloud-systems.example.com",
    salesName: "伊藤 直樹",
    rank: "C",
    mainArea: "AWS / Terraform",
    interviewAchievement: "1",
    deliveryAvailability: "0",
    lineAvailability: "1",
  },
  {
    id: "4",
    name: "ネクストウェア株式会社",
    representative: "中村 あゆみ",
    email: "sales@nextware.example.com",
    companyEmail: "nakamura@nextware.example.com",
    salesName: "松本 健",
    rank: "A",
    mainArea: "Python / Django",
    interviewAchievement: "0",
    deliveryAvailability: "0",
    lineAvailability: "1",
  },
];
