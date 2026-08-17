import { mockCompanyDetails } from "@/components/company/CompanyDetail.mock";
import { useRouter } from "next/navigation";

const useCompanyDetail = (id: string) => {
  const router = useRouter();

  // TODO: API 接続時に id で取得する
  const company = mockCompanyDetails.find((item) => item.id === id) ?? null;
  if (!company) {
    throw new Error("Company not found");
  }

  const handleEdit = () => {
    router.push(`/company/${id}/edit`);
  };

  type Field = {
    label: string;
    value: boolean | string;
  };

  const fields: Field[] = [
    { label: "会社名", value: company.name },
    { label: "企業担当者", value: company.representative },
    { label: "営業共通メールアドレス", value: company.email },
    { label: "企業担当者メールアドレス", value: company.companyEmail },
    { label: "営業担当", value: company.salesName },
    { label: "ランク", value: company.rank },
    { label: "主要領域", value: company.mainArea },
    {
      label: "面談実績",
      value: company.interviewAchievement ? "あり" : "なし",
    },
    {
      label: "配信の有無",
      value: company.deliveryAvailability ? "あり" : "なし",
    },
    {
      label: "Lineの有無",
      value: company.lineAvailability ? "あり" : "なし",
    },
  ];

  return { company, fields, handleEdit };
};

export default useCompanyDetail;
