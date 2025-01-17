import { Button as MButton } from "@mantine/core";
import type { TButton } from "./Button.types";

export const Button = ({
  children,
  type = "button",
  loading,
  ...rest
}: TButton) => {
  return (
    <MButton
      type={type}
      loading={loading}
      loaderProps={{ type: "dots" }}
      size="md"
      {...rest}
    >
      {children}
    </MButton>
  );
};
