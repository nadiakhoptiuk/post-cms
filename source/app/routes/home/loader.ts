import { publicGate } from "~/shared/.server/services/auth";

import { NavigationLink } from "~/shared/constants/navigation";
import { ROLE_ADMIN, ROLE_USER } from "~/shared/constants/common";
import type { TSerializedUser } from "~/shared/types/react";
import type { Route } from "./+types/route";

export const loader = async ({ request }: Route.LoaderArgs) => {
  return await publicGate(
    request,
    {
      isPublicRoute: true,
      allowedRoles: [ROLE_ADMIN, ROLE_USER],
    },
    async (user: TSerializedUser | null) => {
      return { user };
    },
    {
      failureRedirect: NavigationLink.LOGIN,
    }
  );
};
