import { authGate } from "~/shared/.server/services/auth";

import { getAllTagsForAdmin } from "~/shared/.server/repository/tags";
import { getPaginationDataFromRequest } from "~/shared/.server/utils/commonUtils";

import { ROLE_ADMIN } from "~/shared/constants/common";
import { NavigationLink } from "~/shared/constants/navigation";
import type {
  NewSerializeFrom,
  TSerializedUser,
  TTag,
} from "~/shared/types/react";
import type { Route } from "../+types/route";

export async function loader({ request }: Route.LoaderArgs): Promise<{
  tags: Array<TTag> | [];
  user: TSerializedUser;
  actualPage: number;
  pagesCount: number;
  query: string;
}> {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN],
    },
    async (sessionUser: TSerializedUser) => {
      const { query, page } = getPaginationDataFromRequest(request);

      const { allTags, actualPage, pagesCount } = await getAllTagsForAdmin(
        query,
        page
      );

      return {
        tags: allTags || [],
        user: sessionUser,
        actualPage,
        pagesCount,
        query,
      };
    },
    {
      failureRedirect: NavigationLink.LOGIN,
    }
  );
}

export type TLoaderData = NewSerializeFrom<typeof loader>;
