import { useField } from "@rvf/react-router";
import { useId } from "react";
import { Box, Button, Tooltip } from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";
import { TextInput as MTextInput } from "@mantine/core";

import { generateSlug } from "~/shared/utils/generateSlug";

import type { TSlugInput } from "./SlugInput.types";

export const SlugInput = ({
  label,
  scope,
  placeholder,
  aria,
  title,
  locale,
}: TSlugInput) => {
  const field = useField(scope);
  const inputId = useId();
  const errorId = useId();

  return (
    <Box
      style={{
        display: "flex",
        alignItems: "end",
        columnGap: 20,
        flexGrow: 1,
      }}
    >
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
          wrapper: { marginBottom: 10 },
          root: { position: "relative", flexGrow: 1 },
          error: { position: "absolute", bottom: -10 },
        }}
        rightSection={
          <Tooltip label={aria}>
            <Button
              onClick={() => {
                field.setValue(generateSlug(title, locale));
                field.validate();
              }}
              aria-label={aria}
              variant="transparent"
              p={6}
            >
              <IconRefresh size={22} />
            </Button>
          </Tooltip>
        }
      />
    </Box>
  );
};
