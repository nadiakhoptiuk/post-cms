import { authGate } from "~/shared/.server/services/auth";

import { getPaginationDataFromRequest } from "~/shared/.server/utils/commonUtils";
import { getAllComplaints } from "~/shared/.server/repository/complaints";

import { ROLE_ADMIN } from "~/shared/constants/common";
import { NavigationLink } from "~/shared/constants/navigation";
import type {
  NewSerializeFrom,
  TDBComplaintRecord,
  TSerializedUser,
} from "~/shared/types/react";
import type { Route } from "./+types/route";
import type {
  WithPaginationData,
  WithSearchData,
} from "~/shared/.server/types/common";

export async function loader({ request }: Route.LoaderArgs): Promise<
  {
    complaints: Array<TDBComplaintRecord>;
    user: TSerializedUser;
  } & WithPaginationData &
    WithSearchData
> {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN],
    },
    async (sessionUser: TSerializedUser) => {
      const { query, page } = getPaginationDataFromRequest(request);

      const { allComplaints, actualPage, pagesCount } = await getAllComplaints(
        query,
        page
      );

      return {
        complaints: allComplaints,
        user: sessionUser,
        actualPage,
        pagesCount,
      };
    },
    {
      failureRedirect: NavigationLink.LOGIN,
    }
  );
}

export type TLoaderData = NewSerializeFrom<typeof loader>;
