import Link from "@mui/material/Link";
import NextLink from "next/link";
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
      component={NextLink}
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
