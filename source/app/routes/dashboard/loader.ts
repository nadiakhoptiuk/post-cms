import { getAuthUser } from "~/shared/.server/services/auth";
import { NavigationLink } from "~/shared/constants/navigation";

import {
  getAllPostsForModeration,
  getAllPostsWithComplaints,
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

  const postsOnModeration = await getAllPostsForModeration();
  const postsWithComplaints = await getAllPostsWithComplaints();

  return Response.json({
    user: sessionUser,
    postsOnModeration: postsOnModeration.length,
    postsWithComplaints: postsWithComplaints.length,
  });
};
