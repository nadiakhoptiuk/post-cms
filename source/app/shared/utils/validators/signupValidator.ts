import { withZod } from "@rvf/zod";
import { z } from "zod";

import type { TErrorsMessages } from "~/shared/types/react";

export const signupValidator = (errorMessages: TErrorsMessages) =>
  withZod(
    z.object({
      firstName: z
        .string()
        .trim()
        .min(1, errorMessages.stringErrorRequired)
        .max(30, `${errorMessages.passwordErrorMax} 30`),
      lastName: z
        .string()
        .trim()
        .min(1, errorMessages.stringErrorRequired)
        .max(30, `${errorMessages.passwordErrorMax} 30`),
      email: z.string().trim().min(1).email(errorMessages.emailError),
      password: z
        .string()
        .trim()
        .min(8, `${errorMessages.stringErrorMin} 8`)
        .max(12, `${errorMessages.stringErrorMax} 12`),
    })
  );
