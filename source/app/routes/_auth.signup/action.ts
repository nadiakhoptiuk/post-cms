import { ActionFunctionArgs } from "@remix-run/node";

import { loginUser } from "~/shared/.server/services/auth";

import { NavigationLink } from "~/shared/constants/navigation";

export async function action({ request }: ActionFunctionArgs) {
  await loginUser(request, "user-signup", {
    successRedirect: NavigationLink.HOME,
  });
}
