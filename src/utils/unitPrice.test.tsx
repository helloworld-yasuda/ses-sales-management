import { describe, expect, it } from "vitest";
import { formatUnitPrice } from "./unitPrice";

describe("formatUnitPrice", () => {
  it("valueをラベルに変換する", () => {
    expect(formatUnitPrice("500000")).toBe("50万円");
    expect(formatUnitPrice("600000")).toBe("60万円");
  });

  it("未知の値はそのまま返す", () => {
    expect(formatUnitPrice("相談可")).toBe("相談可");
  });
});
