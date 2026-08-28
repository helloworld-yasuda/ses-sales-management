import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockMemberDetails } from "@/components/member/MemberDetail.mock";
import useEditMemberForm from "./useEditMemberForm";

const paramsMock = vi.fn(() => ({ id: "1" }));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
  useParams: () => paramsMock(),
}));

const validFormValues = {
  memberName: "山田 太郎",
  nameKana: "ヤマダ タロウ",
  affiliation: "自社社員 (SES第1事業部)",
  nearestStation: "新宿駅",
  upperCompany: "ABC商事株式会社",
  paymentTerms: "月末締め翌月末払い",
  renewal: "3ヶ月",
  experienceYears: "8年 (フロントエンド中心)",
  unitPrice: "400000",
  skills: "0",
  skills2: "0",
  skillSheet: "/images/member/1_skill_sheet.pdf",
  remarks:
    "フロントエンド開発を軸としつつ、Terraformを利用したインフラ構成管理やAWS構築の実務経験もあり。リーダーシップ経験もあり、将来のPM候補として期待できる人材。",
  availability: "1",
};

describe("useEditMemberForm", () => {
  beforeEach(() => {
    paramsMock.mockReturnValue({ id: "1" });
  });

  it("会社情報をフォームの初期値にする", () => {
    const { result } = renderHook(() => useEditMemberForm());
    const member = mockMemberDetails[0];

    expect(result.current.control._defaultValues).toEqual({
      memberName: member.name,
      nameKana: member.nameKana,
      affiliation: member.affiliation,
      nearestStation: member.nearestStation,
      upperCompany: member.upperCompany,
      paymentTerms: member.paymentTerms,
      renewal: member.renewal,
      experienceYears: member.experienceYears,
      unitPrice: member.unitPrice,
      skills: member.skills,
      skills2: member.skills2,
      skillSheet: member.skillSheet,
      remarks: member.remarks,
      availability: member.availability,
    });
  });

  it("onSubmitでonEditMemberが呼ばれる", async () => {
    const onEditMember = vi.fn();
    const { result } = renderHook(() => useEditMemberForm({ onEditMember }));

    await act(async () => {
      await result.current.onSubmit(validFormValues);
    });

    expect(onEditMember).toHaveBeenCalledWith(validFormValues);
    expect(result.current.submitError).toBeNull();
  });

  it("送信失敗時にsubmitErrorをセットする", async () => {
    const onEditMember = vi
      .fn()
      .mockRejectedValue(new Error("会社情報の更新に失敗しました"));
    const { result } = renderHook(() => useEditMemberForm({ onEditMember }));

    await act(async () => {
      await result.current.onSubmit(validFormValues);
    });

    expect(result.current.submitError).toBe("会社情報の更新に失敗しました");
  });

  it("存在しないIDの場合はエラーを投げる", () => {
    paramsMock.mockReturnValue({ id: "999" });

    expect(() => renderHook(() => useEditMemberForm())).toThrow(
      "Member not found",
    );
  });
});
