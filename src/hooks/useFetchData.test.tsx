import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import useSWR from "swr";
import { API_BASE_URL, API_ROUTE } from "@/app/constants/apiRoute";
import { useFetchData } from "./useFetchData";

vi.mock("swr", () => ({
  default: vi.fn(() => ({
    data: undefined,
    error: undefined,
    isLoading: false,
  })),
}));

describe("useFetchData", () => {
  it("API_BASE_URLとpathを結合してSWRに渡す", () => {
    renderHook(() => useFetchData(API_ROUTE.clients));

    expect(vi.mocked(useSWR)).toHaveBeenCalledWith(
      `${API_BASE_URL}${API_ROUTE.clients}`,
      expect.any(Function),
    );
  });
});
