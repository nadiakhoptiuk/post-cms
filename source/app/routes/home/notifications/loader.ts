import { authGate } from "~/shared/.server/services/auth";

import { ROLE_ADMIN, ROLE_USER } from "~/shared/constants/common";
import { NavigationLink } from "~/shared/constants/navigation";
import type { Route } from "../+types/route";
import type { NewSerializeFrom } from "~/shared/types/react";

export const loader = async ({ request }: Route.LoaderArgs) => {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN, ROLE_USER],
    },
    async (sessionUser) => {
      return { sessionUser };
    },
    {
      failureRedirect: NavigationLink.LOGIN,
    }
  );
};

export type TLoaderData = NewSerializeFrom<typeof loader>;
