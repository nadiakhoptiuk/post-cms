import { Link } from "react-router";

import type { TStyledLink } from "./StyledLink.types";

import s from "./StyledLink.module.css";

export const StyledLink = ({
  children,
  variant = "unstyled",
  fill = "outline",
  ...rest
}: TStyledLink) => {
  return (
    <Link
      className={
        variant === "accent" && fill === "outline"
          ? s.accentOutlinedLink
          : variant === "accent" && fill === "filled"
          ? s.accentFilledLink
          : variant === "unstyled" && fill === "outline"
          ? s.unstyledOutlinedLink
          : s.unstyledFilledLink
      }
      {...rest}
    >
      {children}
    </Link>
  );
};
