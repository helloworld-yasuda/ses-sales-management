import { MenuItem, Select, SelectProps } from "@mui/material";

type SelectBoxComponentProps = SelectProps & {
  options: { label: string; value: string }[];
  placeholder?: string;
};

export const SelectBoxComponent = ({
  options,
  placeholder,
  ...props
}: SelectBoxComponentProps) => {
  return (
    <Select
      {...props}
      displayEmpty={!!placeholder}
      renderValue={(selected) => {
        if (selected == null || selected === "") {
          return placeholder ? (
            <span style={{ color: "#808080" }}>{placeholder}</span>
          ) : (
            ""
          );
        }
        if (typeof selected !== "string") return "";
        return options.find((option) => option.value === selected)?.label ?? "";
      }}
      sx={{
        minWidth: "120px",
        padding: "12px 16px",
        height: "42px",
        width: "100%",
        "& .MuiSelect-select": {
          p: 0,
        },
      }}
    >
      {options.map((option) => (
        <MenuItem
          key={option.value}
          value={option.value}
          sx={{
            "&:hover": {
              backgroundColor: "#EFF6FF",
              color: "#2563EB",
            },
          }}
        >
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectBoxComponent;
