import { authGate } from "~/shared/.server/services/auth";
import {
  getCountOfPostsWithComplaints,
  getCountOfPostsForModeration,
} from "~/shared/.server/repository/posts";

import { NavigationLink } from "~/shared/constants/navigation";
import { ROLE_ADMIN } from "~/shared/constants/common";
import type { NewSerializeFrom } from "~/shared/types/react";
import type { Route } from "./+types/route";

export const loader = async ({
  request,
}: Route.LoaderArgs): Promise<{
  postsOnModeration: number;
  postsWithComplaints: number;
}> => {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN],
    },
    async () => {
      const postsOnModeration = await getCountOfPostsForModeration();
      const postsWithComplaints = await getCountOfPostsWithComplaints();

      return {
        postsOnModeration,
        postsWithComplaints,
      };
    },
    {
      failureRedirect: NavigationLink.LOGIN,
    }
  );
};

export type TLoaderData = NewSerializeFrom<typeof loader>;
