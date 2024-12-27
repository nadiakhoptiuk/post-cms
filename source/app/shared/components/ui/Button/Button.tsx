import { Button as MButton } from "@mantine/core";
import { TButton } from "./Button.types";

export const Button = ({ children, type, loading, ...rest }: TButton) => {
  return (
    <MButton type={type} loading={loading} {...rest}>
      {children}
    </MButton>
  );
};
