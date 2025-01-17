import { authGate } from "~/shared/.server/services/auth";

import { ROLE_ADMIN } from "~/shared/constants/common";
import { NavigationLink } from "~/shared/constants/navigation";
import type { Route } from "../+types/route";
import type { NewSerializeFrom, TSerializedUser } from "~/shared/types/react";

export async function loader({ request }: Route.LoaderArgs): Promise<{
  user: TSerializedUser;
}> {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN],
    },
    async (user: TSerializedUser) => {
      return {
        user,
      };
    },
    {
      failureRedirect: NavigationLink.LOGIN,
    }
  );
}

export type TLoaderData = NewSerializeFrom<typeof loader>;
