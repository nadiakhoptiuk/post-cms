import { useId } from "react";
import { useField } from "@rvf/remix";
import { TextInput as MTextInput } from "@mantine/core";

import "@mantine/core/styles/Input.css";

import { TTextInput } from "~/shared/types/remix";

export const TextInput = ({ label, scope, placeholder }: TTextInput) => {
  const field = useField(scope);
  const inputId = useId();
  const errorId = useId();

  return (
    <MTextInput
      label={label}
      placeholder={placeholder}
      {...field.getInputProps({
        id: inputId,
        "aria-describedby": errorId,
        "aria-invalid": !!field.error(),
      })}
      error={field.error()}
      size="md"
      styles={{
        label: { fontWeight: "bold" },
        wrapper: { marginBottom: 20 },
        root: { position: "relative", flexGrow: 1 },
        error: { position: "absolute", bottom: -17 },
      }}
    />
  );
};
