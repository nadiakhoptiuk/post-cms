import { authGate } from "~/shared/.server/services/auth";
import { getIdFromParams } from "~/shared/.server/utils/commonUtils";

import { ROLE_ADMIN } from "~/shared/constants/common";
import { NavigationLink } from "~/shared/constants/navigation";
import type { Route } from "../+types/route";
import type { NewSerializeFrom, TTag } from "~/shared/types/react";
import { data } from "react-router";
import { getTagById } from "~/shared/.server/repository/tags";

export async function loader({ request, params }: Route.LoaderArgs): Promise<{
  tag: TTag;
}> {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN],
    },
    async () => {
      const tagId = getIdFromParams(params);

      const tag = await getTagById(tagId);

      if (!tag) {
        throw data("Not found", { status: 404 });
      }

      return {
        tag,
      };
    },
    {
      failureRedirect: NavigationLink.LOGIN,
    }
  );
}

export type TLoaderData = NewSerializeFrom<typeof loader>;
