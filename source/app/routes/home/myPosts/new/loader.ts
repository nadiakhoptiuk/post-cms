import { authGate } from "~/shared/.server/services/auth";

import { NavigationLink } from "~/shared/constants/navigation";
import { ROLE_ADMIN, ROLE_USER } from "~/shared/constants/common";
import type { NewSerializeFrom, TSerializedUser } from "~/shared/types/react";
import type { Route } from "../+types/route";

export async function loader({ request }: Route.LoaderArgs): Promise<{
  user: TSerializedUser;
}> {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN, ROLE_USER],
    },
    async (sessionUser: TSerializedUser) => {
      return {
        user: sessionUser,
      };
    },
    {
      failureRedirect: NavigationLink.LOGIN,
    }
  );
}

export type TLoaderData = NewSerializeFrom<typeof loader>;
