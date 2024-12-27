import { withZod } from "@rvf/zod";
import { TFunction } from "i18next";
import { z } from "zod";

export const loginValidator = (t: TFunction) =>
  withZod(
    z.object({
      email: z.string().trim().min(1).email(t("emailError")),
      password: z
        .string()
        .trim()
        .min(8, t("passwordErrorMin"))
        .max(12, t("passwordErrorMax")),
    })
  );
