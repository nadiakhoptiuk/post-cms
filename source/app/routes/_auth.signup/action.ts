import { ActionFunctionArgs } from "react-router";

import { signupUser } from "~/shared/.server/services/auth";

export async function action({ request }: ActionFunctionArgs) {
  return await signupUser(request);
}
