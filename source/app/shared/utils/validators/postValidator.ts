import { withZod } from "@rvf/zod";
import { z } from "zod";

import type { TErrorsMessages } from "~/shared/types/react";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const postValidator = (errors: TErrorsMessages) =>
  withZod(
    z.object({
      title: z
        .string()
        .trim()
        .min(3, `${errors.stringErrorMin} 3`)
        .max(150, `${errors.stringErrorMax} 150`),
      slug: z
        .string()
        .trim()
        .min(3, `${errors.stringErrorMin} 3`)
        .regex(slugRegex, errors.invalidRegex)
        .max(1000, `${errors.stringErrorMax} 1000`),
      content: z
        .string()
        .trim()
        .min(1, errors.stringErrorRequired)
        .max(3000, `${errors.stringErrorMax} 3000`),
    })
  );