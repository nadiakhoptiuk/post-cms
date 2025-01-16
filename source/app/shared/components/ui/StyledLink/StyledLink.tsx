import { Link } from "react-router";

import type { TStyledLink } from "./StyledLink.types";

import { Button, type ButtonProps } from "@mantine/core";

export const StyledLink = ({
  children,
  to,
  ...rest
}: TStyledLink & ButtonProps) => {
  return (
    <Button p="xs" component={Link} to={to} h="100%" size="sm" {...rest}>
      {children}
    </Button>
  );
};
