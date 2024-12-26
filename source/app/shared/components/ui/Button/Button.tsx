import { Button as MButton } from "@mantine/core";
import { TButton } from "./Button.types";

export const Button = ({ children, type, loading }: TButton) => {
  return (
    <MButton
      type={type}
      loading={loading}
      styles={{
        root: {
          width: type === "submit" ? "100%" : "fit-content",
          marginTop: type === "submit" ? 15 : 0,
        },
      }}
    >
      {children}
    </MButton>
  );
};
