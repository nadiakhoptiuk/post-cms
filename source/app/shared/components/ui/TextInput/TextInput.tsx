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
    <div>
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
          wrapper: { marginBottom: 2 },
        }}
      />
    </div>
  );
};
