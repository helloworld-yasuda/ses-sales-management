import { TextField, TextFieldProps } from "@mui/material";

export const TextAreaComponent = (props: TextFieldProps) => {
  return <TextField multiline rows={3} {...props} />;
};

export default TextAreaComponent;
