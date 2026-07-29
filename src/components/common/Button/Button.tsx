import { Button, ButtonProps } from "@mui/material";
import Image from "next/image";

type ButtonComponentProps = ButtonProps & {
  withIcon?: boolean;
};

export const ButtonComponent = ({
  withIcon = false,
  variant = "contained",
  ...props
}: ButtonComponentProps) => {
  return (
    <Button
      variant={variant}
      {...props}
      startIcon={
        withIcon ? (
          <Image src="/addicon.png" alt="" width={16} height={16} />
        ) : undefined
      }
    />
  );
};

export default ButtonComponent;
