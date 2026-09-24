type SelectBoxOptions = {
  label: string;
  value: string;
};

export const UNIT_PRICE_MIN_MAN_YEN = 40;
export const UNIT_PRICE_MAX_MAN_YEN = 120;
export const YEN_PER_MAN = 10000;


export const SkillsOptions: SelectBoxOptions[] = [
  { label: "React", value: "0" },
  { label: "TypeScript", value: "1" },
  { label: "Node.js", value: "2" },
  { label: "Spring Boot", value: "4" },
  { label: "Docker", value: "5" },
  { label: "Kubernetes", value: "6" },
  { label: "Terraform", value: "7" },
  { label: "Ansible", value: "8" },
  { label: "Chef", value: "9" },
  { label: "AWS", value: "10" },
];

export const SkillsOptions2: SelectBoxOptions[] = [
  { label: "Java", value: "0" },
  { label: "Docker", value: "1" },
  { label: "Kubernetes", value: "2" },
  { label: "Terraform", value: "3" },
  { label: "Ansible", value: "4" },
  { label: "Chef", value: "5" },
  { label: "Spring Boot", value: "6" },
];

export const StatusOptions: SelectBoxOptions[] = [
  { label: "即可能", value: "0" },
  { label: "稼働中", value: "1" },
  { label: "休職中", value: "2" },
];

export const UnitPriceOptions: SelectBoxOptions[] = Array.from(
  { length: UNIT_PRICE_MAX_MAN_YEN - UNIT_PRICE_MIN_MAN_YEN + 1 },
  (_, index) => {
    const priceManYen = UNIT_PRICE_MIN_MAN_YEN + index;
    return {
      label: `${priceManYen}万円`,
      value: String(priceManYen * YEN_PER_MAN),
    };
  },
);
