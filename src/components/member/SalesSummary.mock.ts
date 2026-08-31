export type SalesSummary = {
  id: string;
  initial: string;
  age: string;
  mainskills: string;
  experience: string;
  nearestStation: string;
  unitPrice: string;
  affiliation: string;
  avaiableAreas: string;
  features: string;
  startDate: string;
  frontendSkills: string;
  backendSkills: string;
  databaseSkills: string;
  aiSkills: string;
  desiredConditions: string;
  parallelStatus: string;
  availableDate: string;
};

export const mockSalesSummary: SalesSummary[] = [
  {
    id: "1",
    initial: "T.Y",
    age: "28",
    mainskills: "Spring Boot / Java / PostgreSQL",
    experience: "実務5年",
    nearestStation: "東京駅",
    unitPrice: "70万円 (相談可)",
    affiliation: "弊社正社員",
    avaiableAreas:
      "・Java / Spring Bootを用いたWebアプリケーション開発\n・toB向け基幹システム開発",
    features:
      "・Spring Bootを用いたAPI設計・実装\n・PostgreSQLを用いたデータモデリング",
    startDate: "7月~",
    frontendSkills: "",
    backendSkills: " Java, Spring Boot",
    databaseSkills: " PostgreSQL",
    aiSkills: " ChatGPT, Cursor",
    desiredConditions: "・通勤一時間\n・フルリモート",
    parallelStatus: "待機中",
    availableDate: "柔軟に調整可能",
  },
  {
    id: "2",
    initial: "H.S",
    age: "26",
    mainskills: "TypeScript / React",
    experience: "実務3年6ヶ月",
    nearestStation: "渋谷駅",
    unitPrice: "55万円 (相談可)",
    affiliation: "弊社正社員",
    avaiableAreas:
      "・React / TypeScriptを用いたWebアプリケーション開発\n・toC向けWebサービス開発",
    features:
      "・Reactを用いたフロントエンド構築\n・TypeScriptによる型安全な実装",
    startDate: "7月~",
    frontendSkills: " React, TypeScript",
    backendSkills: " Node.js",
    databaseSkills: " PostgreSQL",
    aiSkills: " ChatGPT, Cursor",
    desiredConditions: "・通勤一時間\n・フルリモート",
    parallelStatus: "稼働中",
    availableDate: "柔軟に調整可能",
  },
  {
    id: "3",
    initial: "I.S",
    age: "32",
    mainskills: "Java / Docker / AWS",
    experience: "実務8年",
    nearestStation: "品川駅",
    unitPrice: "90万円 (相談可)",
    affiliation: "弊社正社員",
    avaiableAreas:
      "・Javaを用いたWebアプリケーション開発\n・AWSを用いたインフラ構築",
    features: "・Javaによるバックエンド設計\n・Docker / AWSを用いた環境構築",
    startDate: "7月~",
    frontendSkills: "",
    backendSkills: " Java",
    databaseSkills: " PostgreSQL",
    aiSkills: " ChatGPT, Cursor",
    desiredConditions: "・通勤一時間\n・フルリモート",
    parallelStatus: "提案中",
    availableDate: "柔軟に調整可能",
  },
  {
    id: "4",
    initial: "N.W",
    age: "35",
    mainskills: "React / Go",
    experience: "実務12年",
    nearestStation: "新宿駅",
    unitPrice: "110万円 (相談可)",
    affiliation: "弊社正社員",
    avaiableAreas:
      "・Reactを用いたWebアプリケーション開発\n・Goを用いたAPI開発",
    features:
      "・Reactを用いた大規模フロントエンド構築\n・Goによる高性能API実装",
    startDate: "7月~",
    frontendSkills: " React, TypeScript",
    backendSkills: " Go",
    databaseSkills: " PostgreSQL",
    aiSkills: " ChatGPT, Claude",
    desiredConditions: "・通勤一時間\n・フルリモート",
    parallelStatus: "稼働中",
    availableDate: "柔軟に調整可能",
  },
  {
    id: "5",
    initial: "M.T",
    age: "27",
    mainskills: "Nuxt.js / Vue.js",
    experience: "実務4年",
    nearestStation: "池袋駅",
    unitPrice: "60万円 (相談可)",
    affiliation: "弊社正社員",
    avaiableAreas:
      "・Vue.js / Nuxt.jsを用いたWebアプリケーション開発\n・toC向けWebサービス開発",
    features: "・Nuxt.jsを用いたフロントエンド構築\n・Vue.jsコンポーネント設計",
    startDate: "7月~",
    frontendSkills: " Vue.js, Nuxt.js",
    backendSkills: " Node.js",
    databaseSkills: " MySQL",
    aiSkills: " ChatGPT, Cursor",
    desiredConditions: "・通勤一時間\n・フルリモート",
    parallelStatus: "面談中",
    availableDate: "柔軟に調整可能",
  },
  {
    id: "6",
    initial: "K.I",
    age: "30",
    mainskills: "Flutter / Kotlin",
    experience: "実務6年6ヶ月",
    nearestStation: "横浜駅",
    unitPrice: "75万円 (相談可)",
    affiliation: "弊社正社員",
    avaiableAreas:
      "・Flutterを用いたモバイルアプリ開発\n・Kotlinを用いたAndroid開発",
    features:
      "・Flutterによるクロスプラットフォーム開発\n・KotlinによるAndroid実装",
    startDate: "7月~",
    frontendSkills: " Flutter",
    backendSkills: " Kotlin",
    databaseSkills: " Firebase",
    aiSkills: " ChatGPT, Cursor",
    desiredConditions: "・通勤一時間\n・フルリモート",
    parallelStatus: "待機中",
    availableDate: "柔軟に調整可能",
  },
];

export default mockSalesSummary;
