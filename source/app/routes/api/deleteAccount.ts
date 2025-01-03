import { deleteUserAccount } from "~/shared/.server/services/auth";

import { NavigationLink } from "~/shared/constants/navigation";
import type { Route } from "../../+types/root";

export async function action({ request }: Route.ActionArgs) {
  return await deleteUserAccount(request, {
    successRedirect: NavigationLink.HOME,
  });
}
