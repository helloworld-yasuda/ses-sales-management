import { TextField, TextFieldProps } from "@mui/material";

export const TextFieldComponent = (props: TextFieldProps) => {
  return (
    <TextField
      {...props}
      sx={{ "& .MuiInputBase-input": { height: "42px", padding: "0 12px" } }}
    />
  );
};

export default TextFieldComponent;
