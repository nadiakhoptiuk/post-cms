import { authGate } from "~/shared/.server/services/auth";
import { NavigationLink } from "~/shared/constants/navigation";

import {
  getCountOfPostsWithComplaints,
  getCountOfPostsForModeration,
} from "~/shared/.server/repository/posts";
import { ROLE_ADMIN } from "~/shared/constants/common";
import type { Route } from "./+types/route";

export const loader = async ({ request }: Route.LoaderArgs) => {
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
