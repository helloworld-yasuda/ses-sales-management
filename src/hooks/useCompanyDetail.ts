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
    value: string | undefined;
  };

  const availabilityLabel = (value: string) => {
    if (value === "0") return "有";
    if (value === "1") return "無";
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
      value: availabilityLabel(company.interviewAchievement),
    },
    {
      label: "配信の有無",
      value: availabilityLabel(company.deliveryAvailability),
    },
    {
      label: "Lineの有無",
      value: availabilityLabel(company.lineAvailability),
    },
  ];

  return { company, fields, handleEdit };
};

export default useCompanyDetail;
