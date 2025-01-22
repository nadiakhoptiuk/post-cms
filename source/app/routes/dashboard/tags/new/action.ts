import { redirect } from "react-router";

import { authGate } from "~/shared/.server/services/auth";
import { getTagDataFromRequest } from "~/shared/.server/utils/tagUtils";
import { createNewTag, getTagByName } from "~/shared/.server/repository/tags";
import { commitSession } from "~/shared/.server/services/session";

import { NavigationLink } from "~/shared/constants/navigation";
import { ROLE_ADMIN, SESSION_SUCCESS_KEY } from "~/shared/constants/common";
import {
  HTTP_STATUS_CODES,
  InternalError,
} from "~/shared/.server/utils/InternalError";
import type { Route } from "../+types/route";

export async function action({ request }: Route.ActionArgs) {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN],
    },
    async (sessionUser, t, session) => {
      const formData = await request.formData();

      const tagData = getTagDataFromRequest(formData);

      const existingTag = await getTagByName(tagData.name);

      if (existingTag) {
        throw new InternalError(
          t("responseErrors.notFound"),
          HTTP_STATUS_CODES.NOT_FOUND_404
        );
      }

      const createdTag = await createNewTag(tagData, sessionUser.id);

      if (!createdTag) {
        throw new InternalError(
          t("responseErrors.failed"),
          HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR_500
        );
      }

      session.set(SESSION_SUCCESS_KEY, t("notifications.success.created"));

      return redirect(NavigationLink.DASHBOARD_TAGS, {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    },
    {
      failureRedirect: NavigationLink.LOGIN,
    }
  );
}
