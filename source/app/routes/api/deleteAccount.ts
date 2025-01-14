import { authGate, deleteUserAccount } from "~/shared/.server/services/auth";

import { NavigationLink } from "~/shared/constants/navigation";
import type { Route } from "../../+types/root";
import type { TSerializedUser } from "~/shared/types/react";

export async function action({ request }: Route.ActionArgs) {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      isAuthRoute: false,
      allowedRoles: ["admin", "user"],
    },
    async (sessionUser: TSerializedUser) => {
      return await deleteUserAccount(request, sessionUser, {
        successRedirect: NavigationLink.HOME,
      });
    }
  );
}
