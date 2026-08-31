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
    initial: "E.T",
    age: "22",
    mainskills: "React / Next.js",
    experience: "実務3年9ヶ月",
    nearestStation: "新宿駅",
    unitPrice: "600000",
    affiliation: "弊社正社員",
    avaiableAreas:
      "・React / Next.jsを用いたWebアプリケーション開発\n・toC向けWebサービス開発\n・toB向けシステム開発",
    features:
      "・React/Next.jsを用いた大規模Webフロントエンド構築\n・Tailwind CSS, Vanilla ExtractなどのモダンCSSツール選定とスタイル設計\n・UIコンポーネントライブラリ（Storybook）の運用・展開",
    startDate: "7月~",
    frontendSkills: " React, Next.js, Storybook,Node.js",
    backendSkills: " Node.js, Express, MongoDB, PostgreSQL",
    databaseSkills: " MongoDB, PostgreSQL",
    aiSkills: " OpenAI, Anthropic, Google Gemini",
    desiredConditions: "・通勤一時間\n・フルリモート\n・React/Next.js案件",
    parallelStatus: "提案のみ",
    availableDate: "柔軟に調整可能",
  },
  {
    id: "2",
    initial: "Y.S",
    age: "20",
    mainskills: "React / Next.js",
    frontendSkills: " React, Next.js, Storybook,Node.js",
    backendSkills: " Node.js, Express, MongoDB, PostgreSQL",
    databaseSkills: " PostgreSQL",
    aiSkills: " ChatGPT, Cursor, Claude",
    experience: "実務1年3ヶ月",
    nearestStation: "新宿駅",
    unitPrice: "600000",
    affiliation: "弊社正社員",
    avaiableAreas:
      "・React / Next.jsを用いたWebアプリケーション開発\n・React Nativeを用いたモバイルアプリ開発\n・React Nativeを用いたモバイルアプリ開発",
    features:
      "・React/Next.jsを用いた大規模Webフロントエンド構築\n・Tailwind CSS, Vanilla ExtractなどのモダンCSSツール選定とスタイル設計\n・UIコンポーネントライブラリ（Storybook）の運用・展開",
    startDate: "7月~",
    desiredConditions: "・通勤一時間\n・フルリモート\n・React/Next.js案件",
    parallelStatus: "提案のみ",
    availableDate: "柔軽に調整可能",
  },
];

export default mockSalesSummary;
