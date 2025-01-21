import { data } from "react-router";

import { commitSession } from "~/shared/.server/services/session";
import { authGate } from "~/shared/.server/services/auth";
import { getIdFromRequest } from "~/shared/.server/utils/commonUtils";
import { deleteTagById, getTagById } from "~/shared/.server/repository/tags";

import { ROLE_ADMIN, SESSION_SUCCESS_KEY } from "~/shared/constants/common";
import { NavigationLink } from "~/shared/constants/navigation";
import type { Route } from "./+types/route";
import {
  HTTP_STATUS_CODES,
  InternalError,
} from "~/shared/.server/utils/InternalError";

export async function action({ request }: Route.ActionArgs) {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN],
    },
    async (_, t, session) => {
      const formData = await request.formData();
      const tagId = getIdFromRequest(formData);

      const existingTag = await getTagById(tagId);

      if (!existingTag) {
        throw new InternalError(
          t("responseErrors.notFound"),
          HTTP_STATUS_CODES.NOT_FOUND_404
        );
      }

      const deletedTag = await deleteTagById(tagId);

      if (!deletedTag) {
        throw new InternalError(
          t("responseErrors.failed"),
          HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR_500
        );
      }

      session.set(SESSION_SUCCESS_KEY, t("notifications.success.delete"));

      return data(
        { deletedTag },
        {
          headers: {
            "Set-Cookie": await commitSession(session),
          },
        }
      );
    },
    {
      failureRedirect: NavigationLink.HOME,
    }
  );
}
