import { withZod } from "@rvf/zod";
import { z } from "zod";

import type { TErrorsMessages } from "~/shared/types/react";

export const complainAboutPostValidator = (errors: TErrorsMessages) =>
  withZod(
    z.object({
      complaintReason: z
        .string()
        .trim()
        .min(1, errors.stringErrorRequired)
        .max(50, `${errors.passwordErrorMax} 50`),
    })
  );
