import { authGate } from "~/shared/.server/services/auth";
import { getUserById } from "~/shared/.server/repository/users";

import { NavigationLink } from "~/shared/constants/navigation";
import { ROLE_ADMIN } from "~/shared/constants/common";
import type { Route } from "./+types/route";

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN],
    },
    async () => {
      const user = await getUserById(Number(params.userId));

      if (!user) {
        throw new Response("Not Found", { status: 404 });
      }

      return Response.json({ user });
    },
    {
      failureRedirect: NavigationLink.LOGIN,
    }
  );
};
