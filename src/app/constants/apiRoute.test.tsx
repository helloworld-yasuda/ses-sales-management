import { describe, expect, it } from "vitest";
import { API_BASE_URL, API_ROUTE } from "./apiRoute";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

describe("API_ROUTE", () => {
  it("取引先と要員のAPIパスを返す", () => {
    expect(API_ROUTE.clients).toBe("/api/clients");
    expect(API_ROUTE.members).toBe("/api/members");
  });

  it("ベースURLは環境変数を使う", () => {
    expect(API_BASE_URL).toBe(baseUrl);
  });

  it("ホストと結合すると完全なURLになる", () => {
    expect(`${API_BASE_URL}${API_ROUTE.clients}`).toBe(
      `${baseUrl}${API_ROUTE.clients}`,
    );
    expect(`${API_BASE_URL}${API_ROUTE.members}`).toBe(
      `${baseUrl}${API_ROUTE.members}`,
    );
  });
});
