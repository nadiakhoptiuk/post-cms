import { authGate } from "~/shared/.server/services/auth";
import { getActionIdFromRequest } from "~/shared/.server/utils/commonUtils";
import { deleteUserAction } from "./actions/delete";
import { restoreUserAction } from "./actions/restore";
import { getIdFromRequest } from "~/shared/.server/utils/commonUtils";

import {
  ACTION_DELETE,
  ACTION_RESTORE,
  ROLE_ADMIN,
} from "~/shared/constants/common";
import { NavigationLink } from "~/shared/constants/navigation";
import type { TSerializedUser } from "~/shared/types/react";
import type { Route } from "./+types/route";

export async function action({ request }: Route.ActionArgs) {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN],
    },
    async (sessionUser: TSerializedUser) => {
      const formData = await request.formData();
      const action = getActionIdFromRequest(formData);
      const userId = getIdFromRequest(formData);

      let resultUser;

      switch (action) {
        case ACTION_DELETE:
          resultUser = await deleteUserAction(
            request,
            Number(userId),
            sessionUser
          );
          break;

        case ACTION_RESTORE:
          resultUser = await restoreUserAction(Number(userId), sessionUser);
          break;
      }

      if (!resultUser) {
        throw new Error("Something went wrong");
      }

      return resultUser;
    },
    {
      failureRedirect: NavigationLink.LOGIN,
    }
  );
}
