import mockSalesSummary from "@/components/member/SalesSummary.mock";

const useMemberSummary = (id: string) => {
  const memberSummary =
    mockSalesSummary.find((member) => member.id === id) ?? null;
  return { memberSummary };
};

export default useMemberSummary;
