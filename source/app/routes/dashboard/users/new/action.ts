import { redirect } from "react-router";

import { authGate } from "~/shared/.server/services/auth";
import { createNewUser } from "~/shared/.server/repository/users";

import { NavigationLink } from "~/shared/constants/navigation";
import { ROLE_ADMIN } from "~/shared/constants/common";
import type { TRolesEnum } from "~/shared/types/react";
import type { Route } from "../+types/route";

export async function action({ request }: Route.ActionArgs) {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN],
    },
    async () => {
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
        return Response.json({
          error: "Name or email or password are not strings",
        });
      }

      await createNewUser({
        firstName,
        lastName,
        email,
        password,
        role,
      });

      return redirect(NavigationLink.DASHBOARD_USERS);
    },
    {
      failureRedirect: NavigationLink.LOGIN,
    }
  );
}
