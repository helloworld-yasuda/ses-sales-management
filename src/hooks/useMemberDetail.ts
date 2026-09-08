import { mockMemberDetails } from "@/components/member/MemberDetail.mock";
import useCuluculationMonthlyprice from "./useCaluculationMonthlyprice";

const useMemberDetail = (id: string) => {
  // TODO: API 接続時に id で取得する
  const member = mockMemberDetails.find((item) => item.id === id) ?? null;
  if (!member) {
    throw new Error("Member not found");
  }

  const skills1Labels = (skills1: string) => {
    if (skills1 === "0") return "React";
    if (skills1 === "1") return "TypeScript";
    if (skills1 === "2") return "Node.js";
    if (skills1 === "3") return "Spring Boot";
    if (skills1 === "4") return "Docker";
    if (skills1 === "5") return "Kubernetes";
    if (skills1 === "6") return "Terraform";
    if (skills1 === "7") return "Ansible";
    if (skills1 === "8") return "Chef";
  };

  const skills2Labels = (skills2: string) => {
    if (skills2 === "0") return "Java";
    if (skills2 === "1") return "Docker";
    if (skills2 === "2") return "Kubernetes";
    if (skills2 === "3") return "Terraform";
    if (skills2 === "4") return "Ansible";
    if (skills2 === "5") return "Chef";
    if (skills2 === "6") return "Spring Boot";
  };

  const availabilityLabels = (availability: string) => {
    if (availability === "0") return "即可能";
    if (availability === "1") return "稼働中";
    if (availability === "2") return "案件調整中";
  };

  const profileFields = [
    { label: "所属会社 / 属性", value: member.affiliation },
    { label: "最寄駅", value: member.nearestStation },
    { label: "上位会社", value: member.upperCompany },
    { label: "支払いサイト", value: member.paymentTerms },
    { label: "更新", value: member.renewal },
    { label: "経験年数", value: member.experienceYears },
    {
      label: "提案単価",
      value: useCuluculationMonthlyprice(member.unitPrice) + "万円",
    },
  ];

  const handleDelete = () => {
    // TODO: 削除確認モーダル実装後に差し替え
  };

  return {
    availabilityLabels,
    skills1Labels,
    skills2Labels,
    member,
    profileFields,
    handleDelete,
  };
};

export default useMemberDetail;
