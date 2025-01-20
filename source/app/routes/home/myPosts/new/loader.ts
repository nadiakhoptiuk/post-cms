import { authGate } from "~/shared/.server/services/auth";
import { getAllTags } from "~/shared/.server/repository/tags";

import { NavigationLink } from "~/shared/constants/navigation";
import { ROLE_ADMIN, ROLE_USER } from "~/shared/constants/common";
import type { NewSerializeFrom, TTag } from "~/shared/types/react";
import type { Route } from "../+types/route";

export async function loader({ request }: Route.LoaderArgs): Promise<{
  allTags: TTag[];
}> {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN, ROLE_USER],
    },
    async () => {
      const allTags = await getAllTags();

      return {
        allTags,
      };
    },
    {
      failureRedirect: NavigationLink.LOGIN,
    }
  );
}

export type TLoaderData = NewSerializeFrom<typeof loader>;
