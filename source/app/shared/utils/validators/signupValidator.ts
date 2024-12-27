import { withZod } from "@rvf/zod";
import { TFunction } from "i18next";
import { z } from "zod";

export const signupValidator = (t: TFunction) =>
  withZod(
    z.object({
      firstName: z
        .string()
        .trim()
        .min(1, t("stringErrorMin"))
        .max(30, t("stringErrorMax")),
      lastName: z
        .string()
        .trim()
        .min(1, t("stringErrorMin"))
        .max(30, t("stringErrorMax")),
      email: z.string().trim().min(1).email(t("emailError")),
      password: z
        .string()
        .trim()
        .min(8, t("passwordErrorMin"))
        .max(12, t("passwordErrorMax")),
    })
  );
