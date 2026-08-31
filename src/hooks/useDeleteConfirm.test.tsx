import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockDelay } from "@/utils/mockDelay";
import { useDeleteConfirm } from "./useDeleteConfirm";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

vi.mock("@/utils/mockDelay", () => ({
  mockDelay: vi.fn(() => Promise.resolve()),
}));

describe("useDeleteConfirm", () => {
  beforeEach(() => {
    pushMock.mockClear();
    vi.mocked(mockDelay).mockReset();
    vi.mocked(mockDelay).mockResolvedValue(undefined);
  });

  it("openModalでモーダルが開く", () => {
    const { result } = renderHook(() =>
      useDeleteConfirm({
        mutationKey: "mock://test/delete",
        redirectPath: "/member",
      }),
    );

    expect(result.current.isModalOpen).toBe(false);
    act(() => {
      result.current.openModal();
    });
    expect(result.current.isModalOpen).toBe(true);
  });

  it("closeModalでモーダルが閉じる", () => {
    const { result } = renderHook(() =>
      useDeleteConfirm({
        mutationKey: "mock://test/delete",
        redirectPath: "/member",
      }),
    );

    act(() => {
      result.current.openModal();
    });
    act(() => {
      result.current.closeModal();
    });
    expect(result.current.isModalOpen).toBe(false);
  });

  it("確定後に指定パスへ遷移する", async () => {
    const { result } = renderHook(() =>
      useDeleteConfirm({
        mutationKey: "mock://test/delete",
        redirectPath: "/company",
      }),
    );

    await act(async () => {
      await result.current.handleConfirm();
    });

    expect(result.current.isModalOpen).toBe(false);
    expect(pushMock).toHaveBeenCalledWith("/company");
  });

  it("確定中はisLoadingがtrueになる", async () => {
    let resolveDelay: () => void = () => {};
    vi.mocked(mockDelay).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveDelay = resolve;
        }),
    );

    const { result } = renderHook(() =>
      useDeleteConfirm({
        mutationKey: "mock://test/delete",
        redirectPath: "/member",
      }),
    );
    let pending: Promise<void> = Promise.resolve();

    act(() => {
      pending = result.current.handleConfirm();
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(true);
    });

    await act(async () => {
      resolveDelay();
      await pending;
    });

    expect(result.current.isLoading).toBe(false);
    expect(pushMock).toHaveBeenCalledWith("/member");
  });
});
