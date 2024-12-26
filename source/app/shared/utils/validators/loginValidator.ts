import { withZod } from "@rvf/zod";
import { z } from "zod";

export const loginValidator = withZod(
  z.object({
    email: z.string().trim().min(1).email("Must be a valid email"),
    password: z.string().trim().min(8, "Enter at least 8 symbols").max(12),
  })
);
