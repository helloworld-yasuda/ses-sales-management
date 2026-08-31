import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockDelay } from "@/utils/mockDelay";
import { useCreateCompany } from "./useCreateCompany";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

vi.mock("@/utils/mockDelay", () => ({
  mockDelay: vi.fn(() => Promise.resolve()),
}));

describe("useCreateCompany", () => {
  beforeEach(() => {
    pushMock.mockClear();
    vi.mocked(mockDelay).mockReset();
    vi.mocked(mockDelay).mockResolvedValue(undefined);
  });

  it("登録成功後に一覧へ遷移する", async () => {
    const { result } = renderHook(() => useCreateCompany());

    await act(async () => {
      await result.current.handleCreate();
    });

    expect(pushMock).toHaveBeenCalledWith("/company");
  });

  it("登録中はisLoadingがtrueになる", async () => {
    let resolveDelay: () => void = () => {};
    vi.mocked(mockDelay).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveDelay = resolve;
        }),
    );

    const { result } = renderHook(() => useCreateCompany());
    let pending: Promise<void> = Promise.resolve();

    act(() => {
      pending = result.current.handleCreate();
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(true);
    });

    await act(async () => {
      resolveDelay();
      await pending;
    });

    expect(result.current.isLoading).toBe(false);
    expect(pushMock).toHaveBeenCalledWith("/company");
  });
});
