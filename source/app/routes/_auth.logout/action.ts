import { ActionFunctionArgs } from "@remix-run/node";

import { logoutUser } from "~/shared/.server/services/auth";

import { NavigationLink } from "~/shared/constants/navigation";

export async function action({ request }: ActionFunctionArgs) {
  return await logoutUser(request, {
    successRedirect: NavigationLink.HOME,
  });
}
