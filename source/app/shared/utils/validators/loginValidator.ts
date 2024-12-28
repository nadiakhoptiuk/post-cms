import { withZod } from "@rvf/zod";
import { z } from "zod";

import { TErrorsMessages } from "~/shared/types/remix";

export const loginValidator = (errorMessages: TErrorsMessages) =>
  withZod(
    z.object({
      email: z.string().trim().min(1).email(errorMessages.emailError),
      password: z
        .string()
        .trim()
        .min(8, errorMessages.passwordErrorMin)
        .max(12, errorMessages.passwordErrorMax),
    })
  );
