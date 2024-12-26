import { Button as MButton } from "@mantine/core";
import { TButton } from "./Button.types";

export const Button = ({ children, type }: TButton) => {
  return (
    <MButton
      type={type}
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
