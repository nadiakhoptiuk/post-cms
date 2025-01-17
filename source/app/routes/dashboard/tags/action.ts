import { authGate } from "~/shared/.server/services/auth";
import { getIdFromRequest } from "~/shared/.server/utils/commonUtils";
import { deleteTagById, getTagById } from "~/shared/.server/repository/tags";

import { ROLE_ADMIN } from "~/shared/constants/common";
import { NavigationLink } from "~/shared/constants/navigation";
import type { Route } from "./+types/route";

export async function action({ request }: Route.ActionArgs) {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN],
    },
    async () => {
      const formData = await request.formData();
      const tagId = getIdFromRequest(formData);

      const existingTag = await getTagById(tagId);

      if (!existingTag) {
        throw new Error("Post with such id does not exist");
      }

      return await deleteTagById(tagId);
    },
    {
      failureRedirect: NavigationLink.HOME,
    }
  );
}
