import { mockCompanyDetails } from "@/components/management/CompanyDetail.mock";
import { useRouter } from "next/navigation";

const toAvailabilityLabel = (value: boolean) => (value ? "あり" : "なし");

const useManagementDetail = (id: string) => {
  const router = useRouter();

  // TODO: API 接続時に id で取得する
  const company = mockCompanyDetails.find((item) => item.id === id) ?? null;
  if (!company) {
    throw new Error("Company not found");
  }

  const handleEdit = () => {
    router.push(`/management/${id}/edit`);
  };

  const fields = [
    { label: "会社名", value: company.name },
    { label: "企業担当者", value: company.representative },
    { label: "営業共通メールアドレス", value: company.email },
    { label: "企業担当者メールアドレス", value: company.companyEmail },
    { label: "営業担当", value: company.salesName },
    { label: "ランク", value: company.rank },
    { label: "主要領域", value: company.mainArea },
    {
      label: "面談実績",
      value: toAvailabilityLabel(company.interviewAchievement),
    },
    {
      label: "配信の有無",
      value: toAvailabilityLabel(company.deliveryAvailability),
    },
    {
      label: "Lineの有無",
      value: toAvailabilityLabel(company.lineAvailability),
    },
  ];

  return { company, fields, handleEdit };
};

export default useManagementDetail;
