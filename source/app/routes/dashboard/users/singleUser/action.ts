import { redirect } from "react-router";

import { authGate } from "~/shared/.server/services/auth";
import { updateUserById } from "~/shared/.server/repository/users";

import { ROLE_ADMIN } from "~/shared/constants/common";
import { NavigationLink } from "~/shared/constants/navigation";
import type { TRolesEnum, TSerializedUser } from "~/shared/types/react";
import type { Route } from "./+types/route";

export async function action({ request, params }: Route.ActionArgs) {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN],
    },
    async (sessionUser: TSerializedUser) => {
      const formData = await request.formData();

      const firstName = formData.get("firstName");
      const lastName = formData.get("lastName");
      const email = formData.get("email");
      const password = formData.get("password");
      const role = formData.get("role") as TRolesEnum;

      if (
        !role ||
        typeof firstName !== "string" ||
        typeof lastName !== "string" ||
        typeof email !== "string" ||
        typeof password !== "string"
      ) {
        throw new Error("Name or email or password are not strings");
      }

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
