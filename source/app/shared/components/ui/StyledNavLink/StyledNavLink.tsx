import { NavLink } from "react-router";
import { Badge, Button, type ButtonProps } from "@mantine/core";

import type { TStyledNavLink } from "./StyledNavLink.types";

export const StyledNavLink = ({
  to,
  children,
  withCount = false,
  count = 0,
  ...rest
}: TStyledNavLink & ButtonProps) => {
  return (
    <Button
      p="xs"
      component={NavLink}
      end
      to={to}
      h="100%"
      variant="subtle"
      rightSection={
        withCount &&
        count > 0 && (
          <Badge size="md" circle ml="auto">
            {count}
          </Badge>
        )
      }
      {...rest}
    >
      {children}
    </Button>
  );
};
