import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import useMemberDetail from "./useMemberDetail";
import { mockMemberDetails } from "@/components/member/MemberDetail.mock";

const pushMock = vi.fn();

describe("useMemberDetail", () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  it("指定したIDの会員情報とfieldsを返す", () => {
    const { result } = renderHook(() => useMemberDetail("1"));
    const member = mockMemberDetails[0];

    expect(result.current.member).toEqual(member);
    expect(result.current.profileFields).toContainEqual({
      label: "所属会社 / 属性",
      value: member.affiliation,
    });
    expect(result.current.profileFields).toContainEqual({
      label: "最寄駅",
      value: member.nearestStation,
    });
    expect(result.current.profileFields).toContainEqual({
      label: "上位会社",
      value: member.upperCompany,
    });
  });

  it("存在しないIDを指定した場合、エラーが発生する", () => {
    expect(() => renderHook(() => useMemberDetail("999"))).toThrow(
      "Member not found",
    );
  });
});
