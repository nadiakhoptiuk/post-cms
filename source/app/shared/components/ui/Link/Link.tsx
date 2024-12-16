import { Button } from "@mantine/core";
import { Link } from "@remix-run/react";

export const StylizedLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => {
  return (
    <Button component={Link} to={to}>
      {children}
    </Button>
  );
};
