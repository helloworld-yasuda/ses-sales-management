import { mockMemberDetails } from "@/components/member/MemberDetail.mock";

const useMemberDetail = (id: string) => {
  // TODO: API 接続時に id で取得する
  const member = mockMemberDetails.find((item) => item.id === id) ?? null;
  if (!member) {
    throw new Error("Member not found");
  }

  const profileFields = [
    { label: "所属会社 / 属性", value: member.affiliation },
    { label: "最寄駅", value: member.nearestStation },
    { label: "上位会社", value: member.upperCompany },
    { label: "支払いサイト", value: member.paymentTerms },
    { label: "更新", value: member.renewal },
    { label: "経験年数", value: member.experienceYears },
    { label: "提案単価", value: member.unitPrice },
  ];

  const handleDelete = () => {
    // TODO: 削除確認モーダル実装後に差し替え
  };

  return {
    member,
    profileFields,
    handleDelete,
  };
};

export default useMemberDetail;
