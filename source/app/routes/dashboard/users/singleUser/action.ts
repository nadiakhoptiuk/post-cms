import { redirect } from "react-router";

import { authGate } from "~/shared/.server/services/auth";
import {
  getActionIdFromRequest,
  getIdFromParams,
} from "~/shared/.server/utils/commonUtils";
import { updateUserAction } from "../actions/update";
import { deleteUserAction } from "../actions/delete";
import { restoreUserAction } from "../actions/restore";

import {
  ACTION_DELETE,
  ACTION_RESTORE,
  ACTION_UPDATE,
  ROLE_ADMIN,
} from "~/shared/constants/common";
import { NavigationLink } from "~/shared/constants/navigation";
import type { TSerializedUser } from "~/shared/types/react";
import type { Route } from "./+types/route";

export async function action({ request, params }: Route.ActionArgs) {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN],
    },
    async (sessionUser: TSerializedUser) => {
      const userId = getIdFromParams(params);

      const formData = await request.formData();
      const action = getActionIdFromRequest(formData);

      let resultUser;

      switch (action) {
        case ACTION_DELETE:
          resultUser = await deleteUserAction(
            request,
            Number(userId),
            sessionUser
          );
          break;

        case ACTION_UPDATE:
          resultUser = await updateUserAction(
            formData,
            sessionUser,
            Number(userId)
          );
          break;

        case ACTION_RESTORE:
          resultUser = await restoreUserAction(Number(userId), sessionUser);
          break;
      }

      if (!resultUser) {
        throw new Error("Something went wrong");
      }

      return redirect(NavigationLink.DASHBOARD_USERS);
    },
    {
      failureRedirect: NavigationLink.LOGIN,
    }
  );
}
