import { redirect } from "react-router";

import { authGate } from "~/shared/.server/services/auth";
import { getUserDataFromRequest } from "~/shared/.server/utils/usersUtils";
import {
  createNewUser,
  getUserByEmailWithPassword,
} from "~/shared/.server/repository/users";

import { NavigationLink } from "~/shared/constants/navigation";
import { ROLE_ADMIN } from "~/shared/constants/common";
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

      const { firstName, lastName, email, password, role } =
        await getUserDataFromRequest(formData);

      const existingUser = await getUserByEmailWithPassword(email);

      if (existingUser) {
        throw Error("User with such email is already exists");
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
