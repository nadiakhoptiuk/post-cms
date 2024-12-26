import { withZod } from "@rvf/zod";
import { z } from "zod";

export const signupValidator = withZod(
  z.object({
    firstName: z.string().trim().min(1).max(20),
    lastName: z.string().trim().min(1).max(30),
    email: z.string().trim().min(1).email("Must be a valid email"),
    password: z.string().trim().min(8, "Enter at least 8 symbols").max(12),
  })
);
