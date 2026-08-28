import Link from "next/link";
import { LinkProps } from "@mui/material/Link";

type LinkComponentProps = LinkProps & {
  href: string;
};

export const LinkComponent = ({ href, ...props }: LinkComponentProps) => {
  return (
    <Link
      href={href}
      style={{ textDecoration: "none", color: "#2563EB" }}
      {...props}
    />
  );
};

export default LinkComponent;
