export const MOCK_DELAY_MS = 800;

export const mockDelay = () =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, MOCK_DELAY_MS);
  });
