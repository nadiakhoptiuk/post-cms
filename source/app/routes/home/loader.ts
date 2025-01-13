import { getAuthUser } from "~/shared/.server/services/auth";

import { NavigationLink } from "~/shared/constants/navigation";
import type { Route } from "./+types/route";
import { ROLE_ADMIN, ROLE_USER } from "~/shared/constants/common";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const sessionUser = await getAuthUser(
    request,
    {
      isPublicRoute: true,
      allowedRoles: [ROLE_ADMIN, ROLE_USER],
    },
    {
      failureRedirect: NavigationLink.LOGIN,
    }
  );

  return { user: sessionUser };
};
