import { ActionFunctionArgs } from "@remix-run/node";

import { signupUser } from "~/shared/.server/services/auth";

export async function action({ request }: ActionFunctionArgs) {
  return await signupUser(request);
}
