import { redirect } from "react-router";

import { authGate } from "~/shared/.server/services/auth";
import { getUserDataFromRequest } from "~/shared/.server/utils/usersUtils";
import { updateUserById } from "~/shared/.server/repository/users";

import { ROLE_ADMIN } from "~/shared/constants/common";
import { NavigationLink } from "~/shared/constants/navigation";
import type { TSerializedUser } from "~/shared/types/react";
import type { Route } from "./+types/route";

export async function action({ request, params }: Route.ActionArgs) {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN],
    },
    async (sessionUser: TSerializedUser) => {
      const { firstName, lastName, email, password, role } =
        await getUserDataFromRequest(request);

      await updateUserById(Number(params.userId), {
        firstName,
        lastName,
        email,
        role,
        password,
        updatedById: sessionUser.id,
      });

      return redirect(NavigationLink.DASHBOARD_USERS);
    },
    {
      failureRedirect: NavigationLink.LOGIN,
    }
  );
}
