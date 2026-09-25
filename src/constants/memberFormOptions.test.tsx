import { describe, expect, it } from "vitest";
import {
  SkillsOptions,
  SkillsOptions2,
  StatusOptions,
  UNIT_PRICE_MAX_MAN_YEN,
  UNIT_PRICE_MIN_MAN_YEN,
  UnitPriceOptions,
  YEN_PER_MAN,
} from "./memberFormOptions";

describe("memberFormOptions", () => {
  it("提案単価は40万円から120万円まで1万刻み", () => {
    expect(UnitPriceOptions[0]).toEqual({
      label: `${UNIT_PRICE_MIN_MAN_YEN}万円`,
      value: String(UNIT_PRICE_MIN_MAN_YEN * YEN_PER_MAN),
    });
    expect(UnitPriceOptions[UnitPriceOptions.length - 1]).toEqual({
      label: `${UNIT_PRICE_MAX_MAN_YEN}万円`,
      value: String(UNIT_PRICE_MAX_MAN_YEN * YEN_PER_MAN),
    });
    expect(UnitPriceOptions).toHaveLength(
      UNIT_PRICE_MAX_MAN_YEN - UNIT_PRICE_MIN_MAN_YEN + 1,
    );
  });

  it("スキルと稼働ステータスの選択肢がある", () => {
    expect(SkillsOptions[0]).toEqual({ label: "React", value: "0" });
    expect(SkillsOptions2[0]).toEqual({ label: "Java", value: "0" });
    expect(StatusOptions).toEqual([
      { label: "即可能", value: "0" },
      { label: "稼働中", value: "1" },
      { label: "休職中", value: "2" },
    ]);
  });
});
