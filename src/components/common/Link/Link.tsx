import Link from "@mui/material/Link";
import { LinkProps } from "@mui/material/Link";

type LinkComponentProps = LinkProps & {
  href: string;
};

export const LinkComponent = ({
  underline = "none",
  ...props
}: LinkComponentProps) => {
  return (
    <Link
      underline={underline}
      sx={[
        {
          "&:visited": {
            color: "#7C3AED",
          },
        },
      ]}
      {...props}
    />
  );
};

export default LinkComponent;
