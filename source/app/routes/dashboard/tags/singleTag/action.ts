import { redirect } from "react-router";

import { authGate } from "~/shared/.server/services/auth";
import {
  getActionIdFromRequest,
  getIdFromParams,
} from "~/shared/.server/utils/commonUtils";
import { updateTagAction } from "./actions/update";
import { deleteTagById, getTagById } from "~/shared/.server/repository/tags";

import {
  ACTION_DELETE,
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
      const tagId = getIdFromParams(params);

      const formData = await request.formData();
      const action = getActionIdFromRequest(formData);

      const existingTag = await getTagById(tagId);

      if (!existingTag) {
        throw new Error("Tag with such id does not exist");
      }

      let result;

      switch (action) {
        case ACTION_DELETE:
          result = await deleteTagById(tagId);
          break;

        case ACTION_UPDATE:
          result = await updateTagAction(formData, sessionUser.id, tagId);
          break;
      }

      if (!result) {
        throw Error("Something went wrong");
      }

      return redirect(NavigationLink.DASHBOARD_TAGS);
    },
    {
      failureRedirect: NavigationLink.HOME,
    }
  );
}
