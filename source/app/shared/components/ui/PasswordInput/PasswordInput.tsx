import { useId } from "react";
import { useField } from "@rvf/remix";
import { PasswordInput as MPasswordInput } from "@mantine/core";
import "@mantine/core/styles/PasswordInput.css";

import { TextInputProps } from "~/shared/types/remix";

export const PasswordField = ({
  label,
  scope,
  placeholder,
}: TextInputProps) => {
  const field = useField(scope);
  const inputId = useId();
  const errorId = useId();

  return (
    // <div>
    <MPasswordInput
      label={label}
      placeholder={placeholder}
      {...field.getInputProps({
        id: inputId,
        "aria-describedby": errorId,
        "aria-invalid": !!field.error(),
      })}
      size="md"
      error={field.error()}
      styles={{
        wrapper: { marginBottom: 2 },
        input: {
          boxShadow:
            "0 0px 1px hsla(0, 0%, 0%, 0.1), 0 1px 2px hsla(0, 0%, 0%, 0.1)",
        },
      }}
    />
    // </div>
  );
};
