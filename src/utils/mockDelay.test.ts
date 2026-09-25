import { describe, expect, it, vi } from "vitest";
import { MOCK_DELAY_MS, mockDelay } from "./mockDelay";

describe("mockDelay", () => {
  it("指定時間後に解決する", async () => {
    const timeoutSpy = vi.spyOn(globalThis, "setTimeout");

    try {
      const promise = mockDelay();
      const timeoutFn = timeoutSpy.mock.calls[0]?.[0];
      const timeoutMs = timeoutSpy.mock.calls[0]?.[1];

      expect(timeoutMs).toBe(MOCK_DELAY_MS);
      expect(typeof timeoutFn).toBe("function");
      if (typeof timeoutFn === "function") {
        timeoutFn();
      }

      await expect(promise).resolves.toBeUndefined();
    } finally {
      timeoutSpy.mockRestore();
    }
  });
});
