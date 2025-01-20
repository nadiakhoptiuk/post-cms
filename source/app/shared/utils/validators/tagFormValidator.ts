import { withZod } from "@rvf/zod";
import { z } from "zod";

import type { TErrorsMessages } from "~/shared/types/react";

const tagRegex = /^[a-z0-9]+(?:_[a-z0-9]+)*$/;

export const tagValidator = (errors: TErrorsMessages) =>
  withZod(
    z.object({
      name: z
        .string()
        .min(2, `${errors.stringErrorMin} 2`)
        .regex(tagRegex, errors.invalidTagRegex)
        .max(50, `${errors.stringErrorMax} 50`),
    })
  );
