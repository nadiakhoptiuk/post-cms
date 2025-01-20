import { redirect } from "react-router";

import { authGate } from "~/shared/.server/services/auth";
import { getTagDataFromRequest } from "~/shared/.server/utils/tagUtils";
import { createNewTag, getTagByName } from "~/shared/.server/repository/tags";

import { NavigationLink } from "~/shared/constants/navigation";
import { ROLE_ADMIN } from "~/shared/constants/common";
import type { Route } from "../+types/route";
import type { TSerializedUser } from "~/shared/types/react";

export async function action({ request }: Route.ActionArgs) {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN],
    },
    async (sessionUser: TSerializedUser) => {
      const formData = await request.formData();

      const tagData = await getTagDataFromRequest(formData);

      const existingTag = await getTagByName(tagData.name);

      if (existingTag) {
        throw Error("Tag with such name is already exists");
      }

      const createdTag = await createNewTag(tagData, sessionUser.id);

      if (!createdTag) {
        throw Error("Something went wrong");
      }

      return redirect(NavigationLink.DASHBOARD_TAGS);
    },
    {
      failureRedirect: NavigationLink.LOGIN,
    }
  );
}
