import { getAllUsers } from "~/shared/.server/repository/users";

import {
  PAGE_PARAMETER_NAME,
  ROLE_ADMIN,
  SEARCH_PARAMETER_NAME,
} from "~/shared/constants/common";
import type { Route } from "./+types/route";
import { authGate } from "~/shared/.server/services/auth";
import { NavigationLink } from "~/shared/constants/navigation";

export const loader = async ({ request }: Route.LoaderArgs) => {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN],
    },
    async () => {
      const url = new URL(request.url);
      const query = url.searchParams.get(SEARCH_PARAMETER_NAME) || "";
      const page = Number(url.searchParams.get(PAGE_PARAMETER_NAME) || "1");

      const { allUsers, actualPage, pagesCount } = await getAllUsers(
        query,
        page
      );

      return { users: allUsers, query: query, actualPage, pagesCount };
    },
    {
      failureRedirect: NavigationLink.LOGIN,
    }
  );
};
