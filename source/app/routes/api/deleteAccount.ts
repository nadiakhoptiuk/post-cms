import { authGate, deleteUserAccount } from "~/shared/.server/services/auth";

import { NavigationLink } from "~/shared/constants/navigation";
import type { Route } from "../../+types/root";
import type { TSerializedUser } from "~/shared/types/react";
import { ROLE_ADMIN, ROLE_USER } from "~/shared/constants/common";

export async function action({ request }: Route.ActionArgs) {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      isAuthRoute: false,
      allowedRoles: [ROLE_ADMIN, ROLE_USER],
    },
    async (sessionUser: TSerializedUser) => {
      return await deleteUserAccount(request, sessionUser, {
        successRedirect: NavigationLink.HOME,
      });
    }
  );
}
