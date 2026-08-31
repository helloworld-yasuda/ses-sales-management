export const unitPriceOptions = [
  { label: "40万円", value: "400000" },
  { label: "50万円", value: "500000" },
  { label: "60万円", value: "600000" },
  { label: "70万円", value: "700000" },
  { label: "80万円", value: "800000" },
];

export const formatUnitPrice = (value: string): string =>
  unitPriceOptions.find((option) => option.value === value)?.label ?? value;
