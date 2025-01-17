import { getAllUsers } from "~/shared/.server/repository/users";
import { getPaginationDataFromRequest } from "~/shared/.server/utils/commonUtils";

import { ROLE_ADMIN } from "~/shared/constants/common";
import type { Route } from "./+types/route";
import { authGate } from "~/shared/.server/services/auth";
import { NavigationLink } from "~/shared/constants/navigation";
import type { NewSerializeFrom, TDBUser } from "~/shared/types/react";
import type {
  WithPaginationData,
  WithSearchData,
} from "~/shared/.server/types/common";

export const loader = async ({
  request,
}: Route.LoaderArgs): Promise<
  { users: Array<TDBUser> } & WithPaginationData & WithSearchData
> => {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN],
    },
    async () => {
      const { query, page } = getPaginationDataFromRequest(request);

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

export type TLoaderData = NewSerializeFrom<typeof loader>;
