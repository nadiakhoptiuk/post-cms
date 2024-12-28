import { Link } from "@remix-run/react";

import { TStyledLink } from "./StyledLink.types";

import s from "./StyledLink.module.css";

export const StyledLink = ({ children, variant, ...rest }: TStyledLink) => {
  return (
    <Link
      className={variant === "accent" ? s.accentLink : s.unstyledLink}
      {...rest}
    >
      {children}
    </Link>
  );
};
