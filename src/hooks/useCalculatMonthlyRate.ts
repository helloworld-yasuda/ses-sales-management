const MONTHLY_RATE_MULTIPLIER = 10000;

export const calculateMonthlyRate = (offerRate: number) => {
  return offerRate / MONTHLY_RATE_MULTIPLIER;
};
