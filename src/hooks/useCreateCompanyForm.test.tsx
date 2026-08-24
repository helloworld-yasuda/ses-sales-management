import { beforeEach, describe, expect, it, vi } from "vitest";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    replace: vi.fn(),
  }),
}));

describe("useCreateCompanyForm", () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  it("");

  it("送信失敗時にエラーメッセージが表示される", async () => {
    const onCreateCompany = vi.fn();
    vi.spyOn(onCreateCompany, "mockRejectedValue").mockRejectedValue(
      new Error("会社登録に失敗しました"),
    );
    expect(onCreateCompany).toHaveBeenCalledWith({ data: "test" });
  });
});
