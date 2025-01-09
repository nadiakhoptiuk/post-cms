import { getAuthUser } from "~/shared/.server/services/auth";
import { NavigationLink } from "~/shared/constants/navigation";

import {
  getCountOfPostsWithComplaints,
  getCountOfPostsForModeration,
} from "~/shared/.server/repository/posts";
import { ROLE_ADMIN } from "~/shared/constants/common";
import type { Route } from "./+types/route";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const sessionUser = await getAuthUser(
    request,
    {
      isPublicRoute: false,
      isAuthRoute: false,
      allowedRoles: [ROLE_ADMIN],
    },
    {
      failureRedirect: NavigationLink.LOGIN,
    }
  );

  const postsOnModeration = await getCountOfPostsForModeration();
  const postsWithComplaints = await getCountOfPostsWithComplaints();

  return Response.json({
    user: sessionUser,
    postsOnModeration,
    postsWithComplaints,
  });
};
